export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-[#001020] text-foreground p-4 sm:p-6 lg:p-8">
      {/* Sacred Sanctuary Architectural Backdrop with soft atmospheric depth */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 opacity-30 filter blur-sm"
          style={{ backgroundImage: "url('/images/hero/church-altar.webp')" }}
        />
        {/* Marian Navy to Deep Night vignette with sacred gold radial light */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001833]/90 via-[#001020]/95 to-[#000a14]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative z-10 w-full max-w-xl">
        {children}
      </div>
    </div>
  );
}
