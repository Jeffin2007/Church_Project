import React from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2, QrCode } from 'lucide-react';
import { ChurchCard } from '@/components/ui/church-card';
import { ParishBadge } from '@/components/ui/parish-badge';
import { SacredDivider } from '@/components/ui/sacred-divider';

type VerifyReceiptPageProps = {
  searchParams: Promise<{
    hash?: string;
  }>;
};

export default async function VerifyReceiptPage({ searchParams }: VerifyReceiptPageProps) {
  const params = await searchParams;
  const hash = params.hash;

  const hasHash = Boolean(hash && hash.trim().length > 0);

  // Simulated Privacy-Preserving Verification Result (Strictly NO PII)
  const verification = {
    isVerified: hasHash,
    parishName: 'Queen of All Saints Church',
    diocese: 'Diocese of Tiruchirappalli',
    receiptNumber: hasHash ? 'QOAS-2026-000124' : 'N/A',
    receiptType: 'Mass Intention',
    receiptDate: '09 August 2026',
    amountFormatted: '₹500.00',
    paymentStatus: 'PAID',
    templateVersion: 'v1.0',
    verifiedAt: new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16 sm:py-24">
      <div className="w-full max-w-lg">
        <ChurchCard variant="gold-trim" hoverEffect={false} className="p-6 sm:p-10 text-center">
          {hasHash ? (
            <>
              {/* Verification Status Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>VERIFIED OFFICIAL RECEIPT</span>
              </div>

              <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {verification.parishName}
              </h1>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary dark:text-gold">
                {verification.diocese}
              </p>

              <SacredDivider symbol="cross" width="sm" className="my-5" />

              {/* Verification Card Details (No PII Exposed!) */}
              <div className="space-y-3 rounded-xl border border-border/80 bg-muted/40 p-5 text-left text-xs sm:text-sm dark:bg-muted/20">
                <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                  <span className="text-muted-foreground">Receipt Number:</span>
                  <span className="font-mono font-bold text-foreground">
                    {verification.receiptNumber}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                  <span className="text-muted-foreground">Receipt Type:</span>
                  <span className="font-semibold text-primary dark:text-gold">
                    {verification.receiptType}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                  <span className="text-muted-foreground">Date Issued:</span>
                  <span className="font-medium text-foreground">
                    {verification.receiptDate}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                  <span className="text-muted-foreground">Amount Received:</span>
                  <span className="font-mono text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {verification.amountFormatted}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <ParishBadge variant="ordinary" size="sm">
                    {verification.paymentStatus}
                  </ParishBadge>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-muted-foreground">Engine Version:</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {verification.templateVersion}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                <span>
                  Verified via QOAS Cryptographic Verification Engine at {verification.verifiedAt}
                </span>
              </div>
            </>
          ) : (
            <>
              {/* Missing Hash State */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                <AlertCircle className="h-4 w-4" />
                <span>RECEIPT VERIFICATION</span>
              </div>

              <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {verification.parishName}
              </h1>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary dark:text-gold">
                {verification.diocese}
              </p>

              <SacredDivider symbol="cross" width="sm" className="my-5" />

              <div className="rounded-xl border border-border/80 bg-muted/40 p-8 text-center dark:bg-muted/20">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-primary dark:bg-gold/15 dark:text-gold-300 mb-3">
                  <QrCode className="h-7 w-7" />
                </div>
                <p className="font-heading text-base font-bold text-foreground">
                  Scan Receipt QR Code
                </p>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Please scan a valid receipt QR code with your camera or open a verified receipt link to inspect its authenticity.
                </p>
              </div>
            </>
          )}
        </ChurchCard>
      </div>
    </div>
  );
}
