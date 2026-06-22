import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const alt = `${SITE.name} — ${SITE.tagline}`;
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
          background:
            "radial-gradient(900px 600px at 80% -10%, rgba(46,155,255,0.35), transparent 60%), linear-gradient(135deg, #06080c, #0a0e15)",
          color: "#eef3fa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #5cb6ff, #0a6ce0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
              color: "#06080c",
            }}
          >
            U2
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
            USA<span style={{ color: "#2e9bff" }}>2</span>BIH
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 900 }}>
            American cars, delivered to Bosnia.
          </div>
          <div style={{ fontSize: 32, color: "#8a94a6", maxWidth: 820 }}>
            Browse US auctions, estimate the full landed cost in BAM &amp; EUR, and track every step.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["Transparent pricing", "Live tracking", "BAM & EUR"].map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: 24,
                color: "#5cb6ff",
                border: "1px solid rgba(46,155,255,0.4)",
                borderRadius: 999,
                padding: "8px 22px",
                display: "flex",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
