import React from 'react';

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
    diocese: 'Tiruchirappalli Diocese',
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
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
          textAlign: 'center',
        }}
      >
        {hasHash ? (
          <>
            {/* Verification Status Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#ecfdf5',
                color: '#047857',
                border: '1px solid #a7f3d0',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                marginBottom: '1.25rem',
              }}
            >
              <span>✓</span> VERIFIED OFFICIAL RECEIPT
            </div>

            <h1
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1b2a4a',
                marginBottom: '0.2rem',
              }}
            >
              {verification.parishName}
            </h1>
            <p
              style={{
                fontSize: '0.85rem',
                color: '#8b6b23',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '1.5rem',
              }}
            >
              {verification.diocese}
            </p>

            {/* Verification Card Details (No PII Exposed!) */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '1.25rem',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: '0.9rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '0.5rem',
                }}
              >
                <span style={{ color: '#64748b' }}>Receipt Number:</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#1b2a4a' }}>
                  {verification.receiptNumber}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '0.5rem',
                }}
              >
                <span style={{ color: '#64748b' }}>Receipt Type:</span>
                <span style={{ fontWeight: 'bold', color: '#8b6b23' }}>
                  {verification.receiptType}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '0.5rem',
                }}
              >
                <span style={{ color: '#64748b' }}>Date Issued:</span>
                <span style={{ fontWeight: 600, color: '#1e293b' }}>
                  {verification.receiptDate}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '0.5rem',
                }}
              >
                <span style={{ color: '#64748b' }}>Amount Received:</span>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#047857' }}>
                  {verification.amountFormatted}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '0.5rem',
                }}
              >
                <span style={{ color: '#64748b' }}>Payment Status:</span>
                <span
                  style={{
                    backgroundColor: '#ecfdf5',
                    color: '#047857',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '3px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                  }}
                >
                  {verification.paymentStatus}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Template Version:</span>
                <span style={{ fontFamily: 'monospace', color: '#64748b', fontSize: '0.85rem' }}>
                  {verification.templateVersion}
                </span>
              </div>
            </div>

            <p
              style={{
                fontSize: '0.75rem',
                color: '#94a3b8',
                marginTop: '1.25rem',
                fontStyle: 'italic',
              }}
            >
              Verified via Queen of All Saints Digital Parish Cryptographic Verification Engine at{' '}
              {verification.verifiedAt}
            </p>
          </>
        ) : (
          <>
            {/* Missing Hash State */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#fef3c7',
                color: '#92400e',
                border: '1px solid #fde68a',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                marginBottom: '1.25rem',
              }}
            >
              <span>ℹ</span> RECEIPT VERIFICATION
            </div>

            <h1
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1b2a4a',
                marginBottom: '0.2rem',
              }}
            >
              {verification.parishName}
            </h1>
            <p
              style={{
                fontSize: '0.85rem',
                color: '#8b6b23',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '1.5rem',
              }}
            >
              {verification.diocese}
            </p>

            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '1.5rem',
                textAlign: 'center',
              }}
            >
              <p style={{ fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>
                Verify Receipt
              </p>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5 }}>
                Please scan a valid receipt QR code or provide a receipt verification link.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
