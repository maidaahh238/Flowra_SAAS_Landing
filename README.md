<div align="center">

<img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Recharts-2-FF6384?style=flat-square" />
<img src="https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square" />

# Flowra — SaaS Product Landing Page & Customer Onboarding Portal

*A modern, fully responsive SaaS platform frontend — built with React, Vite, and Tailwind CSS.*

</div>

---

## Overview

**Flowra** is a fictional SaaS project management platform designed and built as part of the Teyzix Core Frontend Internship. The project demonstrates real-world frontend skills including component architecture, state management, routing, authentication flow, data visualization, and responsive design — all without any backend.

The platform includes a marketing landing page, a multi-step customer onboarding portal, and a fully interactive analytics dashboard — complete with working auth (sign up, sign in, forgot password, reset password) powered by localStorage.

---

## Live Pages

| Route | Page | Description |
|---|---|---|
| `/` | Landing Page | Hero, product overview, features, testimonials, pricing, FAQ, contact, footer |
| `/onboarding` | Sign Up / Onboarding | 3-step wizard with validation, role/team selection, preferences |
| `/signin` | Sign In | Email + password auth with error handling |
| `/forgot-password` | Forgot Password | Email lookup for password reset |
| `/reset-password` | Reset Password | New password with strength meter and match validation |
| `/dashboard` | Dashboard | Protected route — analytics, projects, team, settings |

---

## Features

### Landing Page
- Animated hero section with floating mock dashboard card
- 4-step product overview with live Kanban board visual
- 6-card features grid with hover accent animations
- Testimonials with star ratings and company logo strip
- Pricing section with **working monthly/annual toggle** (20% discount applied live)
- FAQ accordion — expand/collapse with smooth transitions
- Contact form with **full validation** and success confirmation
- Professional footer with navigation and status indicator

### Authentication System
- **Sign up** — 3-step onboarding wizard (account info → workspace → preferences)
- **Sign in** — with email/password validation and error messages
- **Forgot password** — email lookup flow
- **Reset password** — new password with 4-level strength meter, live match indicator
- **Protected routes** — dashboard requires auth; signed-in users redirected from sign-in/onboarding
- **Persistent sessions** — all auth state saved to localStorage
- **Sign out** — clears session, redirects to home

### Dashboard (5 panels)
- **Overview** — 4 stat cards, area chart (users/revenue/tasks toggle), donut chart, bar chart, live activity search
- **Projects** — 6 project cards, filter by status (In Progress / Planning / Completed / On Hold), progress bars, member avatars
- **Team** — 6 member cards with online status, role, email, active tasks, searchable
- **Analytics** — KPI cards, dual-metric area chart, conversion rate bar chart, tasks bar chart
- **Settings** — Profile form (saves to session + localStorage), notification toggles (persisted), **working dark/light/system theme switcher**, security links

### UI/UX
- **Dark mode** — real `class`-based Tailwind dark mode, applies instantly to entire app, persists across sessions
- **Mobile-first responsive** — tested at 375px, 768px, 1024px, 1440px
- **Smooth animations** — fade-up on load, floating hero card, hover lift on all cards
- Custom beige/plum color palette with Playfair Display + DM Sans typography
- Accessible focus states, semantic HTML, `aria-expanded` on accordions

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 (custom design tokens) |
| Routing | React Router DOM v6 |
| Charts | Recharts 2 |
| Icons | Lucide React |
| Auth | Custom hook + localStorage (no backend) |
| Fonts | Playfair Display · DM Sans · DM Mono |

---

## Project Structure

```
saas-landing/
├── public/
│   └── favicon.svg              # Custom plum F icon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Responsive navbar, auth-aware, cross-page scroll
│   │   ├── Button.jsx           # 5 variants (primary, secondary, outline, ghost, gold)
│   │   ├── Badge.jsx            # Color badge component
│   │   ├── SectionWrapper.jsx   # Consistent section padding + max-width
│   │   └── SectionHeading.jsx   # Eyebrow + title + subtitle block
│   ├── hooks/
│   │   ├── useAuth.jsx          # Auth context (signUp, signIn, signOut, updateProfile, resetPassword)
│   │   └── useTheme.jsx         # Theme context (light/dark/system, applies to <html>)
│   ├── data/
│   │   └── index.js             # All mock data (features, testimonials, plans, analytics, activity)
│   ├── pages/
│   │   ├── Landing.jsx          # Landing page shell
│   │   ├── Onboarding.jsx       # 3-step sign up wizard
│   │   ├── SignIn.jsx           # Sign in form
│   │   ├── ForgotPassword.jsx   # Email entry for password reset
│   │   ├── ResetPassword.jsx    # New password + strength meter
│   │   └── Dashboard.jsx        # Full dashboard with 5 nav panels
│   ├── sections/
│   │   ├── Hero.jsx             # Animated hero with mock dashboard
│   │   ├── ProductOverview.jsx  # How it works + Kanban mock
│   │   ├── Features.jsx         # 6-card features grid
│   │   ├── Testimonials.jsx     # Reviews + logo strip
│   │   ├── Pricing.jsx          # 3-tier pricing with toggle
│   │   ├── FAQ.jsx              # Accordion FAQ
│   │   ├── Contact.jsx          # Validated contact form
│   │   └── Footer.jsx           # Full footer
│   ├── App.jsx                  # Route definitions with auth guards
│   ├── main.jsx                 # Entry — ThemeProvider + AuthProvider
│   └── index.css                # Tailwind + dark mode overrides + animations
├── tailwind.config.js           # Custom palette, darkMode: 'class'
├── vite.config.js
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & run locally

```bash
# 1. Clone the repo
git clone https://github.com/maidaahh238/flowra-saas-landing.git
cd flowra-saas-landing

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## Design System

| Token | Value | Usage |
|---|---|---|
| Plum 600 | `#5a318e` | Primary buttons, active states |
| Plum 900 | `#26103f` | Headings, dark text |
| Beige 400 | `#dcaa52` | Gold accent, highlights |
| Cream | `#fdf6ec` | Page background |
| Dark bg | `#1a0f2e` | Dark mode background |
| Playfair Display | serif | All headings |
| DM Sans | sans-serif | Body text, buttons |
| DM Mono | monospace | Labels, captions, badges |

---

## Author

**Maidah Javed**
Frontend Web Developer Intern · Teyzix Core

- GitHub: [@maidaahh238](https://github.com/maidaahh238)
- LinkedIn: [maidah-javed-3667833a4](https://linkedin.com/in/maidah-javed-3667833a4)

---

<div align="center">
  <sub>Built with React · Vite · Tailwind CSS · Recharts · Lucide · ♡</sub>
</div>
