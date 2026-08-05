import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Payments & Dues | Parish Portal' };

const payments = [
  {
    id: 'PAY-2026-0401',
    type: 'Monthly Dues',
    amount: '₹500',
    month: 'July 2026',
    paidOn: '2026-07-10',
    status: 'Paid',
    receiptId: 'REC-2026-0401',
  },
  {
    id: 'PAY-2026-0320',
    type: 'Monthly Dues',
    amount: '₹500',
    month: 'June 2026',
    paidOn: '2026-06-08',
    status: 'Paid',
    receiptId: 'REC-2026-0320',
  },
  {
    id: 'PAY-2026-0210',
    type: 'Festival Offering',
    amount: '₹1,000',
    month: 'Feast Day May 2026',
    paidOn: '2026-05-15',
    status: 'Paid',
    receiptId: 'REC-2026-0210',
  },
];

export default function FamilyPaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-secondary text-3xl font-bold">Dues & Payments</h1>
        <p className="text-muted-foreground text-sm">
          Your parish contribution history and pending dues.
        </p>
      </div>

      {/* Pending Due Banner */}
      <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5 dark:border-yellow-700/40 dark:bg-yellow-900/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-200">
              August 2026 Monthly Dues — Due
            </h3>
            <p className="mt-1 text-xs text-yellow-700 dark:text-yellow-400">
              ₹500 — Due by August 15, 2026
            </p>
          </div>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-xs font-semibold">
            Pay Now
          </button>
        </div>
      </div>

      <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-heading text-lg font-bold">Payment History</h3>
          <Link
            href="/family/receipts"
            className="text-secondary text-xs font-semibold hover:underline"
          >
            View Receipts →
          </Link>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground border-b text-xs uppercase">
            <tr>
              <th className="p-4">Description</th>
              <th className="p-4">Period</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Paid On</th>
              <th className="p-4">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-muted/20">
                <td className="p-4 font-medium">{p.type}</td>
                <td className="text-muted-foreground p-4">{p.month}</td>
                <td className="p-4 font-semibold">{p.amount}</td>
                <td className="text-muted-foreground p-4">{p.paidOn}</td>
                <td className="p-4">
                  <button className="text-secondary text-xs font-semibold hover:underline">
                    {p.receiptId}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
