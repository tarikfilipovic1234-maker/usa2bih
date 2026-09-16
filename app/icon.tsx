import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Browser-tab mark: the same U2 monogram the site header uses. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0c10",
          border: "2px solid #333a48",
          borderRadius: 6,
          color: "#56a8f0",
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: -1,
          fontFamily: "sans-serif",
        }}
      >
        U2
      </div>
    ),
    size,
  );
}
