import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Family Dashboard' };

export default function FamilyDashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-3xl font-bold">My Family</h1>
      <p className="text-muted-foreground">Dashboard — Sprint 1</p>
    </div>
  );
}
