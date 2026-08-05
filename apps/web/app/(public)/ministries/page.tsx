import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Parish Ministries | Queen of All Saints Parish',
  description: 'Explore parish associations and ministries',
};

export default function MinistriesPage() {
  const ministries = [
    {
      title: 'Youth Movement',
      desc: 'Engaging parish youth in faith formation, choir, and service.',
    },
    {
      title: 'Legion of Mary',
      desc: 'Marian devotion and house visits for sick and elderly parishioners.',
    },
    {
      title: 'Vincent de Paul Society',
      desc: 'Charity, food distribution, and medical aid to needy families.',
    },
    {
      title: 'Catechism Teachers',
      desc: 'Sunday school instruction and sacramental preparation for children.',
    },
    {
      title: 'Altar Servers Association',
      desc: 'Serving at the altar during Holy Mass and liturgical services.',
    },
    {
      title: 'Parish Choir',
      desc: 'Leading liturgical worship and liturgical music in Tamil and English.',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <h1 className="font-heading text-primary text-4xl font-bold">
          Parish Ministries & Organizations
        </h1>
        <p className="text-muted-foreground text-lg">
          Active parish groups serving God and neighbor.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ministries.map((m) => (
          <div key={m.title} className="bg-card rounded-xl border p-6 shadow-sm">
            <h3 className="font-heading text-primary text-lg font-bold">{m.title}</h3>
            <p className="text-muted-foreground mt-2 text-sm">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
