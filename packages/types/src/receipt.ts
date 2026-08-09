/**
 * Queen of All Saints Church - Official Receipt Data Contracts
 * Defines the strict, versioned JSON payload expected by the Receipt Generation Service.
 */

export type ReceiptTemplateVersion = 'v1.0' | string;

export enum ReceiptLifecycleState {
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  PAYMENT_VERIFIED = 'PAYMENT_VERIFIED',
  RECEIPT_GENERATING = 'RECEIPT_GENERATING',
  RECEIPT_GENERATED = 'RECEIPT_GENERATED',
  RECEIPT_STORED = 'RECEIPT_STORED',
  RECEIPT_DELIVERED = 'RECEIPT_DELIVERED',
  RECEIPT_GENERATION_FAILED = 'RECEIPT_GENERATION_FAILED',
}

export type PaymentCategoryType =
  | 'Mass Intention'
  | 'Church Tax'
  | 'Volunteer Support'
  | 'Sunday Offertory'
  | 'Feast Contribution'
  | 'Building Fund'
  | 'Charity Fund'
  | 'Other Parish Offering';

export interface ParishInfo {
  name: string;
  diocese: string;
  address: string;
  contactPhone: string;
  email: string;
  website: string;
}

export interface PayerInfo {
  name: string;
  familyId?: string | null;
  anbiyam?: string | null;
  maskedPhone: string;
}

export interface PaymentInfo {
  type: PaymentCategoryType;
  amount: number;
  formattedAmount: string;
  currency: string; // e.g. "₹"
  amountInWords: string;
  method: string; // e.g. "UPI", "Net Banking", "Card"
  status: 'PAID' | 'COMPLETED' | 'PENDING' | 'FAILED';
  transactionId: string;
}

export interface MassIntentionCategory {
  massDate: string;
  massTime: string;
  intentionType:
    | 'For the Soul'
    | 'Thanksgiving'
    | 'Birthday'
    | 'Wedding Anniversary'
    | 'Health and Healing'
    | 'Special Intention'
    | 'Other'
    | string;
  description: string;
}

export interface ChurchTaxCategory {
  financialYear: string;
  contributionPeriod: string;
}

export interface VolunteerSupportCategory {
  purpose: string;
  reference: string;
}

export interface CategoryDetails {
  massIntention?: MassIntentionCategory;
  churchTax?: ChurchTaxCategory;
  volunteerSupport?: VolunteerSupportCategory;
}

export interface BlessingInfo {
  show: boolean;
  text?: string;
  verseRef?: string;
}

export interface DigitalSignatureInfo {
  systemIdentifier: string;
  integrityStatus: 'VERIFIED' | 'INVALID';
  hmacHash: string;
  generatedTimestamp: string;
  verificationUrl: string;
  qrCodeDataUrl?: string;
}

export interface ReceiptData {
  templateVersion: ReceiptTemplateVersion;
  receiptNumber: string;
  receiptDate: string;
  parish: ParishInfo;
  payer: PayerInfo;
  payment: PaymentInfo;
  categoryDetails?: CategoryDetails;
  blessing: BlessingInfo;
  digitalSignature: DigitalSignatureInfo;
}

/**
 * Privacy-Preserving Public Receipt Verification Object
 * Returned by public verification endpoint GET /api/v1/receipts/verify?hash=:hash
 * Strict rule: Excludes all PII (Mobile number, Family ID, Anbiyam, Mass Intention details, Internal DB IDs).
 */
export interface PublicReceiptVerification {
  isVerified: boolean;
  parishName: string;
  receiptNumber: string;
  receiptType: PaymentCategoryType;
  receiptDate: string;
  amountFormatted: string;
  paymentStatus: string;
  templateVersion: string;
  verifiedAt: string;
}
