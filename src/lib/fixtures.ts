export type ConversationMessage = {
  id: string
  lead_id: string
  direction: 'inbound' | 'outbound'
  message: string
  created_at: string
}

export type Viewing = {
  id: string
  lead_name: string
  property_label: string
  scheduled_datetime: string
  status:
    | 'pending_confirmation'
    | 'confirmed'
    | 'completed'
    | 'cancelled'
    | 'no_show'
  reminder_sent_24h: boolean
  reminder_sent_2h: boolean
}

export type SystemHealthRow = {
  id: string
  label: string
  status: 'healthy' | 'retry' | 'failing'
  last_run: string
  errors_24h: number
  avg_latency_ms: number
}

export type Escalation = {
  lead_name: string
  phone_masked: string
  reason:
    | 'out_of_scope'
    | 'complaint'
    | 'vip_inbound'
    | 'angry'
    | 'name_verify'
  last_message: string
  occurred_at: string
}

export type StatusPill = {
  id: string
  label: string
  detail: string
  accent: 'green' | 'orange' | 'pink' | 'red'
  triggerAt: string
}

export type ArchitectureNode = {
  id: string
  label: string
  sublabel: string
  color: 'green' | 'orange' | 'pink'
  position:
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom-left'
    | 'left'
  dashed?: boolean
}

export type TelegramMessage = {
  id: string
  sender: 'agent' | 'bot'
  message: string
  kind?: 'text' | 'voice' | 'confirmation'
  durationSec?: number
}

export const conversation_script: ConversationMessage[] = [
  {
    id: 'c1',
    lead_id: 'lead-kofi-001',
    direction: 'inbound',
    message: 'hi, saw a 2-bed in East Legon. is it still available?',
    created_at: '2026-05-20T12:42:14Z',
  },
  {
    id: 'c2',
    lead_id: 'lead-kofi-001',
    direction: 'outbound',
    message:
      'Hey Kofi 👋 Yes, the East Legon 2-bed is still available. GHS 4,500/month, furnished, parking for one car. Want me to set up a viewing this week?',
    created_at: '2026-05-20T12:42:21Z',
  },
  {
    id: 'c3',
    lead_id: 'lead-kofi-001',
    direction: 'inbound',
    message: 'how about Saturday morning',
    created_at: '2026-05-20T12:43:02Z',
  },
  {
    id: 'c4',
    lead_id: 'lead-kofi-001',
    direction: 'outbound',
    message: "I've got 9am, 11am, or 1pm Saturday. Which works?",
    created_at: '2026-05-20T12:43:08Z',
  },
  {
    id: 'c5',
    lead_id: 'lead-kofi-001',
    direction: 'inbound',
    message: '11am',
    created_at: '2026-05-20T12:44:11Z',
  },
  {
    id: 'c6',
    lead_id: 'lead-kofi-001',
    direction: 'outbound',
    message:
      "Booked. I'll send a reminder 24h before. Address coming Friday evening.",
    created_at: '2026-05-20T12:44:16Z',
  },
]

export const status_pills: StatusPill[] = [
  {
    id: 'pill-qualified',
    label: 'LEAD QUALIFIED',
    detail: 'Strong match',
    accent: 'green',
    triggerAt: 'c2',
  },
  {
    id: 'pill-viewing',
    label: 'VIEWING SCHEDULED',
    detail: 'Sat 2026-05-23 · 11:00 · East Legon 2BR',
    accent: 'green',
    triggerAt: 'c6',
  },
  {
    id: 'pill-paused',
    label: 'FOLLOW-UPS PAUSED',
    detail: 'Resumes if the viewing falls through',
    accent: 'orange',
    triggerAt: 'c6',
  },
]

export const escalations: Escalation[] = [
  {
    lead_name: 'Akosua A.',
    phone_masked: '23324•••456',
    reason: 'out_of_scope',
    last_message: 'Can I tour the Cantonments duplex tonight?',
    occurred_at: '2026-05-20T13:08:00Z',
  },
  {
    lead_name: 'Yaw M.',
    phone_masked: '23354•••012',
    reason: 'complaint',
    last_message: "The agent didn't show up for the viewing!",
    occurred_at: '2026-05-20T12:56:00Z',
  },
  {
    lead_name: 'Adwoa B.',
    phone_masked: '23320•••789',
    reason: 'vip_inbound',
    last_message: 'Hi, this is Adwoa from XYZ Corp...',
    occurred_at: '2026-05-20T12:32:00Z',
  },
]

export const escalationReasonColor: Record<Escalation['reason'], 'orange' | 'red' | 'pink'> = {
  out_of_scope: 'orange',
  complaint: 'red',
  vip_inbound: 'pink',
  angry: 'red',
  name_verify: 'orange',
}

