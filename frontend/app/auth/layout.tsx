export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-slate-50 to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,102,255,0.03),transparent_50%)]" />
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-12">
        {children}
      </div>
    </div>
  );
}
