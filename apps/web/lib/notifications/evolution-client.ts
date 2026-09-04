const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || 'http://localhost:8080';
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || '';
const INSTANCE_NAME = process.env.EVOLUTION_INSTANCE_NAME || 'qoas-parish';

export interface SendTextMessageParams {
  phone: string; // e.g. "+91 98765 43210" or "9876543210"
  message: string;
}

/**
 * Standardize Indian and International phone numbers to WhatsApp format
 */
export function formatWhatsAppNumber(phone: string): string {
  let cleaned = phone.replace(/\D/g, '');
  // Default to India (+91) if 10-digit number is provided
  if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  return cleaned;
}

/**
 * Sends a WhatsApp text message via Evolution API
 */
export async function sendWhatsAppMessage({ phone, message }: SendTextMessageParams) {
  const number = formatWhatsAppNumber(phone);

  if (!EVOLUTION_API_KEY) {
    console.warn('[Evolution API] Missing EVOLUTION_API_KEY. Message logged to console:');
    console.info(`To: ${number}\nMessage:\n${message}`);
    return { success: true, mocked: true };
  }

  try {
    const response = await fetch(`${EVOLUTION_API_URL}/message/sendText/${INSTANCE_NAME}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY,
      },
      body: JSON.stringify({
        number,
        options: {
          delay: 1000,
          presence: 'composing',
        },
        textMessage: {
          text: message,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Evolution API Error]', data);
      return { success: false, error: data };
    }

    return { success: true, data };
  } catch (error) {
    console.error('[Evolution API Network Error]', error);
    return { success: false, error };
  }
}
