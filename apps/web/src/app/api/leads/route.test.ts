import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyWebhook } from "@primegala/contracts";
import { POST } from "./route";

const valid = {
  type: "appointment",
  fullName: "Wanjiru Njoroge",
  phone: "0722 000 111",
  service: "maternity",
  preferredChannel: "whatsapp",
  consent: true,
  attribution: { utmSource: "google", landingPage: "/services/maternity" },
};

let ipCounter = 0;
function request(body: unknown) {
  ipCounter += 1;
  return new Request("http://localhost/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": `10.0.0.${ipCounter}` },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("POST /api/leads", () => {
  it("accepts a valid lead in development and returns a reference", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("HMIS_LEADS_WEBHOOK_URL", "");
    vi.spyOn(console, "info").mockImplementation(() => {});
    const res = await POST(request(valid));
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.reference).toMatch(/^PG-[0-9A-F]{6}$/);
  });

  it("returns field errors for invalid input", async () => {
    const res = await POST(request({ ...valid, phone: "123", consent: false }));
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.fieldErrors.phone).toBeDefined();
    expect(json.fieldErrors.consent).toBeDefined();
  });

  it("rejects malformed JSON", async () => {
    const res = await POST(request("{not json"));
    expect(res.status).toBe(400);
  });

  it("silently accepts honeypot submissions without delivering", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const res = await POST(request({ ...valid, website: "spam.example" }));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("delivers a signed lead + FHIR bundle to the HMIS webhook", async () => {
    vi.stubEnv("HMIS_LEADS_WEBHOOK_URL", "https://hmis.example/hooks/leads");
    vi.stubEnv("HMIS_LEADS_WEBHOOK_SECRET", "test-secret");
    const fetchMock = vi.fn(async () => new Response(null, { status: 202 }));
    vi.stubGlobal("fetch", fetchMock);

    const res = await POST(request(valid));
    expect(res.status).toBe(201);

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://hmis.example/hooks/leads");
    const headers = init.headers as Record<string, string>;
    const payload = JSON.parse(init.body as string);

    await expect(verifyWebhook("test-secret", init.body as string, headers["x-primegala-signature"])).resolves.toBe(
      true,
    );
    expect(headers["idempotency-key"]).toBe(payload.lead.id);
    expect(payload.lead.contact.phone).toBe("+254722000111");
    expect(payload.lead.attribution.utmSource).toBe("google");
    expect(payload.fhir.resourceType).toBe("Bundle");
    expect(payload.fhir.entry[1].resource.resourceType).toBe("Appointment");
  });

  it("tells the patient to call when the HMIS is down", async () => {
    vi.stubEnv("HMIS_LEADS_WEBHOOK_URL", "https://hmis.example/hooks/leads");
    vi.stubEnv("HMIS_LEADS_WEBHOOK_SECRET", "test-secret");
    vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 500 })));
    vi.spyOn(console, "error").mockImplementation(() => {});

    const res = await POST(request(valid));
    expect(res.status).toBe(503);
    expect((await res.json()).error).toMatch(/info@primegalahospital\.co\.ke/);
  });

  it("accepts leads in production only when LEADS_LOG_ONLY is explicitly set", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("HMIS_LEADS_WEBHOOK_URL", "");
    vi.stubEnv("LEADS_LOG_ONLY", "true");
    vi.spyOn(console, "info").mockImplementation(() => {});
    const res = await POST(request(valid));
    expect(res.status).toBe(201);
  });

  it("refuses to drop leads silently in production without a webhook", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("HMIS_LEADS_WEBHOOK_URL", "");
    vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await POST(request(valid));
    expect(res.status).toBe(503);
  });
});
