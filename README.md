# AARRKKAA International — Web Application

Welcome to the official web application repository for **AARRKKAA International**, a global supplier and distributor of precision components and engineered seals.

This project was built from the ground up using a modern, high-performance, and scalable technology stack.

---

## 🚀 Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React 19 + Vite + Full-stack SSR)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Radix UI Primitives
- **Animations**: Framer Motion + Canvas Confetti
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: Supabase Auth (JWT based)
- **Email Delivery**: [Resend](https://resend.com/)
- **Form Validation**: React Hook Form + Zod
- **Deployment**: Vercel

---

## ✨ Key Features & Functionality

### 1. Modern Frontend Architecture
- Fully responsive, premium dark/light themed UI using Tailwind CSS v4.
- Highly interactive animations using `framer-motion` (fade-ins, scroll animations, glowing cards).
- Component-driven architecture using accessible Radix UI primitives.
- Client-side routing with `@tanstack/react-router` for lightning-fast page transitions.

### 2. Contact Form & Email Delivery
- The `/contact` page features a secure, Zod-validated inquiry form.
- Upon submission, inquiries are securely stored in the Supabase PostgreSQL database via Prisma ORM.
- **Resend API** integration instantly dispatches a beautifully formatted, responsive HTML email to the sales team (`admin@aarrkkaa.com` or custom routing).
- Includes support for dynamic email templates using the `Inter` web font.

### 3. Newsletter Subscription
- Global footer includes a newsletter sign-up form.
- Submissions are validated and safely stored in the `Subscriber` database table.

### 4. Secure Admin Dashboard
- **Route**: `/admin`
- Protected by **Supabase Authentication**. Only authorized users can log in using their email and password.
- **Command Center**: Once logged in, administrators can view live metrics of Total Inquiries and Newsletter Subscribers.
- **Inquiry Management**: The admin table lists all inquiries with the ability to toggle their status between `Active` (Amber) and `Completed` (Emerald).
- Features optimistic UI updates for instant feedback when toggling statuses.

### 5. Seamless Vercel Deployment
- Optimized for serverless edge/Node.js deployments on Vercel.
- Integrated a `postinstall` script (`prisma generate`) in `package.json` to ensure the Prisma Client is correctly compiled during the Vercel build process.
- Lockfile conflicts resolved by strictly adhering to the `bun.lock` (Bun package manager) for faster, deterministic builds.

---

## 🛠️ Environment Setup

To run this project locally or deploy it to a production environment, the following environment variables are strictly required. 

These should be added to a local `.env` file or injected into your hosting provider (e.g., Vercel / Lovable dashboard):

```env
# -------------------------------------------------------------
# 1. RESEND (Email Delivery)
# -------------------------------------------------------------
# Your API Key from resend.com
RESEND_API_KEY="re_your_api_key_here"

# The destination email address where inquiries should be sent
RESEND_TO_EMAIL="admin@aarrkkaa.com"

# The verified sender domain (or onboarding@resend.dev for testing)
RESEND_FROM_EMAIL="contact@aarrkkaa.com"


# -------------------------------------------------------------
# 2. PRISMA DATABASE CONNECTIONS
# -------------------------------------------------------------
# Connect to Postgres via the shared transaction-mode pooler (IPv4-only)
DATABASE_URL="postgresql://postgres.[YOUR-ID]:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Connect to Postgres via the shared session-mode pooler (used for migrations)
DIRECT_URL="postgresql://postgres.[YOUR-ID]:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"


# -------------------------------------------------------------
# 3. SUPABASE (Authentication & Client)
# -------------------------------------------------------------
# Your Supabase project URL
VITE_SUPABASE_URL="https://[YOUR-ID].supabase.co"

# Your Supabase public anonymous key
VITE_SUPABASE_ANON_KEY="sb_publishable_..."
```

---

## 📦 Local Development Commands

This project uses [Bun](https://bun.sh/) as the primary package manager. 

**1. Install dependencies:**
\`\`\`bash
bun install
\`\`\`

**2. Generate Prisma Client:**
\`\`\`bash
bunx prisma generate
\`\`\`

**3. Push Database Schema (if running a new database):**
\`\`\`bash
bunx prisma db push
\`\`\`

**4. Start Local Development Server:**
\`\`\`bash
bun run dev
\`\`\`

---

## 🗄️ Database Schema

The database utilizes Prisma to define the schema. The primary models are:

- **Inquiry**: Stores `id`, `name`, `email`, `category`, `subject`, `message`, `status` (Active/Completed), and `createdAt`.
- **Subscriber**: Stores `id`, `email`, and `createdAt`.

## 🔒 Security Measures
- **Environment Variables**: Sensitive keys (Database passwords, Resend API keys) are exclusively accessed server-side via `process.env`.
- **TanStack Server Functions**: All database mutations (`getAdminData`, `toggleInquiryStatus`, `sendContactEmail`) are securely executed on the server, completely hidden from the client browser.
- **JWT Authentication**: The Admin dashboard utilizes Supabase SSR strategies to parse and validate JWT tokens server-side before serving sensitive inquiry data.
