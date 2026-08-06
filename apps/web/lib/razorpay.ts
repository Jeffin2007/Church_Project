/**
 * Razorpay SDK Loader & Integration Helper
 * Queen of All Saints Digital Parish Platform
 */

export interface RazorpayPaymentSuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface RazorpayPaymentErrorResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id?: string;
      payment_id?: string;
    };
  };
}

export interface RazorpayCheckoutOptions {
  key?: string;
  amount: number; // in paise (e.g., ₹100 = 10000)
  currency?: string; // default 'INR'
  name?: string;
  description?: string;
  image?: string;
  order_id?: string;
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
 * Launches the official Razorpay Checkout modal window.
 */
export async function launchRazorpayCheckout(params: {
  amountInRupees: number;
  purpose: string;
  category: string;
  familyName: string;
  familyNumber: string;
  contactPhone?: string;
  contactEmail?: string;
  onSuccess: (response: RazorpayPaymentSuccessResponse) => void;
  onFailure?: (error: unknown) => void;
  onDismiss?: () => void;
}): Promise<boolean> {
  const isLoaded = await loadRazorpaySDK();
  if (!isLoaded || !window.Razorpay) {
    if (params.onFailure) {
      params.onFailure(new Error('Failed to load Razorpay Checkout SDK script.'));
    }
    return false;
  }

  const key = getRazorpayKeyId();
  const amountInPaise = Math.round(params.amountInRupees * 100);

  const options: RazorpayCheckoutOptions = {
    key,
    amount: amountInPaise,
    currency: 'INR',
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
    handler: (response: RazorpayPaymentSuccessResponse) => {
      params.onSuccess(response);
    },
    modal: {
      ondismiss: () => {
        if (params.onDismiss) {
          params.onDismiss();
        }
      },
    },
  };

  try {
    const razorpayInstance = new window.Razorpay(options);
    if (params.onFailure) {
      razorpayInstance.on('payment.failed', (resp: unknown) => {
        params.onFailure?.(resp);
      });
    }
    razorpayInstance.open();
    return true;
  } catch (err) {
    if (params.onFailure) {
      params.onFailure(err);
    }
    return false;
  }
}
