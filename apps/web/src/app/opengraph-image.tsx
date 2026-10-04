import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline} Open 24 hours at Maili Sita, Nakuru.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #062616 0%, #0e4f2b 55%, #167a41 100%)",
          color: "#ffffff",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -60, top: -60, width: 360, height: 360, borderRadius: 999, background: "rgba(247,197,72,0.22)", display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ position: "relative", width: 76, height: 76, display: "flex" }}>
            <div style={{ position: "absolute", left: 27, top: 0, width: 22, height: 76, borderRadius: 11, background: "#ffffff" }} />
            <div style={{ position: "absolute", left: 0, top: 27, width: 76, height: 22, borderRadius: 11, background: "#d7f0de" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 46, fontWeight: 700, letterSpacing: -1 }}>Primegala</div>
            <div style={{ fontSize: 18, letterSpacing: 6, color: "#b5e3c4" }}>MEDICAL CENTRE</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>Prime care, close to home.</div>
          <div style={{ fontSize: 32, marginTop: 20, color: "#d7f0de" }}>
            Open 24 hours · Maili Sita, opposite Kiamaina Primary School
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {["Outpatient", "Maternity", "Family planning", "Lab & pharmacy", site.shaContracted ? "SHA accepted" : "Inpatient"].map((t) => (
            <div key={t} style={{ display: "flex", padding: "10px 22px", borderRadius: 999, background: "rgba(255,255,255,0.12)", fontSize: 24 }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
