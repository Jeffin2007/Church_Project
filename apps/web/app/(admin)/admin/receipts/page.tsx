'use client';

import React, { useState } from 'react';

// Sample Parish Office Receipt Data
const INITIAL_RECEIPTS = [
  {
    id: 'rcp_01',
    receiptNumber: 'QOAS-2026-000124',
    receiptDate: '09 Aug 2026',
    payerName: 'John Peter',
    familyId: 'FAM-00124',
    anbiyam: 'St. Joseph Anbiyam',
    type: 'Mass Intention',
    amount: 500,
    amountFormatted: '₹500.00',
    amountInWords: 'Rupees Five Hundred Only',
    method: 'UPI',
    status: 'PAID',
    transactionId: 'pay_OAS98421038X',
    metadata: {
      massDate: '15 Aug 2026',
      massTime: '6:00 PM',
      intentionType: 'For the Soul',
      description: 'For the repose of the soul of Mary Peter',
    },
    blessing: { show: false },
    hmacHash: '8f82a91b4c92e71d3a05928f6110a3948e7102948c2710492',
  },
  {
    id: 'rcp_02',
    receiptNumber: 'QOAS-2026-000125',
    receiptDate: '09 Aug 2026',
    payerName: 'Francis Xavier',
    familyId: 'FAM-00389',
    anbiyam: 'St. Jude Anbiyam',
    type: 'Mass Intention',
    amount: 1000,
    amountFormatted: '₹1,000.00',
    amountInWords: 'Rupees One Thousand Only',
    method: 'UPI',
    status: 'PAID',
    transactionId: 'pay_OAS98421039Y',
    metadata: {
      massDate: '18 Aug 2026',
      massTime: '6:30 AM',
      intentionType: 'Birthday',
      description: 'Special Thanksgiving and Mass for the 25th Birthday of Andrew Xavier',
    },
    blessing: {
      show: true,
      text: 'The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you.',
      verseRef: '— Numbers 6:24-25',
    },
    hmacHash: '7b92f10c883e41a99d21054e129aa10294857102983710294',
  },
  {
    id: 'rcp_03',
    receiptNumber: 'QOAS-2026-000126',
    receiptDate: '09 Aug 2026',
    payerName: "Robert & Maria D'Souza",
    familyId: 'FAM-00045',
    anbiyam: 'St. Anthony Anbiyam',
    type: 'Mass Intention',
    amount: 1500,
    amountFormatted: '₹1,500.00',
    amountInWords: 'Rupees One Thousand Five Hundred Only',
    method: 'Net Banking',
    status: 'PAID',
    transactionId: 'pay_OAS98421040Z',
    metadata: {
      massDate: '22 Aug 2026',
      massTime: '7:00 AM',
      intentionType: 'Wedding Anniversary',
      description: "Thanksgiving for the 15th Wedding Anniversary of Robert & Maria D'Souza",
    },
    blessing: {
      show: true,
      text: 'Above all, clothe yourselves with love, which binds everything together in perfect harmony.',
      verseRef: '— Colossians 3:14',
    },
    hmacHash: '3a11e89920bf4d91c8821034f890c10294857102983710294',
  },
  {
    id: 'rcp_04',
    receiptNumber: 'QOAS-2026-000127',
    receiptDate: '09 Aug 2026',
    payerName: 'Dominic Savio',
    familyId: 'FAM-00210',
    anbiyam: 'Holy Family Anbiyam',
    type: 'Church Tax',
    amount: 2400,
    amountFormatted: '₹2,400.00',
    amountInWords: 'Rupees Two Thousand Four Hundred Only',
    method: 'UPI',
    status: 'PAID',
    transactionId: 'pay_OAS98421041A',
    metadata: {
      financialYear: '2026 - 2027',
      contributionPeriod: 'Annual Family Parish Tax',
    },
    blessing: { show: false },
    hmacHash: '9e44d180841a29c7b01934e88102b10294857102983710294',
  },
  {
    id: 'rcp_05',
    receiptNumber: 'QOAS-2026-000128',
    receiptDate: '09 Aug 2026',
    payerName: 'Elizabeth Rani',
    familyId: 'FAM-00108',
    anbiyam: 'St. Therese Anbiyam',
    type: 'Volunteer Support',
    amount: 5000,
    amountFormatted: '₹5,000.00',
    amountInWords: 'Rupees Five Thousand Only',
    method: 'Card',
    status: 'PAID',
    transactionId: 'pay_OAS98421042B',
    metadata: {
      purpose: 'Parish Feast Sound System & Lighting Logistics',
      reference: 'VOL-FEAST-2026-88',
    },
    blessing: { show: false },
    hmacHash: '11d8820f4c9a8b7123901aef5521c10294857102983710294',
  },
  {
    id: 'rcp_06',
    receiptNumber: 'QOAS-2026-000130',
    receiptDate: '09 Aug 2026',
    payerName: 'Sebastian Alphonse',
    familyId: 'FAM-00012',
    anbiyam: 'St. Joseph Anbiyam',
    type: 'Building Fund',
    amount: 10000,
    amountFormatted: '₹10,000.00',
    amountInWords: 'Rupees Ten Thousand Only',
    method: 'Net Banking',
    status: 'PAID',
    transactionId: 'pay_OAS98421044D',
    blessing: { show: false },
    hmacHash: '60a12e884b90e712c99a81e55021e10294857102983710294',
  },
];

