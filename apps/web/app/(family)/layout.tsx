export default function FamilyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 w-64 border-r bg-card" />
      <main className="pl-64 p-8">{children}</main>
    </div>
  );
}
