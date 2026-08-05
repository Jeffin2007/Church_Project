import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Queen of All Saints Parish',
  description: 'Learn about Queen of All Saints Roman Catholic Church',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <h1 className="font-heading text-primary text-4xl font-bold">
          About Queen of All Saints Parish
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Queen of All Saints Parish is a Roman Catholic community centered on the Holy Eucharist,
          prayer, and Gospel service.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <h3 className="font-heading text-primary text-xl font-bold">Our Mission</h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            To glorify God through faithful celebration of the Sacraments, vibrant Anbiyam prayer
            fellowships, and loving service to the poor and needy.
          </p>
        </div>
        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <h3 className="font-heading text-secondary text-xl font-bold">Our Vision</h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            A united parish family growing in holiness, empowering youth and families, and using
            digital platforms for parish communion.
          </p>
        </div>
      </div>
    </div>
  );
}
