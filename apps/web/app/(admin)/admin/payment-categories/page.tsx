import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Payment Categories | Admin Portal' };

const categories = [
  {
    name: 'Monthly Dues',
    description: 'Regular monthly family contribution',
    amount: '₹500/month',
    active: true,
  },
  {
    name: 'Festival Offering',
    description: 'Feast day and special season offerings',
    amount: 'Variable',
    active: true,
  },
  {
    name: 'Sacrament Dues',
    description: 'Fees associated with sacramental celebrations',
    amount: 'Variable',
    active: true,
  },
  {
    name: 'Building Fund',
    description: 'Parish renovation and construction fund',
    amount: 'Voluntary',
    active: true,
  },
  {
    name: 'Donation',
    description: 'General charitable donations to the parish',
    amount: 'Voluntary',
    active: true,
  },
];

export default function AdminPaymentCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-primary text-3xl font-bold">Payment Categories</h1>
          <p className="text-muted-foreground text-sm">
            Manage parish contribution categories and dues structures.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-semibold">
          + Add Category
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div
            key={c.name}
            className="bg-card border-border rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-heading text-foreground text-base font-bold">{c.name}</h3>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                Active
              </span>
            </div>
            <p className="text-muted-foreground mt-2 text-xs">{c.description}</p>
            <p className="text-primary mt-3 text-sm font-semibold">{c.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
