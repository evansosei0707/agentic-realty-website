// Central site configuration: contact details + CTA destinations.
// Every CTA on the page funnels through these.

export const site = {
  // WhatsApp Business number, E.164 without the +. Ghana 0543076754 -> 233543076754.
  whatsappNumber: '233543076754',

  // Prefilled message for the generic "WhatsApp us" CTA.
  whatsappText:
    'Hi Agentic Realty, I run an agency in Accra and want to see Ama in action.',

  // Prefilled message for the "Book a 15-min demo" CTA (booked via WhatsApp for now).
  demoText:
    "Hi Agentic Realty, I'd like to book a 15-minute demo of Ama for my agency.",

  email: 'hello@agenticrealty.co',

  // No separate booking page yet — the demo is booked via the WhatsApp chat.
  // If you later get a Cal.com / Calendly link, set it here and point DemoCTA at it.
  bookDemoUrl: '',
} as const

export function whatsappUrl(text: string = site.whatsappText): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`
}