export default function ParishReceiptsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedReceipt, setSelectedReceipt] = useState<(typeof INITIAL_RECEIPTS)[0] | null>(null);

  const filteredReceipts = INITIAL_RECEIPTS.filter((r) => {
    const matchesSearch =
      r.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.payerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || r.type === categoryFilter;
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalCollections = 245500;
  const totalCount = 184;
  const successCount = 176;

  return (
    <div
      style={{ padding: '2rem', maxWidth: '1280px', margin: '0 auto', fontFamily: 'sans-serif' }}
    >
      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1b2a4a', margin: 0 }}>
            Parish Receipts
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Queen of All Saints Church • Tamper-Evident, Versioned Receipt Audit Portal
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            background: '#fff',
            border: '1px solid #e5e7eb',
            padding: '1.25rem',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <span
            style={{
              fontSize: '0.8rem',
              color: '#6b7280',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Collections
          </span>
          <p
            style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: '#047857',
              margin: '0.3rem 0 0 0',
            }}
          >
            ₹{totalCollections.toLocaleString('en-IN')}.00
          </p>
        </div>
        <div
          style={{
            background: '#fff',
            border: '1px solid #e5e7eb',
            padding: '1.25rem',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <span
            style={{
              fontSize: '0.8rem',
              color: '#6b7280',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Total Receipts
          </span>
          <p
            style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: '#1b2a4a',
              margin: '0.3rem 0 0 0',
            }}
          >
            {totalCount}
          </p>
        </div>
        <div
          style={{
            background: '#fff',
            border: '1px solid #e5e7eb',
            padding: '1.25rem',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <span
            style={{
              fontSize: '0.8rem',
              color: '#6b7280',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Successful Payments
          </span>
          <p
            style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: '#8b6b23',
              margin: '0.3rem 0 0 0',
            }}
          >
            {successCount}
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          padding: '1rem 1.25rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          placeholder="Search receipts by Receipt #, Payer, Transaction ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: '0.6rem 0.8rem',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '0.9rem',
            outline: 'none',
          }}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
            padding: '0.6rem 0.8rem',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '0.9rem',
            background: '#fff',
            outline: 'none',
          }}
        >
          <option value="ALL">Category: All</option>
          <option value="Mass Intention">Mass Intention</option>
          <option value="Church Tax">Church Tax</option>
          <option value="Volunteer Support">Volunteer Support</option>
          <option value="Building Fund">Building Fund</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '0.6rem 0.8rem',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '0.9rem',
            background: '#fff',
            outline: 'none',
          }}
        >
          <option value="ALL">Status: All</option>
          <option value="PAID">PAID</option>
          <option value="PENDING">PENDING</option>
        </select>
      </div>

      {/* Receipts Table */}
      <div
        style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '0.88rem',
          }}
        >
          <thead>
            <tr
              style={{
                background: '#f8fafc',
                borderBottom: '1px solid #e5e7eb',
                color: '#4b5563',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              <th style={{ padding: '0.85rem 1rem' }}>Receipt #</th>
              <th style={{ padding: '0.85rem 1rem' }}>Payer</th>
              <th style={{ padding: '0.85rem 1rem' }}>Type</th>
              <th style={{ padding: '0.85rem 1rem' }}>Amount</th>
              <th style={{ padding: '0.85rem 1rem' }}>Status</th>
              <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReceipts.map((rcp) => (
              <tr key={rcp.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td
                  style={{
                    padding: '0.85rem 1rem',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    color: '#1b2a4a',
                  }}
                >
                  {rcp.receiptNumber}
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      fontWeight: 'normal',
                    }}
                  >
                    {rcp.receiptDate}
                  </span>
                </td>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>
                  {rcp.payerName}
                  {rcp.familyId && (
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: 'normal',
                      }}
                    >
                      {rcp.familyId} • {rcp.anbiyam}
                    </span>
                  )}
                </td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <span
                    style={{
                      padding: '0.2rem 0.6rem',
                      borderRadius: '3px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      background: '#faf6ed',
                      color: '#8b6b23',
                      border: '1px solid #8b6b23',
                    }}
                  >
                    {rcp.type}
                  </span>
                </td>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 'bold', color: '#111827' }}>
                  {rcp.amountFormatted}
                </td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <span
                    style={{
                      padding: '0.15rem 0.5rem',
                      borderRadius: '3px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      background: '#ecfdf5',
                      color: '#047857',
                      border: '1px solid #a7f3d0',
                    }}
                  >
                    {rcp.status}
                  </span>
                </td>
                <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                  <button
                    onClick={() => setSelectedReceipt(rcp)}
                    style={{
                      background: '#1b2a4a',
                      color: '#fff',
                      border: 'none',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      marginRight: '0.3rem',
                    }}
                  >
                    View
                  </button>
                  <a
                    href={`/receipt/receipt-demo.html`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: '#374151',
                      color: '#fff',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      marginRight: '0.3rem',
                    }}
                  >
                    Download
                  </a>
                  <button
                    onClick={() => window.print()}
                    style={{
                      background: '#8b6b23',
                      color: '#fff',
                      border: 'none',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      marginRight: '0.3rem',
                    }}
                  >
                    Print
                  </button>
                  <a
                    href={`/verify-receipt-demo.html?hash=${rcp.hmacHash}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: '#0284c7',
                      color: '#fff',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}
                  >
                    Verify
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Receipt Preview */}
      {selectedReceipt && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15,23,42,0.6)',
            backdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
        >
          <div
            style={{
              background: '#fff',
              width: '100%',
              maxWidth: '820px',
              maxHeight: '90vh',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            }}
          >
            <div
              style={{
                padding: '1rem 1.5rem',
                background: '#f8fafc',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1b2a4a', fontFamily: 'serif' }}>
                Receipt Preview - {selectedReceipt.receiptNumber}
              </h3>
              <div>
                <button
                  onClick={() => window.print()}
                  style={{
                    background: '#8b6b23',
                    color: '#fff',
                    border: 'none',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginRight: '0.5rem',
                  }}
                >
                  Print
                </button>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  style={{
                    background: '#6b7280',
                    color: '#fff',
                    border: 'none',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  Close
                </button>
              </div>
            </div>
            <iframe
              src={`/receipt/receipt-demo.html`}
              title="Receipt View"
              style={{ width: '100%', height: '650px', border: 'none' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
