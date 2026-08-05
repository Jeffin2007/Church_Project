import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Admin Dashboard | Queen of All Saints' };

export default function AdminDashboardPage() {
  const stats = [
    { title: 'Total Registered Families', value: '342', change: '+12 this month', icon: '🏠' },
    { title: 'Active Parishioners', value: '1,280', change: '7 Anbiyams', icon: '👥' },
    {
      title: 'Pending Sacrament Requests',
      value: '8',
      change: 'Requires Priest Review',
      icon: '📜',
    },
    {
      title: 'Monthly Collections (₹)',
      value: '₹1,45,000',
      change: '84% target reached',
      icon: '💳',
    },
  ];

  const recentRequests = [
    {
      id: 'REQ-2026-089',
      family: 'St. Mary Family (QOAS-2024-0001)',
      type: 'Baptism Certificate',
      date: '2026-08-04',
      status: 'Pending Review',
    },
    {
      id: 'REQ-2026-088',
      family: 'St. Joseph Family (QOAS-2024-0014)',
      type: 'Marriage Certificate',
      date: '2026-08-03',
      status: 'Approved',
    },
    {
      id: 'REQ-2026-087',
      family: 'St. Teresa Family (QOAS-2024-0028)',
      type: 'First Communion Request',
      date: '2026-08-02',
      status: 'Scheduled',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-primary text-3xl font-bold">
          Parish Administration Dashboard
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Welcome, Parish Priest & Administrative Staff. Real-time overview of parish operations.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.title}
            className="bg-card border-border rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-xs font-semibold uppercase">{s.title}</p>
                <h3 className="font-heading text-foreground mt-2 text-2xl font-bold">{s.value}</h3>
              </div>
              <span className="text-2xl">{s.icon}</span>
            </div>
            <p className="text-primary mt-3 text-xs font-medium">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Main Grid Section */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Table: Recent Sacrament Requests */}
        <div className="bg-card border-border rounded-xl border p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-heading text-foreground text-lg font-bold">
              Recent Sacrament & Certificate Requests
            </h3>
            <Link
              href="/admin/requests"
              className="text-primary text-xs font-semibold hover:underline"
            >
              View All Requests →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-muted-foreground bg-muted/30 border-b text-xs uppercase">
                <tr>
                  <th className="p-3">Req ID</th>
                  <th className="p-3">Family</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {recentRequests.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/20">
                    <td className="text-primary p-3 font-semibold">{r.id}</td>
                    <td className="p-3 font-medium">{r.family}</td>
                    <td className="text-muted-foreground p-3">{r.type}</td>
                    <td className="p-3">
                      <span className="bg-gold/20 text-gold-800 dark:text-gold-300 inline-block rounded-full px-2.5 py-1 text-[11px] font-bold">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Admin Actions */}
        <div className="bg-card border-border space-y-4 rounded-xl border p-6 shadow-sm">
          <h3 className="font-heading text-foreground text-lg font-bold">Quick Actions</h3>
          <div className="space-y-2">
            <Link
              href="/admin/families"
              className="border-border hover:border-primary hover:bg-primary/5 text-foreground block w-full rounded-lg border p-3 text-left text-xs font-semibold transition-all"
            >
              ➕ Register New Family
            </Link>
            <Link
              href="/admin/payments"
              className="border-border hover:border-primary hover:bg-primary/5 text-foreground block w-full rounded-lg border p-3 text-left text-xs font-semibold transition-all"
            >
              💳 Record Dues Payment
            </Link>
            <Link
              href="/admin/certificates"
              className="border-border hover:border-primary hover:bg-primary/5 text-foreground block w-full rounded-lg border p-3 text-left text-xs font-semibold transition-all"
            >
              🎓 Issue Baptism Certificate
            </Link>
            <Link
              href="/admin/anbiyams"
              className="border-border hover:border-primary hover:bg-primary/5 text-foreground block w-full rounded-lg border p-3 text-left text-xs font-semibold transition-all"
            >
              🏘️ View Anbiyam Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
