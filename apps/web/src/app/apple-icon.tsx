import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** The Primegala cross-and-leaf mark on white, flat colours only. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <div style={{ position: "relative", width: 132, height: 132, display: "flex" }}>
          <div style={{ position: "absolute", left: 47, top: 0, width: 38, height: 132, borderRadius: 19, background: "#167a41" }} />
          <div style={{ position: "absolute", left: 0, top: 47, width: 132, height: 38, borderRadius: 19, background: "#1f9450" }} />
          <div
            style={{
              position: "absolute",
              left: 56,
              top: 40,
              width: 20,
              height: 52,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              background: "#ffffff",
            }}
          />
          <div style={{ position: "absolute", left: 65, top: 50, width: 2, height: 34, borderRadius: 1, background: "#1f9450" }} />
        </div>
      </div>
    ),
    size,
  );
}
