import type { Lead } from "./lead";
import { getService } from "./services";

/**
 * Minimal FHIR R4 shapes used to hand website leads to the HMIS.
 *
 * The HMIS will exchange FHIR R4 with the DHA AfyaLink Health Information Exchange
 * (Client Registry, coverage eligibility, SHA claim bundles), so leads speak the
 * same language from day one. An appointment request becomes a `proposed`
 * Appointment; every other lead becomes a front-desk Task.
 */

export interface FhirReference {
  reference: string;
  display?: string;
}

export interface FhirPatient {
  resourceType: "Patient";
  id: string;
  active: boolean;
  name: { text: string }[];
  telecom: { system: "phone" | "email"; value: string; use?: "mobile" }[];
  extension?: { url: string; valueString: string }[];
}

export interface FhirAppointment {
  resourceType: "Appointment";
  id: string;
  status: "proposed";
  serviceType?: { coding?: { system: string; code: string; display: string }[]; text: string }[];
  description?: string;
  comment?: string;
  created: string;
  requestedPeriod?: { start: string; end: string }[];
  participant: { actor: FhirReference; status: "needs-action" }[];
}

export interface FhirTask {
  resourceType: "Task";
  id: string;
  status: "requested";
  intent: "order";
  priority: "routine" | "urgent";
  code: { text: string };
  description?: string;
  authoredOn: string;
  for: FhirReference;
  businessStatus?: { text: string };
}

export interface FhirBundle {
  resourceType: "Bundle";
  type: "transaction";
  timestamp: string;
  identifier: { system: string; value: string };
  entry: {
    fullUrl: string;
    resource: FhirPatient | FhirAppointment | FhirTask;
    request: { method: "POST"; url: string };
  }[];
}

export const PRIMEGALA_SERVICE_SYSTEM = "https://primegalahospital.co.ke/fhir/CodeSystem/service";
export const PRIMEGALA_LEAD_SYSTEM = "https://primegalahospital.co.ke/fhir/NamingSystem/website-lead";

/** EAT is UTC+3 with no daylight saving. */
const TIME_WINDOW_HOURS: Record<string, [string, string]> = {
  morning: ["08:00", "12:00"],
  afternoon: ["12:00", "16:00"],
  evening: ["16:00", "20:00"],
  any: ["08:00", "20:00"],
};

const LEAD_TASK_LABELS: Record<Lead["type"], string> = {
  appointment: "Confirm appointment request",
  callback: "Call patient back",
  enquiry: "Respond to enquiry",
  "sha-help": "Help patient with SHA registration / eligibility",
  "maternity-tour": "Arrange maternity visit",
};

export function leadToFhirBundle(lead: Lead): FhirBundle {
  const patientId = `urn:uuid:${lead.id}-patient`;
  const telecom: FhirPatient["telecom"] = [{ system: "phone", value: lead.contact.phone, use: "mobile" }];
  if (lead.contact.email) telecom.push({ system: "email", value: lead.contact.email });

  const patient: FhirPatient = {
    resourceType: "Patient",
    id: `${lead.id}-patient`,
    // Not yet verified against the Client Registry; the HMIS will match or register.
    active: false,
    name: [{ text: lead.contact.fullName }],
    telecom,
    extension: [
      {
        url: "https://primegalahospital.co.ke/fhir/StructureDefinition/preferred-contact-channel",
        valueString: lead.contact.preferredChannel,
      },
    ],
  };

  const entries: FhirBundle["entry"] = [
    { fullUrl: patientId, resource: patient, request: { method: "POST", url: "Patient" } },
  ];

  const service = lead.request.service ? getService(lead.request.service) : undefined;

  if (lead.type === "appointment") {
    const appointment: FhirAppointment = {
      resourceType: "Appointment",
      id: `${lead.id}-appointment`,
      status: "proposed",
      created: lead.createdAt,
      description: service ? `Website request: ${service.name}` : "Website appointment request",
      comment: lead.request.message,
      participant: [{ actor: { reference: patientId, display: lead.contact.fullName }, status: "needs-action" }],
    };
    if (service) {
      appointment.serviceType = [
        {
          coding: [{ system: PRIMEGALA_SERVICE_SYSTEM, code: service.code, display: service.name }],
          text: service.name,
        },
      ];
    }
    if (lead.request.preferredDate) {
      const [start, end] = TIME_WINDOW_HOURS[lead.request.preferredTime ?? "any"];
      appointment.requestedPeriod = [
        {
          start: `${lead.request.preferredDate}T${start}:00+03:00`,
          end: `${lead.request.preferredDate}T${end}:00+03:00`,
        },
      ];
    }
    entries.push({
      fullUrl: `urn:uuid:${lead.id}-appointment`,
      resource: appointment,
      request: { method: "POST", url: "Appointment" },
    });
  } else {
    const task: FhirTask = {
      resourceType: "Task",
      id: `${lead.id}-task`,
      status: "requested",
      intent: "order",
      priority: "routine",
      code: { text: LEAD_TASK_LABELS[lead.type] },
      description: [service?.name, lead.request.message].filter(Boolean).join(" — ") || undefined,
      authoredOn: lead.createdAt,
      for: { reference: patientId, display: lead.contact.fullName },
    };
    entries.push({ fullUrl: `urn:uuid:${lead.id}-task`, resource: task, request: { method: "POST", url: "Task" } });
  }

  return {
    resourceType: "Bundle",
    type: "transaction",
    timestamp: lead.createdAt,
    identifier: { system: PRIMEGALA_LEAD_SYSTEM, value: lead.id },
    entry: entries,
  };
}
