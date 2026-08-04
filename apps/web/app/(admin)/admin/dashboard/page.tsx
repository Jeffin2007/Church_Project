import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin Dashboard' };

export default function AdminDashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">Dashboard — Sprint 1</p>
    </div>
  );
}
