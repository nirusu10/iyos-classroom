# iyos-classroom

A booking and teaching materials platform built for a Japanese teacher using the T3 stack (Next.js, Tailwind CSS, TypeScript, Drizzle ORM).

## 🌐 Live Deployment

Deployed early and continuously using [Vercel](https://vercel.com/).

## 🧰 Tech Stack

- [Next.js App Router](https://nextjs.org/docs/app)
- TypeScript
- Tailwind CSS
- Drizzle ORM (with SQLite/LibSQL)
- ESLint & Prettier
- Clerk (planned)
- Resend for email (planned)
- `date-fns` & `date-fns-tz` for time zone handling

---

## ✅ Roadmap & Checklist

### 🔁 Initial Setup

- [x] Scaffold project using T3 stack
- [x] Deploy early to Vercel

### 1. 📄 Pages & Routing

- [ ] `/` – Landing page with teacher intro & CTA to book
- [ ] `/book` – Booking page (calendar, time slots, email input)
- [ ] `/admin` – Teacher dashboard to manage availability & see bookings
- [ ] `/materials` – Static or dynamic materials page
- [ ] API Route `/api/booking` – Accepts validated booking requests

### 2. 🔄 Booking Flow (no auth yet)

- [ ] Design Zod schemas for booking validation
- [ ] Add student email + start/end time + timezone to booking form
- [ ] Handle time zone conversion with `date-fns-tz`
- [ ] Allow booking from available teacher time slots
- [ ] Store validated booking in SQLite via Drizzle
- [ ] Show confirmation page or toast

### 3. 🗓️ Teacher Availability

- [ ] Build a form to input weekly availability (per weekday)
- [ ] Repeat weekly logic (e.g. every Monday at 14:00)
- [ ] Convert to UTC on backend and save to DB
- [ ] Generate time slots (10-min spaced, 50-min sessions)

### 4. 📬 Confirmation Email (Resend)

- [ ] Set up Resend account
- [ ] Send email to student after booking with date/time
- [ ] Send email to teacher with student info

### 5. 👤 Authentication (Later Phase)

- [ ] Integrate Clerk (email-based for teacher + optional for students)
- [ ] Make admin page editable only when logged in as teacher

### 6. 📚 Materials Page

- [ ] Simple static or CMS-based page to upload/share resources

---

## 🧪 Dev Scripts

```bash
pnpm dev         # Start dev server
pnpm lint        # Lint code
pnpm format      # Format code
pnpm build       # Build for production
```

---

## 🧠 Notes

- Prioritize deploying early and often.
- Keep user flow smooth: no hard blocks, just UX nudges.
- Focus first on working booking loop → admin tools → polish.
