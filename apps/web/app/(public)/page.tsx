import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome',
  description: 'Queen of All Saints — Parish Portal',
};

export default function PublicHomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="space-y-4 text-center">
        <h1 className="font-heading text-primary text-5xl font-bold">Queen of All Saints</h1>
        <p className="text-muted-foreground text-xl">Parish Management System</p>
        <p className="text-muted-foreground">
          Sprint 0 — Foundation complete. Features coming in Sprint 1.
        </p>
      </div>
    </main>
  );
}
