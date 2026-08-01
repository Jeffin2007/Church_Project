import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to the Queen of All Saints Parish Portal",
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-card rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-primary">
            Parish Portal
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Queen of All Saints Roman Catholic Church
          </p>
        </div>
        {/* Login form — implemented in Sprint 1 */}
        <p className="text-center text-sm text-muted-foreground">
          Authentication UI — Sprint 1
        </p>
      </div>
    </div>
  );
}
