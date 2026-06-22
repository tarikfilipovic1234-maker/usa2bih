import { ImageResponse } from "next/og";
import { getVehicleBySlug } from "@/lib/queries";
import { formatUSD, humanizeEnum } from "@/lib/utils";

export const alt = "Vehicle import";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function VehicleOg({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#06080c",
            color: "#eef3fa",
            fontSize: 48,
            fontFamily: "sans-serif",
          }}
        >
          USA2BIH
        </div>
      ),
      size,
    );
  }

  const img = vehicle.images.find((i) => i.isPrimary)?.url ?? vehicle.images[0]?.url;
  const name = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#06080c", fontFamily: "sans-serif" }}>
        {img && (
          <div style={{ display: "flex", width: "50%", height: "100%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt="" width={600} height={630} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: img ? "50%" : "100%",
            padding: 64,
            color: "#eef3fa",
            background: "linear-gradient(135deg, #0a0e15, #11151f)",
          }}
        >
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
            USA<span style={{ color: "#2e9bff" }}>2</span>BIH
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 26, color: "#2e9bff", fontWeight: 600 }}>{String(vehicle.year)}</div>
            <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1 }}>
              {`${vehicle.make} ${vehicle.model}`}
            </div>
            <div style={{ fontSize: 28, color: "#8a94a6" }}>
              {`${vehicle.mileage.toLocaleString()} mi · ${humanizeEnum(vehicle.fuelType)} · ${humanizeEnum(vehicle.driveType)}`}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <div style={{ fontSize: 52, fontWeight: 800 }}>{formatUSD(vehicle.price)}</div>
            <div style={{ fontSize: 26, color: "#8a94a6" }}>auction price</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
