import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { GlassCard } from "@/components/ui/GlassCard";

const STATS = [
  { value: 2400, suffix: "+", label: "Vehicles imported" },
  { value: 98, suffix: "%", label: "On-time delivery" },
  { value: 21, suffix: " days", label: "Avg. ocean transit" },
  { value: 15, suffix: "+", label: "US auction partners" },
];

export function StatsStrip() {
  return (
    <Container className="relative -mt-2">
      <GlassCard className="grid grid-cols-2 gap-px overflow-hidden p-0 md:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1.5 px-4 py-8 text-center"
          >
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              className="font-display text-3xl font-bold text-chrome-gradient sm:text-4xl"
            />
            <span className="text-xs font-medium uppercase tracking-wider text-silver-dim">
              {stat.label}
            </span>
          </div>
        ))}
      </GlassCard>
    </Container>
  );
}
