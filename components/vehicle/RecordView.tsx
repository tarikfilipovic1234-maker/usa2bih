"use client";

import { useEffect, useRef } from "react";
import { recordVehicleView } from "@/app/actions/views";

/** Fire-and-forget: records a vehicle view once per mount. */
export function RecordView({ vehicleId }: { vehicleId: string }) {
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    void recordVehicleView(vehicleId);
  }, [vehicleId]);
  return null;
}
