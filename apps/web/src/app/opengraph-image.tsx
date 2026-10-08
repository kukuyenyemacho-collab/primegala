import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline} Open 24 hours at Maili Sita, Nakuru.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Flat navy card with a green rule: facts only, matching the site's institutional style. */
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-mark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const chips = [
    "Open 24 hours",
    `KEPH Level ${site.kephLevel}`,
    ...(site.shaContracted ? ["SHA accepted"] : []),
    "Maternity · Lab · Pharmacy",
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#08172d",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", height: 12, background: "#1f9450" }} />
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 72px 64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 92,
                height: 92,
                borderRadius: 18,
                background: "#ffffff",
              }}
            >
              <img src={logoSrc} alt="" width={76} height={76} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: -1 }}>Primegala</div>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 6, color: "#b6cbe9" }}>MEDICAL CENTRE</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
              24-hour care at Maili Sita, Nakuru
            </div>
            <div style={{ display: "flex", fontSize: 30, marginTop: 20, color: "#dbe6f5" }}>
              {`${site.tagline} Nakuru–Nyahururu Road, opposite Kiamaina Primary School.`}
            </div>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            {chips.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "10px 22px",
                  borderRadius: 999,
                  border: "2px solid rgba(255,255,255,0.28)",
                  fontSize: 24,
                  fontWeight: 600,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
