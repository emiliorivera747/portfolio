https://github.com/user-attachments/assets/ecb3e8cb-a76f-42fe-8c02-e756e27be9b6

<img width="1512" height="982" alt="Screenshot 2025-10-24 at 8 47 51 PM" src="https://github.com/user-attachments/assets/94915c41-aaa4-41f6-8356-bbf58af816ab" />

# Emilio Rivera — Personal Portfolio

A full-stack personal portfolio and blog platform built with **Next.js 16 App Router**, featuring a rich-text blog CMS, Supabase authentication, AI-powered summarization, a verified comment system, and media management via Cloudinary.

Live site: [emilioulisesrivera.com](https://emilioulisesrivera.com)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [External Services](#external-services)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Scripts](#scripts)

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript 5 |
| Styling | Tailwind CSS 3, Radix UI, Framer Motion |
| Database | PostgreSQL (Supabase), Drizzle ORM |
| Auth | Supabase Auth (OAuth + email) |
| Media | Cloudinary (primary), AWS S3 (fallback) |
| Rich Text | Tiptap 3 (with code blocks, highlights, text-align) |
| AI | Google Gemini API (post summarization) |
| Email | Resend (transactional), EmailJS |
| Data Fetching | TanStack React Query, Apollo Client |
| Analytics | Google Analytics (GTM), Vercel Analytics & Speed Insights |
| Forms | React Hook Form + Zod |
| Icons | Lucide React, React Icons |
| Scheduling | React Calendly |
| Notifications | Sonner, React Toastify |

---

## Features

- **Public portfolio** — Landing page, about, projects, and contact sections
- **Blog platform** — Rich text editor (Tiptap) with image/video embeds, code blocks, and tags
- **Admin dashboard** — Protected CMS for creating, editing, and deleting posts
- **AI summarization** — Gemini-powered one-click post summary generation
- **Comment system** — Email-verified comments with 6-digit code, 10-minute expiry, and masked email display
- **Media management** — Signed Cloudinary uploads with deduplication via file hash
- **Supabase OAuth** — Secure sign-in with session handling via server-side cookies
- **SEO** — Dynamic `robots.txt`, `sitemap.xml`, and per-page metadata
- **Dark mode** — Full theme support via `next-themes`
- **Drag & drop** — `@dnd-kit` for sortable content blocks in the blog composer
- **Performance** — Bundle analysis, dynamic imports, Vercel Speed Insights

---

## Project Structure

```
portfolio/
├── app/                        # Next.js App Router
│   ├── about/                  # About page
│   ├── admin/                  # Protected admin routes
│   │   ├── blog-composer/      # Create new blog post
│   │   ├── blogs/              # Blog list + edit views
│   │   └── dashboard/          # Admin dashboard
│   ├── api/                    # API route handlers
│   ├── auth/                   # OAuth callback & error pages
│   ├── casa-chirilagua/        # Project showcase page
│   ├── my-portfolio/           # Portfolio showcase
│   ├── posts/                  # Blog listing + individual posts
│   ├── projects/               # Projects page
│   ├── sign-in/                # Login page
│   ├── layout.tsx              # Root layout (providers, analytics)
│   ├── page.tsx                # Home page
│   ├── robots.ts               # Dynamic robots.txt
│   └── sitemap.ts              # Dynamic sitemap.xml
├── components/                 # Reusable UI components
├── lib/
│   ├── db/
│   │   ├── schema.ts           # Drizzle schema definitions
│   │   └── index.ts            # DB client (singleton with pooling)
│   └── ...                     # Shared utilities
├── utils/
│   └── supabase/               # Supabase client helpers + middleware
├── drizzle.config.ts           # Drizzle Kit config
├── next.config.js              # Next.js config
└── tailwind.config.js          # Tailwind config
```

---

## Pages & Routes

### Public

| Route | Description |
|---|---|
| `/` | Landing page with hero, projects, tools, and contact sections |
| `/about` | Personal story, hobbies, and public speaking highlights |
| `/my-portfolio` | Portfolio showcase |
| `/projects` | Projects listing |
| `/posts` | Blog index |
| `/posts/[id]` | Individual blog post with comments |
| `/casa-chirilagua` | Casa Chirilagua project page |

### Admin (Protected — requires Supabase session)

| Route | Description |
|---|---|
| `/admin/dashboard` | Overview dashboard |
| `/admin/blogs` | Blog post management |
| `/admin/blogs/[id]/edit` | Edit an existing post |
| `/admin/blog-composer` | Rich text blog composer |

### Auth

| Route | Description |
|---|---|
| `/sign-in` | Email + Google sign-in |
| `/auth/callback` | OAuth code exchange and session creation |
| `/auth/auth-code-error` | Auth error fallback |

---

## API Routes

| Endpoint | Method(s) | Auth | Description |
|---|---|---|---|
| `/api/posts` | GET, POST | POST only | Fetch all posts / create new post |
| `/api/posts/[id]` | GET, PUT, DELETE | PUT, DELETE | Individual post operations |
| `/api/posts/[id]/comments` | GET, POST | — | Fetch comments (emails masked) / submit comment |
| `/api/posts/[id]/comments/verify` | POST | — | Verify pending comment with 6-digit code |
| `/api/sign-cloudinary-params` | POST | Yes | Generate signed Cloudinary upload params |
| `/api/save-remote-media` | POST | Yes | Persist Cloudinary media record to DB |
| `/api/summarize` | POST | Yes | Gemini AI text summarization |
| `/api/hello-world` | GET | — | Health check |

---

## Database Schema

Managed with **Drizzle ORM** against a **PostgreSQL** database (Supabase).

| Table | Description |
|---|---|
| `User` | Portfolio owner record (synced from Supabase on first login) |
| `Post` | Blog posts (title, description, user FK, timestamps) |
| `ContentBlock` | Ordered content sections per post (doc / image / video, JSON data) |
| `Media` | Media files with Cloudinary/S3 metadata and file hash for deduplication |
| `Comment` | Verified comments (email masked in API responses) |
| `PendingComment` | Unverified comments with 6-digit code and 10-minute expiry |
| `Tag` | Blog tags |
| `PostTag` | Post ↔ Tag join table |

Run database commands:

```bash
npm run db:generate   # Generate migration files
npm run db:push       # Push schema changes to the database
npm run db:studio     # Open Drizzle Studio (visual DB browser)
```

---

## Authentication

Authentication is handled by **Supabase Auth** with server-side session management via `@supabase/ssr`.

**Flow:**
1. User visits `/sign-in` and authenticates via email or Google OAuth
2. Supabase redirects to `/auth/callback` where the auth code is exchanged for a session
3. On first login, the user is upserted into the Drizzle `User` table
4. Session is stored in cookies and validated on every protected request

**Middleware** (`utils/supabase/middleware.ts`) intercepts all requests. Unauthenticated users are redirected to `/sign-in` unless the path is explicitly public:

Public paths: `/`, `/about`, `/my-portfolio`, `/projects`, `/posts/*`, `/sign-in`, `/auth/*`, `/robots.txt`, `/sitemap.xml`

---

## External Services

| Service | Purpose |
|---|---|
| **Supabase** | PostgreSQL database + OAuth authentication |
| **Cloudinary** | Primary media storage, CDN delivery, signed uploads |
| **AWS S3** | Fallback media storage (configured, not primary) |
| **Google Gemini** | AI post summarization (`/api/summarize`) |
| **Resend** | Transactional email for comment verification codes |
| **EmailJS** | Client-side contact form emails |
| **Google Analytics** | Site analytics via GTM (`G-R0GTFSV0LN`) |
| **Vercel Analytics** | Page view tracking |
| **Vercel Speed Insights** | Core Web Vitals monitoring |
| **Calendly** | Embedded meeting scheduling |

---

## Environment Variables

Create a `.env.local` file at the project root:

```env
# App
NEXT_PUBLIC_BASE_URL=https://emilioulisesrivera.com
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=https://emilioulisesrivera.com

# Database
DATABASE_URL=postgresql://...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
NEXT_SUPABASE_SERVICE_ROLE=<service-role-key>

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<cloud-name>
NEXT_PUBLIC_CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
NEXT_PUBLIC_STORAGE_PROVIDER=CLOUDINARY

# Google Gemini AI
GEMINI_API_KEY=<gemini-key>

# Resend (email)
RESEND_API_KEY=<resend-key>

# Calendly
NEXT_PUBLIC_CALENDLY_EVENT_LINK=https://calendly.com/...
```

---

## Getting Started

**Prerequisites:** Node.js 18+, a PostgreSQL database (Supabase recommended), and accounts for the external services above.

```bash
# 1. Clone the repository
git clone <repo-url>
cd portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in all values in .env.local

# 4. Push the database schema
npm run db:push

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run analyze` | Build with bundle analyzer |
| `npm run db:generate` | Generate Drizzle migration files |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Drizzle Studio |
