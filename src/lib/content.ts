// All page copy lives here. Components stay dumb; edit words in one place.
//
// MEDIA SLOTS ------------------------------------------------------------
// Each service below has a `media` entry. Drop your file into
// public/media/services/ and set `src` to its path, e.g.
//   media: { kind: 'video', src: '/media/services/whatsapp-sales-agent.mp4', ... }
// Until `src` is set, the site renders a designed placeholder frame,
// so the page looks finished either way.
// -------------------------------------------------------------------------

export type ServiceMedia = {
  kind: 'image' | 'video'
  /** Path under /public. Leave '' to show the placeholder frame. */
  src: string
  /** Poster image for videos (optional). */
  poster?: string
  alt: string
  /** Small caption printed under the frame. */
  label: string
}

export type Service = {
  id: string
  num: string
  name: string
  /** Short qualifier shown in the index list. */
  tag: string
  /** Optional badge, e.g. FLAGSHIP or FREE. */
  badge?: string
  /** Editorial headline inside the detail panel. */
  title: string
  body: string
  deliverables: readonly string[]
  media: ServiceMedia
}

export const content = {
  brand: {
    name: 'Agentic Realty',
    agent: 'Ama',
    bot: 'Agentic Realty Bot',
    tagline: 'The AI automation studio for real estate, built in Accra.',
  },

  nav: {
    wordmark: 'Agentic Realty',
    items: ['Services', 'How it works', 'Proof', 'FAQ'],
    login: 'Login',
    cta: 'Book a demo',
    secondaryCta: 'WhatsApp us',
  },

  hero: {
    eyebrow: 'AI AUTOMATION STUDIO · NOW ONBOARDING · ACCRA',
    headline: 'Sell homes. We run',
    headlineAccent: 'everything else.',
    subhead:
      'Agentic Realty builds and runs the machinery behind a modern agency. An AI sales agent answering WhatsApp at 2am. Walkthroughs that sell the house before the viewing. Contracts that sign and file themselves. Your team does the human part. The systems never stop doing the rest.',
    primaryCta: 'Book a 15-min demo',
    secondaryCta: 'See the nine systems',
    secondaryHref: '#services',
    microCta: 'Or start with the free workflow audit. We map the leaks, you keep the plan.',
    metrics: [
      { value: '< 5s', label: 'reply, any hour' },
      { value: '24/7', label: 'no sick days' },
      { value: '9', label: 'systems, one CRM' },
    ],
  },

  logos: {
    caption: 'Built in Accra, for agencies that want to move faster',
    points: [
      'Live in production',
      'Runs on your WhatsApp Business number',
      'Nine systems reporting into one CRM',
      'Speaks GHS, knows East Legon to Tema',
      'Your data stays yours',
    ],
  },

  problem: {
    eyebrow: 'THE REAL COST',
    title: "You're not short on demand.",
    titleAccent: "You're short on hours.",
    subhead:
      'An agency leaks money in three places: leads nobody answers, listings nobody sees, and paperwork that eats the week. You already paid for the demand. The leak is everything that happens after.',
    cards: [
      {
        tag: 'COVERAGE',
        title: 'The 11pm gap',
        body: 'Your best lead messages at 11pm. You reply at 8am. By 10am they have booked a viewing with another agent. One slow reply, one lost commission worth GHS 5,000 to 15,000.',
      },
      {
        tag: 'VISIBILITY',
        title: 'Listings nobody scrolls back for',
        body: 'A great house sits online for months with four dark photos. No walkthrough, no video, no posting rhythm. Buyers do not call about homes they scrolled past in half a second.',
      },
      {
        tag: 'OPERATIONS',
        title: 'The week the paperwork ate',
        body: 'Offers typed from scratch. Leases chased for signatures. Rent reminders sent by hand, when someone remembers. Every one of those hours comes straight out of selling time.',
      },
    ],
    kicker:
      'Hiring one more person fixes none of this. People sleep, forget, and resign. So we built systems that do not, and we run them for you.',
  },

  services: {
    eyebrow: 'WHAT WE BUILD AND RUN',
    title: 'Nine systems.',
    titleAccent: 'One quiet machine.',
    subhead:
      'Start with the system that hurts most and add the rest when you are ready. We build each one, run it, watch it around the clock, and tune it on your real conversations. Everything reports into one CRM your team already knows how to drive.',
    footnote:
      'Not sure where to start? The workflow audit at the end of this list is free, and it tells you.',
    detailCta: 'Talk to us about this system',
    items: [
      {
        id: 'whatsapp-sales-agent',
        num: '01',
        name: 'WhatsApp Sales Agent',
        tag: 'Sales, around the clock',
        badge: 'FLAGSHIP',
        title: 'The agent who never sleeps on a lead.',
        body: 'Ama answers every WhatsApp inquiry in seconds, in a warm Ghanaian voice. She qualifies budget, area, and bedrooms, recommends the right homes, books the viewing, and follows up on Day 3, 7, 14, and 30. Your team wakes up to briefed leads, not cold names.',
        deliverables: [
          'Replies in under 5 seconds, any hour, in English, Twi, or pidgin',
          "Books viewings straight from your agents' availability",
          'Escalates VIPs and tricky questions to a human instantly',
        ],
        media: {
          kind: 'video',
          src: '',
          alt: 'Ama working a live WhatsApp lead',
          label: 'Ama working a live lead, in real time',
        },
      },
      {
        id: 'property-recommendations',
        num: '02',
        name: 'AI Property Recommendations',
        tag: 'Matching that respects the budget',
        title: 'The right home finds the right buyer.',
        body: 'Every lead is matched against your live inventory, in budget and in area, never a cedi over. Add a listing today and every waiting buyer it fits hears about it within minutes, with a message written for them, not a blast.',
        deliverables: [
          'New-listing alerts to every matched lead, exactly once',
          'Learns preferences from the conversation, not a form',
          'Never offers over budget or outside the area',
        ],
        media: {
          kind: 'image',
          src: '',
          alt: 'A matched listing alert arriving on WhatsApp',
          label: 'A new listing meeting its waiting buyers',
        },
      },
      {
        id: '3d-walkthroughs',
        num: '03',
        name: '3D Property Walkthroughs',
        tag: 'Immersive tours, shared by link',
        title: 'Buyers shortlist from their sofa.',
        body: 'A full 3D walkthrough of each listing, shared as a simple link on WhatsApp. Serious buyers arrive already sold on the layout, and the tyre-kickers filter themselves out before anyone drives across Accra.',
        deliverables: [
          'Full 3D capture, delivered as a WhatsApp-ready link',
          'Works on any phone, no app to install',
          'Fewer wasted viewings, faster decisions',
        ],
        media: {
          kind: 'video',
          src: '',
          alt: 'A 3D walkthrough of an East Legon home',
          label: 'Walking a listing without leaving the chat',
        },
      },
      {
        id: 'lead-harvesting',
        num: '04',
        name: 'Lead Harvesting',
        tag: 'Every channel, one pipeline',
        title: 'No inquiry left sitting in a tab.',
        body: 'Meta ads, marketplace listings, portals, your website, a DM on Instagram. Wherever a lead lands, it is captured, deduplicated, and dropped into one pipeline with the first touch already sent.',
        deliverables: [
          'Every source funnels into one CRM record',
          'First reply goes out in seconds, not days',
          'Duplicates merged, sources tracked',
        ],
        media: {
          kind: 'image',
          src: '',
          alt: 'Leads from many channels landing in one pipeline',
          label: 'Five channels, one pipeline',
        },
      },
      {
        id: 'social-autopilot',
        num: '05',
        name: 'Social Media Autopilot',
        tag: 'Always visible, never manual',
        title: 'Your listings post themselves.',
        body: 'Each new listing becomes a run of posts and reels, on schedule, across your pages. The agency stays visible every single day without anyone giving up their Sunday night to do it.',
        deliverables: [
          'Listing-to-post pipeline, photos to captions',
          'A steady cadence across your platforms',
          'One monthly report instead of five dashboards',
        ],
        media: {
          kind: 'video',
          src: '',
          alt: 'A listing becoming a social media reel',
          label: 'One listing, a week of content',
        },
      },
      {
        id: 'review-harvesting',
        num: '06',
        name: 'Customer Review Harvesting',
        tag: 'Reputation that compounds',
        title: 'Five stars, asked for at the right moment.',
        body: 'The ask goes out when the client is happiest, right after the keys change hands. Glowing clients get walked to Google. Unhappy ones get walked to you first, quietly, before anything goes public.',
        deliverables: [
          'Automatic review requests after closed deals',
          'Happy clients routed straight to Google Reviews',
          'Complaints intercepted privately first',
        ],
        media: {
          kind: 'image',
          src: '',
          alt: 'A five-star Google review arriving after a closed deal',
          label: 'The ask, timed to the handover',
        },
      },
      {
        id: 'document-automation',
        num: '07',
        name: 'Document & Contract Automation',
        tag: 'Zero retyping, e-signed',
        title: 'Offers out in minutes, not days.',
        body: 'Offers, leases, and mandates drafted straight from CRM data, sent for e-signature, chased automatically, and filed against the deal. Nobody retypes a client name into a Word template again.',
        deliverables: [
          'Templates filled from the CRM, no retyping',
          'E-signature on any phone',
          'Signed copies filed to the deal automatically',
        ],
        media: {
          kind: 'image',
          src: '',
          alt: 'A lease being e-signed on a phone',
          label: 'A lease signed on a phone, filed on its own',
        },
      },
      {
        id: 'property-management',
        num: '08',
        name: 'Property Management Automation',
        tag: 'The long tail, handled',
        title: 'Rent day runs itself.',
        body: 'Rent reminders, renewal notices, and maintenance requests handled on WhatsApp, on schedule. Owners get their statements without asking. Your property managers stop being human alarm clocks.',
        deliverables: [
          'Rent and renewal reminders that never slip',
          'Maintenance intake on WhatsApp, routed to the right person',
          'Owner statements delivered on schedule',
        ],
        media: {
          kind: 'image',
          src: '',
          alt: 'Rent reminders and maintenance requests handled on WhatsApp',
          label: 'The first of the month, fully automated',
        },
      },
      {
        id: 'workflow-audit',
        num: '09',
        name: 'Business Workflow Audit',
        tag: 'Free, and yours to keep',
        badge: 'FREE · START HERE',
        title: 'We find the leaks. You keep the map.',
        body: 'We sit with your team and walk through how a lead, a listing, and a lease actually move through your agency. You get a written map of the bottlenecks and a prioritised automation plan. Work with us on it, or take the plan and run. It is yours either way.',
        deliverables: [
          'A working session with your team, on your real process',
          'A written bottleneck report you keep',
          'A prioritised automation plan, no strings attached',
        ],
        media: {
          kind: 'image',
          src: '',
          alt: 'A workflow audit session with an agency team',
          label: 'The map your agency runs on',
        },
      },
    ],
  } as {
    eyebrow: string
    title: string
    titleAccent: string
    subhead: string
    footnote: string
    detailCta: string
    items: readonly Service[]
  },

  whatsappSim: {
    eyebrow: 'THE FLAGSHIP, WORKING',
    title: 'Watch Ama close a lead that came in at',
    titleAccent: '11:47pm.',
    subhead:
      'A real conversation flow on real WhatsApp. The only thing simulated is the timing. Ama replies in under five seconds, waits while the lead is still typing, and answers voice notes too.',
    caption: 'Real WhatsApp. Real AI. Real conversation.',
  },

  howItWorks: {
    eyebrow: 'HOW IT WORKS',
    title: 'WhatsApp lead in. Booked viewing out.',
    titleAccent: 'Nothing for you to install.',
    subhead:
      'Fully managed for you, or run it on your own servers. Either way it just works, connected to the tools you already use. No setup on your end.',
    diagramCaption: 'Everything connected. Nothing for you to configure.',
    steps: [
      {
        title: 'A lead messages your WhatsApp.',
        body: 'Ama greets them in their own register, formal, casual, or pidgin, and works out budget, location, and bedrooms. Within seconds they are in your CRM with everything they told her, ready for your team.',
      },
      {
        title: 'Ama qualifies, recommends, and books.',
        body: 'She matches them to listings in your CRM that fit their budget and areas, never over-budget. Add a new property and she knows within minutes. She offers three viewing slots, the lead picks one, the viewing is booked, and follow-ups pause.',
      },
      {
        title: 'Your agent gets a briefed lead, not a cold name.',
        body: 'Ama follows up at Day 3, 7, 14, and 30 if the lead goes quiet, sends viewing reminders a day and two hours before, and after the deal closes she asks for a Google review. Your agent just shows up and closes.',
      },
    ],
  },

  crmSpotlight: {
    eyebrow: 'THE UNFAIR ADVANTAGE',
    title: 'Your agents already know how to use it.',
    titleAccent: "It's WhatsApp.",
    body: 'The classic CRM dies because agents will not fill in forms. Agentic Realty kills that two ways. Ama fills the CRM from WhatsApp automatically, and your agents update it from the field by texting or voice-noting a bot. No new app. No training week.',
    points: [
      'Text "add a 3-bed in East Legon, 850k for sale, owner Mr Asante" and it is in your CRM.',
      'Send a voice note from the car. It is transcribed and done.',
      'Ask "how many leads in Cantonments this month?" and get a real answer.',
      'Read, create, update. Nothing can be deleted by chat, by design.',
    ],
  },

  featureEscalation: {
    label: 'AGENT COCKPIT',
    title: 'A human steps in the moment it matters.',
    body: 'Angry lead, tricky question, suspected VIP. Every escalation shows up in your inbox before WhatsApp even pings your phone. And if your team goes quiet on one, the system keeps nudging until someone picks it up. No lead falls through the cracks overnight.',
    subcaption: '3 escalations today · last 2 minutes ago',
  },

  featureViewings: {
    label: 'OPS BOARD',
    title: 'Your week, booked while you slept.',
    body: "Slots offered automatically from your agents' availability. The lead gets a reminder a day before and again two hours before. Your agent gets a final ping two hours before too, so nobody no-shows because someone forgot.",
    subcaption: '4 viewings today · all reminders firing',
  },

  featureSystemHealth: {
    label: 'ALWAYS ON',
    title: 'Running 24/7, watched 24/7.',
    body: 'Lead replies, follow-ups, property matching, reminders, reviews. Every behind-the-scenes job is checked every minute. If something stalls, you know first, not the lead. No 11pm calls about a thing that quietly broke last Tuesday.',
    subcaption: 'All systems running · 0 issues today',
  },

  featureTelegram: {
    label: 'FROM THE FIELD',
    title: 'Update your CRM by text. The killer feature.',
    body: 'Agents add a new listing, log a note, or check on a lead from their phone. Plain English, text or voice note, no laptop, no app to learn. Ama handles the leads on WhatsApp. Her twin on Telegram handles your team.',
    subcaption: 'Add a listing. Log a note. Find a lead. Without ever opening the CRM.',
  },

  areas: {
    eyebrow: 'KNOWS YOUR PATCH',
    title: 'Ama knows Accra',
    titleAccent: 'street by street.',
    subhead:
      'She speaks GHS, matches on the neighbourhoods your clients actually want, and never offers a unit outside their budget or their area.',
    items: [
      { name: 'East Legon', tag: 'Family homes, new builds', img: '/img/area-east-legon.jpg' },
      { name: 'Cantonments', tag: 'Premium, diplomatic', img: '/img/area-cantonments.jpg' },
      { name: 'Airport Residential', tag: 'Executive, gated', img: '/img/area-airport.jpg' },
      { name: 'Labone', tag: 'Modern apartments', img: '/img/area-labone.jpg' },
    ],
    footnote: 'And Dzorwulu, Tema, Adenta, and wherever your listings are.',
  },

  band: {
    quote: 'Every listing deserves a team that never sleeps.',
    sub: 'Ama works every inquiry the moment it lands, on the right home, in budget, in the area. The walkthroughs, posts, and paperwork run themselves behind her. So the deal closes with you, not the agency down the road.',
    cta: 'See it in action',
    img: '/img/band-home.jpg',
  },

  roi: {
    eyebrow: 'DO THE MATH',
    title: 'How much are after-hours leads costing you right now?',
    subhead:
      'Move the sliders to your numbers. This is an illustrative estimate based on industry response-time benchmarks, not a quote.',
    inputs: {
      leads: { label: 'WhatsApp leads a month', min: 20, max: 400, step: 10, default: 80 },
      afterHours: { label: 'Share that arrive after hours', min: 10, max: 80, step: 5, default: 45, suffix: '%' },
      commission: { label: 'Average commission (GHS)', min: 1500, max: 30000, step: 500, default: 6000 },
    },
    note: 'Assumes a conservative share of after-hours leads are lost to a slow reply, and that an instant first response recovers most of them. Your real numbers are confirmed on your demo.',
  },

  comparison: {
    eyebrow: 'THE REAL COMPARISON',
    title: "It isn't us versus another vendor.",
    subhead: "It's Ama versus hiring another agent versus losing the leads.",
    columns: ['Ama by Agentic Realty', 'Hire another agent', 'Do nothing'],
    highlightCol: 0,
    rows: [
      { label: 'What it costs', values: ['Less than one junior hire', 'GHS 3,000+ salary', 'GHS 0, and lost deals'] },
      { label: 'Hours covered', values: ['24/7, every day', 'Roughly 9 to 5', 'Whenever someone is free'] },
      { label: 'Reply time', values: ['Under 5 seconds', 'Minutes to hours', 'Often never'] },
      { label: 'Leads dropped overnight', values: ['None', 'Most after-hours leads', 'Most after-hours leads'] },
      { label: 'Time to onboard', values: ['5 working days', '4 weeks to train', 'n/a'] },
      { label: 'Quits in 6 months', values: ['Never', 'Often', 'n/a'] },
      { label: 'Keeps your CRM current', values: ['Automatically', 'If they remember', 'No'] },
    ],
  },

  proof: {
    eyebrow: 'PROOF, NOT PROMISES',
    title: 'We grade Ama like an employee.',
    titleAccent: 'Then we let you re-run it.',
    body: 'Most AI vendors ask you to trust a polished demo. We hand you the report card. Ama is scored on truth, rapport, tone, escalation, knowledge, and state on every change. We ran a hostile buyer at her on camera, prompt injection, an overpromise trap, a fabrication bait, then audited the database under the chat. We will pull the raw records in front of you.',
    stats: [
      { value: '31/31', label: 'graded tests passed' },
      { value: '0', label: 'fabrications in the audit' },
      { value: '6', label: 'Meta-approved templates' },
      { value: '< 5s', label: 'median reply, any hour' },
    ],
  },

  timeline: {
    eyebrow: 'TIME TO VALUE',
    title: "From 'yes' to your first live lead in 5 working days.",
    subhead:
      'That is the flagship WhatsApp agent. We do the work; your total time involved is about four hours. The other systems are scoped in your audit and added at your pace.',
    days: [
      { day: 'Day 1', title: 'Kickoff', body: 'We agree your agency name, agent persona, and speciality areas, and connect your WhatsApp number. About one hour of your time.' },
      { day: 'Day 2 to 3', title: 'We build', body: 'We provision your dedicated WhatsApp number, load your listings into the CRM, and tune Ama to your voice. Zero hours of your time.' },
      { day: 'Day 4', title: 'Team training', body: 'A one-hour session for your team: adding properties, managing leads, the agent-context field, and the VIP switch.' },
      { day: 'Day 5', title: 'Go live', body: 'Your first live lead, handled. Point your bios, cards, and ads at the new number and you are running.' },
    ],
  },

  riskReversal: {
    eyebrow: 'YOUR RISK, REMOVED',
    title: 'If it does not earn its keep, you walk. With your data.',
    items: [
      { title: 'No lock-in', body: 'Cancel any month with 14 days notice. No penalties, no drama.' },
      { title: 'Your data, always', body: 'Full export anytime in standard formats. We never sell, mine, or share it.' },
      { title: 'Refundable pilot', body: 'Start with a two-week proof run on your own real leads. If you do not see it, you get your money back.' },
      { title: 'Run it yourself', body: 'The CRM is open source. If we vanished tomorrow, you could self-host everything. You are never trapped.' },
    ],
  },

  stats: {
    eyebrow: 'BY THE NUMBERS',
    items: [
      {
        value: 14,
        display: '14',
        label:
          'safety rules Ama follows. She never invents specs, never pushes after no, never gets the name wrong.',
      },
      {
        value: 5,
        display: '5',
        label:
          "follow-up message types ready to go. Ama reaches out at Day 3, 7, 14, 30, and after viewings, fully within WhatsApp's rules.",
      },
      {
        value: 15,
        display: '15',
        label: 'live automations running 24/7 for your agency. Always on, even at 11pm.',
      },
      {
        value: null,
        display: '< 5s',
        label: 'typical reply time, day or night.',
      },
    ],
    footnote: 'Numbers from the live production system, 2026.',
  },

  faq: {
    eyebrow: 'QUESTIONS',
    title: 'Things agency owners usually ask first.',
    items: [
      {
        q: 'Does Ama replace my agents?',
        a: 'No. She handles the first 80% so they close the last 20%. Your agents stop chasing first-touch messages at 11pm and start closing actual deals. Ama escalates anything she cannot handle.',
      },
      {
        q: 'Do we have to take all nine systems?',
        a: 'No. Most agencies start with the WhatsApp sales agent or the free workflow audit and add systems as they pay for themselves. Each one stands on its own, and they compound as you add them, because everything reports into the same CRM.',
      },
      {
        q: 'Will my clients know they are chatting with AI?',
        a: 'Ama sounds like a real member of your team, warm and human, never robotic. Whether and how you disclose that she is AI is your call. We set that policy with you during onboarding to match your brand and local norms.',
      },
      {
        q: 'What happens when the AI makes a mistake?',
        a: 'Four safety nets. One, fourteen rules Ama follows: she will not quote a price the lead never mentioned, will not invent property features, will not push after someone says no. Two, instant escalation: any complaint or tricky question lands in your inbox immediately. Three, per-lead silence: flag a VIP as agent-only and Ama goes quiet on that thread. Four, name verification before any booking. On top of that, we grade her on a 31-point exam on every change, and you can re-run it.',
      },
      {
        q: 'Will my agents actually use it?',
        a: 'Yes, because there is nothing to learn. They already live in WhatsApp and Telegram all day. Updating the CRM becomes a text or a voice note, which is finally easier than ignoring it.',
      },
      {
        q: 'Where does my data live?',
        a: 'On dedicated infrastructure, or your own servers if you prefer. Your data stays yours. We never sell, mine, or share it, and you can export everything anytime in standard formats. We follow DPA-aligned data hygiene and self-hosting.',
      },
      {
        q: 'How fast can we go live?',
        a: 'Five working days from yes to your first live lead on the flagship WhatsApp agent. Your total time involved is about four hours. The other systems are scoped in your audit and rolled out at your pace.',
      },
      {
        q: 'What does it cost, and is there a contract?',
        a: 'It depends on which systems you switch on, so we scope it on your demo call rather than publish a one-size-fits-nobody number. What is fixed: no per-seat fees, no lock-in, cancel any month with 14 days notice and keep all your data. The workflow audit is free either way.',
      },
      {
        q: 'Does Ama understand voice notes?',
        a: 'Yes. Leads who prefer to talk can send a WhatsApp voice note. Ama transcribes it and replies normally. Your team can send voice notes to the Telegram bot too.',
      },
    ],
  },

  finalCta: {
    eyebrow: 'THE FIRST STEP IS FREE',
    title: 'Start with the audit.',
    titleAccent: 'Keep the map either way.',
    subhead:
      'A working session with your team. We trace how a lead, a listing, and a lease actually move through your agency, then hand you a written plan of what to automate first. If we never speak again, you still leave with the map.',
    primaryCta: 'Book the free workflow audit',
    secondaryCta: 'WhatsApp us',
    note: 'Prefer to see it working first? Ask for the 15-minute demo and watch Ama close a live lead.',
  },

  founder: {
    eyebrow: 'WHY US',
    title: 'Built for Accra, not New York.',
    body: 'We built Agentic Realty because we watched good agencies lose real money to slow replies and dead CRMs. Currency is GHS. Locations are East Legon, Labadi, Cantonments, Tema. Ama flows between English, Twi, and pidgin the way your clients actually talk. You are not the experiment: every conversation flow has been stress-tested end to end, from price negotiations to angry leads, without breaking character once.',
    signature: 'Made in Accra.',
  },

  footer: {
    wordmark: 'Agentic Realty',
    tagline: 'The AI automation studio for real estate, built in Accra.',
    about:
      'Agentic Realty is Ghana’s first PropTech company running AI agents for real estate, and as of 2026 the only one. We design, build, and operate nine automation systems for agencies in Accra and across Greater Accra: East Legon, Cantonments, Airport Residential, Labone, Dzorwulu, Tema, and Adenta. Everything we run is measured in production and reports into one CRM.',
    columns: [
      {
        heading: 'Product',
        items: [
          { label: 'The nine systems', href: '#services' },
          { label: 'How it works', href: '#how-it-works' },
          { label: 'Proof', href: '#proof' },
          { label: 'FAQ', href: '#faq' },
        ],
      },
      {
        heading: 'Company',
        items: [
          { label: 'Why us', href: '#why-us' },
          { label: 'Free workflow audit', href: '#demo' },
          { label: 'WhatsApp us', href: '#demo' },
          { label: 'Made in Accra', href: '#why-us' },
        ],
      },
      {
        heading: 'Legal',
        items: [
          { label: 'Privacy', href: '#' },
          { label: 'Terms', href: '#' },
          { label: 'Data processing', href: '#' },
        ],
      },
    ],
    copyright: '© 2026 Agentic Realty · Accra, Ghana',
    socials: ['X', 'LinkedIn', 'Email'],
  },
} as const
