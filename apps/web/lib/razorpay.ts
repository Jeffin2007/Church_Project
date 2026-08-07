/**
 * Official Razorpay SDK Loader & Integration Helper
 * Queen of All Saints Digital Parish Platform
 */
import { api } from '@/lib/api';

export interface RazorpayPaymentSuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface RazorpayVerificationResult {
  success: boolean;
  verified: boolean;
  paymentId: string;
  receiptNumber: string;
  transactionId: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface RazorpayOrderResult {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  paymentId: string;
}

export interface RazorpayCheckoutOptions {
  key?: string;
  amount: number; // in paise (e.g., ₹100 = 10000)
  currency?: string; // default 'INR'
  name?: string;
  description?: string;
  image?: string;
  order_id: string; // Mandatory server order_id
  handler: (response: RazorpayPaymentSuccessResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
    backdrop_color?: string;
  };
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    backdropclose?: boolean;
  };
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => {
      open: () => void;
      on: (event: string, callback: (response: unknown) => void) => void;
    };
  }
}

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

export function getRazorpayKeyId(): string {
  return (
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
    process.env.RAZORPAY_KEY_ID ||
    'rzp_test_TKZfmutWTC2qVz'
  );
}

/**
 * Dynamically loads the official Razorpay Checkout SDK script into document body.
 */
export function loadRazorpaySDK(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * Step 1: Request NestJS backend to create a real Razorpay Order
 */
export async function createBackendRazorpayOrder(params: {
  amount: number;
  category: string;
  purpose: string;
  familyNumber?: string;
  familyName?: string;
  contactPhone?: string;
  contactEmail?: string;
}): Promise<RazorpayOrderResult> {
  const response = await api.post<RazorpayOrderResult>('/payments/create-order', params);
  if (!response.data || !response.data.orderId) {
    throw new Error('Failed to obtain Razorpay Order ID from backend server.');
  }
  return response.data;
}

/**
 * Step 2: Verify Razorpay HMAC-SHA256 signature with NestJS backend
 */
export async function verifyBackendRazorpayPayment(params: {
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
  paymentId?: string;
  category?: string;
  purpose?: string;
  amount?: number;
  familyNumber?: string;
  familyName?: string;
}): Promise<RazorpayVerificationResult> {
  const response = await api.post<RazorpayVerificationResult>('/payments/verify', params);
  if (!response.data || !response.data.success) {
    throw new Error('Payment verification failed on backend server.');
  }
  return response.data;
}

/**
 * Launches the official Razorpay Checkout modal window with backend order creation & signature verification.
 */
export async function launchRazorpayCheckout(params: {
  amountInRupees: number;
  purpose: string;
  category: string;
  familyName: string;
  familyNumber: string;
  contactPhone?: string;
  contactEmail?: string;
  onSuccess: (result: RazorpayVerificationResult) => void;
  onFailure?: (error: Error) => void;
  onDismiss?: () => void;
}): Promise<boolean> {
  const isLoaded = await loadRazorpaySDK();
  if (!isLoaded || !window.Razorpay) {
    params.onFailure?.(new Error('Failed to load Razorpay Checkout SDK script from Razorpay CDN.'));
    return false;
  }

  try {
    // 1. Create order on backend
    const orderData = await createBackendRazorpayOrder({
      amount: params.amountInRupees,
      category: params.category,
      purpose: params.purpose,
      familyNumber: params.familyNumber,
      familyName: params.familyName,
      contactPhone: params.contactPhone,
      contactEmail: params.contactEmail,
    });

    const key = orderData.keyId || getRazorpayKeyId();

    // 2. Configure official Razorpay Checkout options with server order_id
    const options: RazorpayCheckoutOptions = {
      key,
      amount: orderData.amount,
      currency: orderData.currency || 'INR',
      order_id: orderData.orderId,
      name: 'Queen of All Saints Church',
      description: `${params.category}: ${params.purpose}`,
      theme: {
        color: '#8B1A1A',
      },
      prefill: {
        name: params.familyName,
        contact: params.contactPhone || '',
        email: params.contactEmail || '',
      },
      notes: {
        familyNumber: params.familyNumber,
        familyName: params.familyName,
        category: params.category,
        purpose: params.purpose,
      },
      handler: async (resp: RazorpayPaymentSuccessResponse) => {
        try {
          if (!resp.razorpay_payment_id || !resp.razorpay_order_id || !resp.razorpay_signature) {
            throw new Error('Incomplete payment response returned by Razorpay Checkout.');
          }

          // 3. Verify cryptographic HMAC signature on NestJS backend
          const verificationResult = await verifyBackendRazorpayPayment({
            razorpayPaymentId: resp.razorpay_payment_id,
            razorpayOrderId: resp.razorpay_order_id,
            razorpaySignature: resp.razorpay_signature,
            paymentId: orderData.paymentId,
            category: params.category,
            purpose: params.purpose,
            amount: params.amountInRupees,
            familyNumber: params.familyNumber,
            familyName: params.familyName,
          });

          params.onSuccess(verificationResult);
        } catch (verifyErr: unknown) {
          const errObj = verifyErr as { message?: string };
          params.onFailure?.(
            verifyErr instanceof Error
              ? verifyErr
              : new Error(errObj?.message || 'Payment signature verification failed.'),
          );
        }
      },
      modal: {
        ondismiss: () => {
          params.onDismiss?.();
        },
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.on('payment.failed', (resp: unknown) => {
      const errObj = resp as { error?: { description?: string } };
      const errMsg =
        errObj?.error?.description || 'Payment was unsuccessful or declined by Razorpay.';
      params.onFailure?.(new Error(errMsg));
    });

    razorpayInstance.open();
    return true;
  } catch (err: unknown) {
    const errObj = err as { message?: string };
    params.onFailure?.(
      err instanceof Error
        ? err
        : new Error(errObj?.message || 'Failed to initialize official Razorpay Checkout.'),
    );
    return false;
  }
}
