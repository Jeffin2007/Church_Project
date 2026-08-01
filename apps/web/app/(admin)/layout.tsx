export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted">
      <aside className="fixed inset-y-0 left-0 w-72 bg-card border-r shadow-sm" />
      <main className="pl-72 p-8">{children}</main>
    </div>
  );
}
