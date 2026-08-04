export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted min-h-screen">
      <aside className="bg-card fixed inset-y-0 left-0 w-72 border-r shadow-sm" />
      <main className="p-8 pl-72">{children}</main>
    </div>
  );
}