export const escalationReasonLabel: Record<Escalation['reason'], string> = {
  out_of_scope: 'Out of scope',
  complaint: 'Complaint',
  vip_inbound: 'VIP inbound',
  angry: 'Angry lead',
  name_verify: 'Name check',
}

export const viewings_today: Viewing[] = [
  {
    id: 'v-001',
    lead_name: 'Kofi A.',
    property_label: 'East Legon 2BR',
    scheduled_datetime: '2026-05-20T09:00:00+00:00',
    status: 'confirmed',
    reminder_sent_24h: true,
    reminder_sent_2h: true,
  },
  {
    id: 'v-002',
    lead_name: 'Esi O.',
    property_label: 'Labadi 3BR studio',
    scheduled_datetime: '2026-05-20T11:00:00+00:00',
    status: 'confirmed',
    reminder_sent_24h: true,
    reminder_sent_2h: false,
  },
  {
    id: 'v-003',
    lead_name: 'Nana K.',
    property_label: 'Adenta townhouse',
    scheduled_datetime: '2026-05-20T14:30:00+00:00',
    status: 'pending_confirmation',
    reminder_sent_24h: false,
    reminder_sent_2h: false,
  },
  {
    id: 'v-004',
    lead_name: 'Yaa B.',
    property_label: 'Cantonments penthouse',
    scheduled_datetime: '2026-05-20T17:00:00+00:00',
    status: 'confirmed',
    reminder_sent_24h: true,
    reminder_sent_2h: true,
  },
]

export const week_density = [
  { day: 'Mon', count: 2 },
  { day: 'Tue', count: 3 },
  { day: 'Wed', count: 5 },
  { day: 'Thu', count: 4 },
  { day: 'Fri', count: 6 },
  { day: 'Sat', count: 8 },
  { day: 'Sun', count: 1 },
]

export const system_health: SystemHealthRow[] = [
  {
    id: 'sh-1',
    label: 'Lead replies',
    status: 'healthy',
    last_run: '2026-05-20T13:09:48Z',
    errors_24h: 0,
    avg_latency_ms: 4200,
  },
  {
    id: 'sh-2',
    label: 'Follow-ups',
    status: 'healthy',
    last_run: '2026-05-20T12:58:00Z',
    errors_24h: 0,
    avg_latency_ms: 1800,
  },
  {
    id: 'sh-3',
    label: 'Property matching',
    status: 'retry',
    last_run: '2026-05-20T12:42:00Z',
    errors_24h: 1,
    avg_latency_ms: 2100,
  },
  {
    id: 'sh-4',
    label: 'Review requests',
    status: 'healthy',
    last_run: '2026-05-20T11:10:00Z',
    errors_24h: 0,
    avg_latency_ms: 900,
  },
  {
    id: 'sh-5',
    label: 'Team chat',
    status: 'healthy',
    last_run: '2026-05-20T13:09:48Z',
    errors_24h: 0,
    avg_latency_ms: 3400,
  },
]

export const activity_14d = [
  42, 38, 51, 61, 48, 55, 46, 53, 67, 58, 60, 49, 54, 56,
]

export const architecture_nodes: ArchitectureNode[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    sublabel: 'where leads talk to Ama',
    color: 'green',
    position: 'top-right',
  },
  {
    id: 'crm',
    label: 'Your CRM',
    sublabel: 'every lead, in one place',
    color: 'green',
    position: 'right',
  },
  {
    id: 'ama',
    label: 'Ama',
    sublabel: 'the AI agent on WhatsApp',
    color: 'green',
    position: 'bottom-right',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    sublabel: 'where your team talks to the bot',
    color: 'orange',
    position: 'bottom-left',
  },
  {
    id: 'gcal',
    label: 'Google Calendar',
    sublabel: 'coming soon',
    color: 'pink',
    position: 'left',
    dashed: true,
  },
]

export const telegram_demo: TelegramMessage[] = [
  {
    id: 't1',
    sender: 'agent',
    kind: 'voice',
    durationSec: 7,
    message:
      'New listing. 3-bedroom in Cantonments, 8,500 a month, furnished, available now.',
  },
  {
    id: 't2',
    sender: 'bot',
    kind: 'confirmation',
    message:
      'Added Cantonments 3BR · GHS 8,500/mo · furnished · available. Anything else?',
  },
  {
    id: 't3',
    sender: 'agent',
    kind: 'text',
    message: 'How many hot leads in East Legon under 5,000?',
  },
  {
    id: 't4',
    sender: 'bot',
    kind: 'confirmation',
    message:
      '4 hot leads. Kofi A., Esi O., Nana K., Yaa B. Want me to message them about the new listing?',
  },
]
