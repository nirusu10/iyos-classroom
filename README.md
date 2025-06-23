# iyos-classroom

A Japanese teacher booking platform built with the T3 Stack.

## 🧱 Tech Stack

- **Next.js App Router** (TypeScript)
- **Tailwind CSS**
- **Drizzle ORM** with SQLite (LibSQL)
- **Zod** for validation
- **Resend** for email notifications
- **ESLint + Prettier**
- **Authentication**: None yet (Clerk planned)
- **CMS**: For lesson materials and blog posts (planned)

## 🚧 Development Checkpoints

### 1. 🏗️ Project Structure

- [ ] Set up project folders (`app`, `components`, `lib`, `db`, `styles`)
- [ ] Configure `~/` import alias

### 2. 🧠 Data Models (Drizzle)

- [ ] Create schema: `Teacher`, `Availability`, `Booking`, `Student`
- [ ] Availability:
  - Weekly recurring (e.g. "Mondays 14:00–18:00")
  - Overridable on specific dates
  - Valid up to 4 weeks in advance
- [ ] Booking:
  - 50-minute lessons
  - Start times in 10-minute intervals
  - Prevent double-booking (overlap checking logic)
- [ ] Run and test migrations

### 3. 📜 Zod Validation

- [ ] Booking request validation
- [ ] Availability slot validation
- [ ] Shared schemas for both frontend/backend in `lib/validation/`

### 4. 🖼️ Public Booking UI

- [ ] Calendar view for selecting a date
- [ ] Show available time slots per day
- [ ] Booking form with email input
- [ ] Booking confirmation screen

### 5. 🧑‍🏫 Teacher Admin Panel

- [ ] Login system (planned via Clerk)
- [ ] Manage recurring weekly availability
- [ ] Override or block specific days
- [ ] View upcoming bookings

### 6. ⏰ Time Zone Handling

- [ ] Store times in UTC
- [ ] Use `date-fns-tz` to convert times on frontend
- [ ] Detect user’s local time zone automatically

### 7. 📩 Email Notifications

- [ ] Send confirmation email to student (via Resend)
- [ ] Send alert email to teacher
- [ ] Optionally include student name/message

### 8. 🛡️ Authentication (Planned)

- [ ] Add Clerk for teacher login
- [ ] Evaluate optional student registration (low-friction)

### 9. 🧾 CMS & Content (Planned)

- [ ] Add support for lesson materials in admin dashboard
- [ ] Display materials on a public-facing "Materials" page
- [ ] Add blog feature for updates and posts

### 10. 🌐 Deployment

- [ ] Deploy to Vercel
- [ ] Connect environment variables
- [ ] Ensure persistent database (via LibSQL or external PostgreSQL later)
