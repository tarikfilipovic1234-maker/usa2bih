import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon. Solid ground, since iOS does not honour transparency. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          background: "#0a0c10",
          color: "#56a8f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -4 }}>U2</div>
        <div
          style={{
            display: "flex",
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: 3,
            color: "#868f9e",
          }}
        >
          USA2BIH
        </div>
      </div>
    ),
    size,
  );
}
