export default function FamilyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <aside className="bg-card fixed inset-y-0 left-0 w-64 border-r" />
      <main className="p-8 pl-64">{children}</main>
    </div>
  );
}
