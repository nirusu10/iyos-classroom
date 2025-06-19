# iyos-classroom

**A Japanese teacher booking site** – simple, time-zone aware, and built with love.  
Students can book lessons, view materials, and optionally register. Teachers can manage availability and bookings via the admin panel.

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **ORM:** Drizzle ORM
- **Database:** SQLite (LibSQL)
- **Language:** TypeScript
- **Email:** Resend (for confirmation emails)
- **Time zones:** date-fns + date-fns-tz
- **Authentication:** Clerk (planned)

---

## 🚀 Setup

```bash
pnpm install
pnpm dev
```

- Environment variables will be added as needed (e.g. for Resend, Clerk, DB URL)
- First milestone: deploy to **Vercel** early!

---

## ✅ Milestone Checklist

- [x] Project initialized with T3 stack + Drizzle + App Router
- [ ] Deploy first version to Vercel
- [ ] Create weekly teacher availability model (Drizzle)
- [ ] Add time zone conversion logic (student & teacher sides)
- [ ] Booking page with calendar and 10-minute slots
- [ ] Zod validation for bookings (start, end, email, time zone)
- [ ] Send booking confirmation emails via Resend
- [ ] Integrate Clerk (only when admin features require protection)
- [ ] Admin dashboard for teacher (view & edit availability, bookings)
- [ ] Materials page with public resources (e.g. PDFs, videos)
- [ ] (Optional/future) Blog section for teaching-related posts

---

## ✨ Planned Pages

- `/` – Landing page
- `/book` – Booking page
- `/admin` – Admin dashboard (teacher only)
- `/materials` – Materials for students
- `/api/booking` – Handle booking creation and confirmation

---

## 📦 Deployment

Deployed via [Vercel](https://vercel.com). Push to `main` to trigger redeploy.  
Deploy early, test often!

---

## 📄 License

MIT License. Built for personal use.
