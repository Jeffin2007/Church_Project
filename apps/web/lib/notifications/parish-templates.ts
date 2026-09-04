import { sendWhatsAppMessage } from './evolution-client';

export interface MassIntentionNotificationData {
  donorName: string;
  phone: string;
  intentionFor: string;
  intentionType: 'Thanksgiving' | 'Soul Rest (RIP)' | 'Special Intention' | 'Health & Healing';
  massDate: string;
  massTime: string;
  amount: number;
  receiptNumber: string;
}

export interface DonationReceiptNotificationData {
  donorName: string;
  phone: string;
  cause: string;
  amount: number;
  paymentMode: 'UPI' | 'Card' | 'NetBanking' | 'Cash';
  receiptNumber: string;
  date: string;
}

/**
 * Sends a Mass Intention Booking Confirmation via WhatsApp
 */
export async function sendMassIntentionConfirmation(data: MassIntentionNotificationData) {
  const message = 
`✝️ *QUEEN OF ALL SAINTS CHURCH* ✝️
_Roman Catholic Diocese of Tiruchirappalli_
━━━━━━━━━━━━━━━━━━━━━━
Dear *${data.donorName}*,

Your Mass Intention request has been confirmed by the Parish Office.

📋 *INTENTION DETAILS*
• *Type:* ${data.intentionType}
• *Intention For:* ${data.intentionFor}
• *Mass Schedule:* ${data.massDate} at ${data.massTime}
• *Stipend / Offering:* ₹${data.amount.toLocaleString('en-IN')}
• *Receipt No:* #${data.receiptNumber}

🙏 _"The holy Sacrifice of the Mass will be offered for your prayer intention."_

May Our Lady, Queen of All Saints, intercede for you and your family!
━━━━━━━━━━━━━━━━━━━━━━
📍 *Queen of All Saints Church, Dervan*
📞 Parish Office: +91 94431 00000`;

  return sendWhatsAppMessage({
    phone: data.phone,
    message,
  });
}

/**
 * Sends a Payment / Contribution Receipt Confirmation via WhatsApp
 */
export async function sendDonationReceipt(data: DonationReceiptNotificationData) {
  const message = 
`✝️ *QUEEN OF ALL SAINTS CHURCH* ✝️
_Parish Offering & Donation Receipt_
━━━━━━━━━━━━━━━━━━━━━━
Dear *${data.donorName}*,

Thank you for your generous contribution towards our parish community.

🧾 *RECEIPT DETAILS*
• *Receipt No:* #${data.receiptNumber}
• *Date:* ${data.date}
• *Contribution For:* ${data.cause}
• *Payment Mode:* ${data.paymentMode}
• *Amount Received:* *₹${data.amount.toLocaleString('en-IN')}*

_"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." (2 Cor 9:7)_

May God bless your generosity abundantly!
━━━━━━━━━━━━━━━━━━━━━━
📍 *Queen of All Saints Church, Dervan*`;

  return sendWhatsAppMessage({
    phone: data.phone,
    message,
  });
}
