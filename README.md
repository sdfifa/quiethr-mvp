# QuietHR - MVP Simulation

> A High-Fidelity, Fully Simulated Recruitment Platform MVP for Investor Demonstrations

QuietHR is a "Quiet Hiring" and Recruitment Marketing platform featuring a dual-sided marketplace: **Recruiters** shop for pre-vetted talent, and **Candidates** showcase their work through a social portfolio system.

🎨 **Design Language**: "Discovered MENA" - Premium, high-contrast, bold aesthetic with black/white/gold color scheme.

🚀 **Status**: Demo Mode - All functionality runs on client-side mock data with simulated interactions.

---

## ✨ Features

### For Recruiters ("The Shopper")
- **Talent Shop**: Browse an e-commerce-style grid of candidate profiles
- **Unlock System**: Pay to reveal candidate contact information (simulated)
- **Live Event Monitor**: Watch live coding events with AI-powered sentiment analysis
- **Analytics Dashboard**: Track unlocked profiles, wallet balance, and hiring metrics

### For Candidates ("The Creator")
- **Creator Studio**: Animated market value dial showing your score
- **Portfolio Upload**: Drag-and-drop project uploads with simulated AI analysis
- **The Gauntlet**: Pre-screening assessments that gate access to paid events
- **Wallet & Tickets**: Manage your event tickets and earnings

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Shadcn UI
- **State Management**: Zustand (for mock data simulation)
- **Animations**: Framer Motion
- **Icons**: Lucide React + Material Symbols
- **Database**: PostgreSQL + Prisma ORM *(for future production mode)*
- **Auth**: NextAuth.js v5 *(for future production mode)*
- **Payments**: Stripe Connect *(for future production mode)*

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sdfifa/quiethr-mvp.git
   cd quiethr-mvp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** *(Optional for MVP simulation)*
   ```bash
   cp env.example .env
   ```
   > **Note**: The MVP runs entirely on mock data. Environment variables are only needed if you plan to connect real services in the future.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
quiethr-mvp/
├── src/
│   ├── app/
│   │   ├── (marketing)/          # Landing page
│   │   ├── (candidate)/          # Candidate views
│   │   │   ├── studio/           # Creator Studio
│   │   │   ├── events/           # The Gauntlet
│   │   │   └── dashboard/        # Wallet
│   │   ├── (recruiter)/          # Recruiter views
│   │   │   ├── shop/             # Talent Shop
│   │   │   ├── events/live/      # Live Monitor
│   │   │   └── dashboard/        # Analytics
│   │   └── layout.tsx            # Root layout
│   ├── components/
│   │   ├── layout/               # Navbar, Sidebar
│   │   └── ui/                   # Shadcn UI components
│   ├── lib/
│   │   ├── store/                # Zustand mock store
│   │   ├── actions/              # Server actions (placeholder)
│   │   └── utils.ts              # Utility functions
│   └── hooks/                    # Custom React hooks
├── prisma/
│   └── schema.prisma             # Database schema (for future)
└── public/                       # Static assets
```

---

## 🎮 How to Use the Demo

### As a Recruiter
1. From the landing page, click **"I'm Hiring"**
2. Browse the **Talent Shop** - candidate cards with blurred information
3. Click **"Unlock ($250)"** to reveal candidate details
4. Visit **Live Monitor** to watch simulated event streams
5. Check **Analytics** to see your wallet and metrics

### As a Candidate
1. From the landing page, click **"I'm Building"**
2. Go to **Creator Studio** and upload a project (simulated)
3. Watch your **Market Value Score** increase with animations
4. Visit **The Gauntlet** to attempt a pre-screening quiz
5. After passing, unlock the ability to purchase event tickets

### Switch Roles
- Click the **"Workspace"** card in the sidebar to toggle between Recruiter and Candidate roles
- Or click the **Logout button** at the bottom to return to the landing page

---

## 🎨 Design System

### Colors
- **Background**: `#FFFFFF` (White) / `#F8F9FA` (Surface Gray) / `#0F0F0F` (Deep Black)
- **Foreground**: `#0F0F0F` (Deep Black for text)
- **Accent**: `#FFD700` (Electric Gold) - Used for CTAs, active states, score highlights
- **UI**: High contrast with sharp corners, thick borders, minimalist cards

### Typography
- **Font**: Inter / Plus Jakarta Sans
- **Style**: Large, bold headers with high readability

---

## 🧪 Mock Data System

All data is managed client-side via **Zustand** in `src/lib/store/mock-store.ts`:

- **12 Mock Candidates** with varied scores and AI summaries
- **3 Mock Events** (Live, Upcoming, Past)
- **Simulated Actions**:
  - `simulateUpload()` - Fake 2s delay, increases market score by 10 points
  - `unlockCandidate()` - Deducts $250 from wallet, reveals candidate info
  - `purchaseTicket()` - Deducts $50, grants event access
  - `toggleRole()` - Switches between recruiter and candidate

---

## 🔐 Security Notes

- **Environment Variables**: Never commit real API keys. The `.env` file is gitignored.
- **Demo Mode**: This MVP doesn't connect to real databases or payment systems.
- **Production Readiness**: To go live, you'll need to:
  - Set up a PostgreSQL database
  - Configure NextAuth.js for real authentication
  - Integrate Stripe for payments
  - Connect OpenAI API for real AI analysis

---

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## 🚧 Roadmap (Post-MVP)

- [ ] Connect to real PostgreSQL database
- [ ] Implement NextAuth.js authentication
- [ ] Integrate Stripe Connect for payouts
- [ ] Add real OpenAI sentiment analysis
- [ ] Video upload and streaming
- [ ] Email notifications
- [ ] Admin dashboard

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 👤 Author

**Sajal Dubey** ([@sdfifa](https://github.com/sdfifa))

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/) and [Material Symbols](https://fonts.google.com/icons)
- Animated with [Framer Motion](https://www.framer.com/motion/)

---

**⭐ Star this repo if you find it useful!**

