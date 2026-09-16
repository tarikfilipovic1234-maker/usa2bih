export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh place-items-center px-5 py-12">
      <div className="flex w-full justify-center">{children}</div>
    </div>
  );
}
