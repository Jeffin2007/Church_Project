import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Family Profile | Parish Portal' };

export default function FamilyProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-secondary text-3xl font-bold">Family Profile</h1>
        <p className="text-muted-foreground text-sm">Your registered parish family details.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-card border-border space-y-4 rounded-xl border p-6 shadow-sm">
          <h3 className="font-heading text-foreground text-xl font-bold">Family Information</h3>
          <div className="space-y-3 text-sm">
            {[
              { label: 'Family Number', value: 'QOAS-2024-0001' },
              { label: 'Family Name', value: 'St. Mary Family' },
              { label: 'Head of Family', value: 'Joseph Anthony' },
              { label: 'Anbiyam', value: 'St. Thomas Anbiyam' },
              { label: 'Ward / Zone', value: 'North Zone' },
              { label: 'Registration Date', value: 'January 15, 2024' },
              { label: 'Status', value: 'Active' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between border-b pb-2 last:border-0"
              >
                <span className="text-muted-foreground font-medium">{label}</span>
                <span className="text-foreground font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border-border space-y-4 rounded-xl border p-6 shadow-sm">
          <h3 className="font-heading text-foreground text-xl font-bold">Contact Details</h3>
          <div className="space-y-3 text-sm">
            {[
              { label: 'Phone (Primary)', value: '+91 9876543210' },
              { label: 'Phone (Secondary)', value: '+91 9876543211' },
              { label: 'Email', value: 'familyhead@queenofallsaints.in' },
              { label: 'Address', value: '12, Church Street, Trichy – 620001' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-start justify-between border-b pb-2 last:border-0"
              >
                <span className="text-muted-foreground font-medium">{label}</span>
                <span className="text-foreground max-w-48 text-right font-semibold">{value}</span>
              </div>
            ))}
          </div>
          <button className="border-secondary text-secondary hover:bg-secondary/10 w-full rounded-md border py-2 text-xs font-semibold transition-colors">
            Request Profile Update
          </button>
        </div>
      </div>
    </div>
  );
}
