import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'My Family Dashboard | Parish Portal' };

export default function FamilyDashboardPage() {
  const quickLinks = [
    { label: 'Pay Monthly Dues', href: '/family/payments', icon: '💳', desc: 'Next due: Sep 2026' },
    {
      label: 'Request Certificate',
      href: '/family/requests',
      icon: '📜',
      desc: 'Baptism, Marriage, etc.',
    },
    {
      label: 'Book Appointment',
      href: '/family/appointments',
      icon: '📅',
      desc: 'Meet with the priest',
    },
    { label: 'Join a Ministry', href: '/family/volunteer', icon: '🤝', desc: 'Serve your parish' },
  ];

  const announcements = [
    {
      title: 'Parish Feast Day — August 15th',
      body: 'Solemn High Mass at 8:30 AM followed by parish lunch. All families are cordially invited.',
    },
    {
      title: 'Anbiyam Monthly Meeting',
      body: 'St. Thomas Anbiyam monthly prayer meeting on Sunday, August 10th at 4:00 PM.',
    },
    {
      title: 'Catechism Registration Open',
      body: 'Sunday school registration for the academic year 2026-27 is now open. Contact the parish office.',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-secondary text-3xl font-bold">
          Welcome, Joseph Anthony Family
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Family No: <span className="text-foreground font-semibold">QOAS-2024-0001</span> ·
          Anbiyam: <span className="text-foreground font-semibold">St. Thomas Anbiyam</span> ·
          Members: <span className="text-foreground font-semibold">4</span>
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {quickLinks.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="bg-card border-border hover:border-secondary/40 flex items-center gap-4 rounded-xl border p-5 shadow-sm transition-all hover:shadow-md"
          >
            <span className="text-3xl">{q.icon}</span>
            <div>
              <h3 className="text-foreground text-sm font-semibold">{q.label}</h3>
              <p className="text-muted-foreground mt-0.5 text-xs">{q.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity + Announcements */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Payment Status */}
        <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
          <h3 className="font-heading mb-4 text-lg font-bold">Payment Status</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-medium">Monthly Dues — August 2026</p>
                <p className="text-muted-foreground text-xs">Due by Aug 15, 2026</p>
              </div>
              <span className="rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-bold text-yellow-800">
                Due Soon
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-medium">Monthly Dues — July 2026</p>
                <p className="text-muted-foreground text-xs">Paid on Jul 10, 2026</p>
              </div>
              <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-800">
                Paid
              </span>
            </div>
            <Link
              href="/family/payments"
              className="text-secondary text-xs font-semibold hover:underline"
            >
              View all payment history →
            </Link>
          </div>
        </div>

        {/* Parish Announcements */}
        <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
          <h3 className="font-heading mb-4 text-lg font-bold">Parish Announcements</h3>
          <div className="space-y-4">
            {announcements.map((a) => (
              <div key={a.title} className="border-b pb-3 last:border-0 last:pb-0">
                <h4 className="text-foreground text-sm font-semibold">{a.title}</h4>
                <p className="text-muted-foreground mt-1 text-xs">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
