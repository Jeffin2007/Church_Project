import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Queen of All Saints Parish',
  description: 'Parish office address, phone numbers, and location map',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <h1 className="font-heading text-primary text-4xl font-bold">Contact Parish Office</h1>
        <p className="text-muted-foreground text-lg">
          We are here to serve you. Reach out to the parish office for inquiries and assistance.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-card space-y-4 rounded-xl border p-6 shadow-sm">
          <h3 className="font-heading text-primary text-xl font-bold">Parish Address</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Queen of All Saints Roman Catholic Church
            <br />
            Parish Office Road
            <br />
            Tiruchirappalli, Tamil Nadu – 620001
          </p>
          <div className="space-y-2 border-t pt-4 text-sm">
            <p>
              <strong>Email:</strong> admin@queenofallsaints.in
            </p>
            <p>
              <strong>Phone:</strong> +91 431 2400000
            </p>
            <p>
              <strong>Office Hours:</strong> Mon – Sat (9 AM – 1 PM, 4 PM – 7 PM)
            </p>
          </div>
        </div>

        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <h3 className="font-heading text-secondary mb-4 text-xl font-bold">
            Contact Information
          </h3>
          <div className="space-y-4 text-sm">
            <div className="bg-muted/40 rounded-lg p-4">
              <p className="text-foreground font-semibold">📧 Email Us</p>
              <p className="text-muted-foreground mt-1">admin@queenofallsaints.in</p>
              <p className="text-muted-foreground">office@queenofallsaints.in</p>
            </div>
            <div className="bg-muted/40 rounded-lg p-4">
              <p className="text-foreground font-semibold">📞 Call the Parish Office</p>
              <p className="text-muted-foreground mt-1">+91 431 2400000</p>
              <p className="text-muted-foreground">+91 431 2400001 (Emergency)</p>
            </div>
            <div className="bg-muted/40 rounded-lg p-4">
              <p className="text-foreground font-semibold">🌐 Digital Requests</p>
              <p className="text-muted-foreground mt-1">
                For sacrament requests, certificate copies, and appointments — please use the{' '}
                <a href="/login" className="text-primary font-semibold hover:underline">
                  Parish Portal
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
