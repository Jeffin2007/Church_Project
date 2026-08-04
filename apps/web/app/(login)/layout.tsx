export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="from-primary-900 via-primary-800 to-secondary-900 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      {children}
    </div>
  );
}
