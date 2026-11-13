# Brand New Everyday — Family Check-In & Devotion

A mobile-first family check-in and devotion application built with **Astro**, **Tailwind CSS**, and **Cloudflare Workers (with Cloudflare D1)**.

---

## 🌟 Features

1. **Family Purpose & Approachable Guide:**
   - Exists so all family members can stay connected, know everyone is safe and well, and encourage one another in faith.
   - Zero pressure: simple, 30-second check-in using friendly defaults is more than enough.
   - Accessible via the collapsible welcome card on the dashboard or dedicated `/guide`.

2. **Daily Check-In Form (`/`):**
   - Automatically records current local date and time.
   - **7-Option State of Mind selector:** `Very Unpleasant`, `Unpleasant`, `Slightly Unpleasant`, `Neutral`, `Slightly Pleasant`, `Pleasant` (default), `Very Pleasant`.
   - **4 Styled Pastel Textareas:**
     - **Struggle** (Soft rose/blush tint, default: `"None"`)
     - **Count Blessing** (Soft amber/gold tint, default: `"I'm loved by God"`)
     - **Prayer Request** (Soft sky blue/indigo tint, default: `"Lord's Prayer"`)
     - **Any Other Business** (Soft sage/mint green tint, default: `""`)

3. **Reformed Theology Daily Devotion:**
   - Dedicated devotion card focusing on divine sovereignty, providence, grace, union with Christ, and trust in His covenant faithfulness.
   - Automatically saved and linked with each check-in record.

4. **History & CRUD with Strict User Isolation (`/history`):**
   - Reverse-chronological timeline of all family check-ins.
   - Logged-in users can only **Edit** (`/checkin/edit/[id]`) and **Delete** their own entries (enforced at both UI and database query level).

5. **Auto-Save & 10-Minute Security Auto-Logoff:**
   - **Auto-Save:** Drafts save automatically to `localStorage` as you type/select options with a subtle `"Draft saved ✓"` status indicator.
   - **10-Minute Security Inactivity & Focus-Loss Auto-Logoff:** Automatically terminates active sessions and redirects to `/login?reason=inactivity` after 10 minutes of inactivity or window blur.

---

## 🗄️ Database Architecture & D1 Migrations

The application uses **Cloudflare D1** in production and falls back seamlessly to local SQLite (`database.sqlite`) in dev mode.

### Schema Definition

```sql
-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  is_admin INTEGER NOT NULL DEFAULT 0
);

-- Check-Ins Table
CREATE TABLE IF NOT EXISTS check_ins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  username TEXT NOT NULL,
  state_of_mind TEXT NOT NULL,
  struggle TEXT NOT NULL,
  count_blessing TEXT NOT NULL,
  prayer_request TEXT NOT NULL,
  aob TEXT,
  devotion_title TEXT,
  devotion_passage TEXT,
  devotion_text TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_check_ins_user_id ON check_ins(user_id);
CREATE INDEX IF NOT EXISTS idx_check_ins_created_at ON check_ins(created_at);
```

### Auto-Migration
The application includes automatic runtime initialization in `src/lib/db.ts` (`seedD1IfNeeded`) that safely creates missing tables and indexes and seeds default family accounts on the first request.

### Manual Cloudflare D1 Setup (Optional)
If you prefer to run migration scripts manually via Wrangler:

1. **Create the D1 database:**
   ```bash
   npx wrangler d1 create my-personal-site-db
   ```

2. **Execute Schema Migration on Remote D1:**
   ```bash
   npx wrangler d1 execute my-personal-site-db --remote --command="
     CREATE TABLE IF NOT EXISTS users (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       username TEXT UNIQUE NOT NULL,
       password_hash TEXT NOT NULL,
       salt TEXT NOT NULL,
       is_admin INTEGER NOT NULL DEFAULT 0
     );
     CREATE TABLE IF NOT EXISTS check_ins (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       user_id INTEGER NOT NULL,
       username TEXT NOT NULL,
       state_of_mind TEXT NOT NULL,
       struggle TEXT NOT NULL,
       count_blessing TEXT NOT NULL,
       prayer_request TEXT NOT NULL,
       aob TEXT,
       devotion_title TEXT,
       devotion_passage TEXT,
       devotion_text TEXT,
       created_at TEXT NOT NULL,
       updated_at TEXT NOT NULL
     );
     CREATE INDEX IF NOT EXISTS idx_check_ins_user_id ON check_ins(user_id);
     CREATE INDEX IF NOT EXISTS idx_check_ins_created_at ON check_ins(created_at);
   "
   ```

---

## 💻 Development Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Start Astro dev server at `http://localhost:4321` |
| `npm run build` | Build production server & client bundle for Cloudflare |
| `npx wrangler deploy` | Deploy Worker and static assets directly to Cloudflare |
