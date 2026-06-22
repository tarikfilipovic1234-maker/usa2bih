export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden px-5 py-12">
      <div className="pointer-events-none absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-accent/15 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-accent-deep/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="relative z-10 flex justify-center">{children}</div>
    </div>
  );
}
