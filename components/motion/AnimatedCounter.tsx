"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";

/** Counts up to `value` when scrolled into view. */
export function AnimatedCounter({
  value,
  duration = 1.8,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.21, 0.47, 0.32, 0.98],
      onUpdate(latest) {
        if (ref.current) {
          ref.current.textContent =
            prefix +
            latest.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }) +
            suffix;
        }
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, prefix, suffix, decimals, motionValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
