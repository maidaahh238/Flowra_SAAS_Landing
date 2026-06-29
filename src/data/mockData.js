export const revenueData = [
  { month: 'Jan', revenue: 18400, users: 142 },
  { month: 'Feb', revenue: 22100, users: 178 },
  { month: 'Mar', revenue: 19800, users: 165 },
  { month: 'Apr', revenue: 28600, users: 221 },
  { month: 'May', revenue: 31200, users: 258 },
  { month: 'Jun', revenue: 38700, users: 312 },
  { month: 'Jul', revenue: 42100, users: 347 },
  { month: 'Aug', revenue: 39500, users: 329 },
  { month: 'Sep', revenue: 47800, users: 398 },
  { month: 'Oct', revenue: 52300, users: 441 },
  { month: 'Nov', revenue: 58900, users: 487 },
  { month: 'Dec', revenue: 64200, users: 532 },
]

export const trafficData = [
  { name: 'Organic', value: 42, color: '#7C46A3' },
  { name: 'Direct',  value: 28, color: '#B48FCC' },
  { name: 'Social',  value: 18, color: '#CEAD78' },
  { name: 'Referral',value: 12, color: '#E0C49A' },
]

export const conversionData = [
  { week: 'W1', rate: 3.2 },
  { week: 'W2', rate: 4.1 },
  { week: 'W3', rate: 3.8 },
  { week: 'W4', rate: 5.2 },
  { week: 'W5', rate: 4.7 },
  { week: 'W6', rate: 6.1 },
  { week: 'W7', rate: 5.8 },
  { week: 'W8', rate: 7.3 },
]

export const recentActivity = [
  { id: 1, user: 'Sara Ahmed',     action: 'Upgraded to Pro plan',       time: '2 min ago',  avatar: 'SA', type: 'upgrade' },
  { id: 2, user: 'James Wu',       action: 'Signed up for free trial',   time: '18 min ago', avatar: 'JW', type: 'signup' },
  { id: 3, user: 'Priya Sharma',   action: 'Submitted support ticket',   time: '34 min ago', avatar: 'PS', type: 'support' },
  { id: 4, user: 'Luca Ferrari',   action: 'Cancelled subscription',     time: '1 hr ago',   avatar: 'LF', type: 'cancel' },
  { id: 5, user: 'Emma Dubois',    action: 'Completed onboarding',       time: '2 hr ago',   avatar: 'ED', type: 'complete' },
  { id: 6, user: 'Ali Hassan',     action: 'Added payment method',       time: '3 hr ago',   avatar: 'AH', type: 'payment' },
  { id: 7, user: 'Nina Kovacs',    action: 'Upgraded to Enterprise',     time: '5 hr ago',   avatar: 'NK', type: 'upgrade' },
  { id: 8, user: 'Tom Bradley',    action: 'Signed up for free trial',   time: '6 hr ago',   avatar: 'TB', type: 'signup' },
]

export const testimonials = [
  {
    id: 1,
    name: 'Amara Nwosu',
    role: 'Head of Growth',
    company: 'Stellarx',
    avatar: 'AN',
    rating: 5,
    text: 'Flowra completely changed how our team tracks pipeline. We cut our reporting time by 60% in the first month alone. The interface is genuinely a pleasure to use.',
  },
  {
    id: 2,
    name: 'David Okafor',
    role: 'Co-Founder & CEO',
    company: 'NovaBuild',
    avatar: 'DO',
    rating: 5,
    text: 'I evaluated six SaaS tools before Flowra. Nothing came close in terms of onboarding speed and data clarity. Our investors actually commented on how clean our dashboards look.',
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    role: 'Product Manager',
    company: 'Canopy Labs',
    avatar: 'SL',
    rating: 5,
    text: 'The multi-step onboarding flow got our team from zero to productive in under an hour. I wish more SaaS products were this thoughtfully designed.',
  },
  {
    id: 4,
    name: 'Raj Mehta',
    role: 'Engineering Lead',
    company: 'Drift.io',
    avatar: 'RM',
    rating: 5,
    text: 'Flowra\'s API is clean, the documentation is excellent, and the support team actually responds. Rare combination these days.',
  },
]

export const faqs = [
  {
    q: 'Is there a free trial?',
    a: 'Yes — every plan starts with a 14-day free trial, no credit card required. You get full access to all Pro features during the trial period.',
  },
  {
    q: 'Can I switch plans at any time?',
    a: 'Absolutely. You can upgrade or downgrade your plan at any point. If you upgrade, the difference is prorated immediately. Downgrades take effect at the next billing cycle.',
  },
  {
    q: 'How does the per-seat pricing work?',
    a: 'Each seat is one team member who can log in and use Flowra. You can add or remove seats at any time, and billing adjusts automatically.',
  },
  {
    q: 'Where is my data stored?',
    a: 'All data is stored in ISO 27001-certified data centers in the EU and US. You choose your region at sign-up. We never sell or share your data with third parties.',
  },
  {
    q: 'Do you offer discounts for startups or nonprofits?',
    a: 'Yes — startups under 2 years old with fewer than 10 employees get 50% off for the first year. Nonprofits get 30% off any plan. Reach out to our team to verify eligibility.',
  },
  {
    q: 'What integrations do you support?',
    a: 'Flowra connects natively with Slack, Notion, HubSpot, Salesforce, Google Analytics, Stripe, and 40+ other tools via our integration hub. Full REST API and webhooks are available on Pro and Enterprise.',
  },
]

export const features = [
  {
    icon: '◈',
    title: 'Unified analytics',
    desc: 'All your key metrics in one clean view. No spreadsheet juggling, no tab-hopping.',
    color: 'plum',
  },
  {
    icon: '◎',
    title: 'Smart onboarding',
    desc: 'Guide new users to their first value moment in minutes with adaptive flows.',
    color: 'beige',
  },
  {
    icon: '⬡',
    title: 'Real-time collaboration',
    desc: 'Comment, annotate and share dashboards with your team without leaving Flowra.',
    color: 'lavender',
  },
  {
    icon: '◇',
    title: 'Automated reporting',
    desc: 'Schedule weekly or monthly reports to land in stakeholder inboxes automatically.',
    color: 'plum',
  },
  {
    icon: '⬢',
    title: 'Custom integrations',
    desc: 'Connect your entire stack with 40+ native integrations and a full REST API.',
    color: 'beige',
  },
  {
    icon: '◉',
    title: 'Enterprise security',
    desc: 'SOC2 Type II, GDPR compliant, SSO, and role-based access controls built in.',
    color: 'lavender',
  },
]
