import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const alt = `${SITE.name}: ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0a0c10",
          color: "#eef1f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 6,
              border: "1px solid #333a48",
              background: "#171b24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
              color: "#56a8f0",
            }}
          >
            U2
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 700, letterSpacing: -1 }}>
            USA2BIH
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            American cars, landed in Bosnia at a price you saw first.
          </div>
          <div style={{ fontSize: 30, color: "#868f9e", maxWidth: 860 }}>
            Browse US auction vehicles, cost the import in BAM before you bid, and track it through
            customs.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#868f9e" }}>{SITE.url.replace(/^https?:\/\//, "")}</div>
      </div>
    ),
    size,
  );
}
