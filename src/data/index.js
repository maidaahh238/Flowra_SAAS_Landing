export const features = [
  {
    icon: '✦',
    title: 'Smart Workflows',
    desc: 'Automate repetitive tasks with drag-and-drop workflow builders. Set triggers, conditions, and actions in minutes.',
    color: 'plum',
  },
  {
    icon: '◈',
    title: 'Real-time Analytics',
    desc: 'Track team performance and project health with live dashboards. Spot bottlenecks before they slow you down.',
    color: 'beige',
  },
  {
    icon: '⬡',
    title: 'Seamless Collaboration',
    desc: 'Comment, assign, and mention teammates anywhere. All your communication lives where the work happens.',
    color: 'plum',
  },
  {
    icon: '◎',
    title: 'Goal Tracking',
    desc: 'Set OKRs and milestones, then watch progress update automatically as tasks are completed.',
    color: 'beige',
  },
  {
    icon: '⊕',
    title: '500+ Integrations',
    desc: 'Connect Slack, GitHub, Figma, Google Drive and hundreds more without writing a single line of code.',
    color: 'plum',
  },
  {
    icon: '⊛',
    title: 'Enterprise Security',
    desc: 'SOC 2 Type II certified. SSO, 2FA, custom data retention, and audit logs keep your data safe.',
    color: 'beige',
  },
]

export const testimonials = [
  {
    name: 'Zara Malik',
    role: 'Head of Product, NayaPay',
    avatar: 'ZM',
    quote: 'Flowra cut our sprint planning time by 60%. The workflow automation alone paid for an entire year of the Pro plan in the first month.',
    rating: 5,
  },
  {
    name: 'Usman Tariq',
    role: 'Engineering Lead, Systems Limited',
    avatar: 'UT',
    quote: "We tried seven tools before Flowra. Nothing else gave us real-time visibility into cross-team dependencies. It's become the single source of truth.",
    rating: 5,
  },
  {
    name: 'Ayesha Siddiqui',
    role: 'COO, Arbisoft',
    avatar: 'AS',
    quote: 'The analytics dashboard alone is worth every penny. My weekly reports now take 10 minutes instead of 3 hours.',
    rating: 5,
  },
  {
    name: 'Hamza Raza',
    role: 'Founder, Airlift Tech',
    avatar: 'HR',
    quote: "As a small team, we needed something that wouldn't get in the way. Flowra is powerful when you need it, invisible when you don't.",
    rating: 5,
  },
]

export const plans = [
  {
    name: 'Starter',
    price: 0,
    desc: 'Perfect for freelancers and solo creators',
    features: ['Up to 3 projects', '5 team members', 'Basic analytics', '2GB storage', 'Email support'],
    cta: 'Start for free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 29,
    desc: 'For growing teams who need more power',
    features: ['Unlimited projects', '25 team members', 'Advanced analytics', '50GB storage', 'Priority support', 'Workflow automation', 'Custom fields'],
    cta: 'Start free trial',
    highlight: true,
    badge: 'Most popular',
  },
  {
    name: 'Enterprise',
    price: 99,
    desc: 'For organizations that demand the best',
    features: ['Unlimited everything', 'Unlimited members', 'Custom analytics', '500GB storage', 'Dedicated support', 'Advanced security', 'SLA guarantee', 'Custom integrations'],
    cta: 'Talk to sales',
    highlight: false,
  },
]

export const faqs = [
  {
    q: 'Is there a free trial for paid plans?',
    a: 'Yes — every paid plan comes with a 14-day free trial, no credit card required. You can upgrade, downgrade, or cancel at any time.',
  },
  {
    q: 'How many people can I invite to my workspace?',
    a: 'Starter supports up to 5 members, Pro supports up to 25, and Enterprise is unlimited. You can always upgrade if your team grows.',
  },
  {
    q: 'Can I import data from other project management tools?',
    a: 'Absolutely. Flowra supports one-click import from Asana, Trello, Jira, Monday.com, Notion, and CSV. Your data, your way.',
  },
  {
    q: 'Is my data secure?',
    a: 'Flowra is SOC 2 Type II certified, encrypted at rest and in transit, and hosted on AWS with 99.9% uptime SLA. Enterprise plans include custom data residency.',
  },
  {
    q: 'Do you offer discounts for non-profits or startups?',
    a: 'Yes — we offer 50% off for registered non-profits and early-stage startups (under 2 years old, under $1M ARR). Contact our team to apply.',
  },
  {
    q: 'What integrations does Flowra support?',
    a: 'Over 500 integrations including Slack, GitHub, GitLab, Figma, Google Workspace, Microsoft 365, Zoom, Salesforce, HubSpot, and more.',
  },
]

export const recentActivity = [
  { user: 'Zara Malik', action: 'completed task', target: 'Q3 roadmap review', time: '2 min ago', type: 'complete' },
  { user: 'Usman Tariq', action: 'commented on', target: 'API migration sprint', time: '15 min ago', type: 'comment' },
  { user: 'Ayesha Siddiqui', action: 'created project', target: 'Brand refresh 2026', time: '1 hr ago', type: 'create' },
  { user: 'Hamza Raza', action: 'assigned task to', target: 'Dev team', time: '2 hr ago', type: 'assign' },
  { user: 'You', action: 'uploaded file to', target: 'Design assets', time: '3 hr ago', type: 'upload' },
  { user: 'Zara Malik', action: 'closed milestone', target: 'Beta launch v2.0', time: '5 hr ago', type: 'milestone' },
]

export const analyticsData = [
  { month: 'Jan', users: 1200, revenue: 4800, tasks: 340 },
  { month: 'Feb', users: 1800, revenue: 6200, tasks: 520 },
  { month: 'Mar', users: 2400, revenue: 8100, tasks: 680 },
  { month: 'Apr', users: 2100, revenue: 7400, tasks: 590 },
  { month: 'May', users: 3200, revenue: 11200, tasks: 810 },
  { month: 'Jun', users: 4100, revenue: 14500, tasks: 1020 },
]

export const taskDistribution = [
  { name: 'Completed', value: 62, color: '#7040aa' },
  { name: 'In Progress', value: 23, color: '#c8923a' },
  { name: 'Pending', value: 10, color: '#d0bee9' },
  { name: 'Overdue', value: 5, color: '#e8c47f' },
]
