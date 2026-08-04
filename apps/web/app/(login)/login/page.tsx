import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to the Queen of All Saints Parish Portal',
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-card space-y-6 rounded-2xl p-8 shadow-2xl">
        <div className="text-center">
          <h1 className="font-heading text-primary text-3xl font-bold">Parish Portal</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Queen of All Saints Roman Catholic Church
          </p>
        </div>
        {/* Login form — implemented in Sprint 1 */}
        <p className="text-muted-foreground text-center text-sm">Authentication UI — Sprint 1</p>
      </div>
    </div>
  );
}
