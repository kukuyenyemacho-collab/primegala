# Staff dashboard: images and booking requests

Staff can post images to the website without a developer: promotions in the homepage hero,
the Gallery page, and photos on the homepage, Our story, Our care team and every service page.

## Opening it

- Go to `/admin` (for example `https://primegalahospital.co.ke/admin`), or click the large
  **PRIMEGALA HOSPITAL** name at the very bottom of any page.
- Sign in with the dashboard password. Sessions last 12 hours; use **Sign out** on shared computers.

## Posting an image

1. Find the card for the place you want. The link under the title opens that page.
2. **Choose an image.** Phone photos are shrunk automatically before upload.
3. Write a one-line **description** of what the image shows. Screen readers read it aloud to blind
   visitors, and it helps Google.
4. For promotions you can also add a **headline** (shown under the slide), a **link**
   (`/book`, `/services/maternity` or a full `https://` address) and a **Show until** date.
   After that date the slide disappears by itself (checked hourly).
5. Click **Upload & post**. It is live within seconds; if you already had the page open, refresh it
   once. The bin icon on a thumbnail takes an image down.

Each card shows how many images it holds (for example `2/8`). Remove one to post another when full.

## Rules

- Only post photos the facility owns.
- Only show patients or staff who have agreed **in writing** (Data Protection Act, 2019).
- Never post anything with patient names, files, screens or results visible.
- Promotions must follow KMPDC advertising rules: no "best", "cheapest" or guaranteed results.

## Booking requests

The **Booking requests** tab lists every request sent from the website's forms, newest first:
name, what they asked for, preferred date and how they want to be contacted. Tap the phone number
to call, **WhatsApp** to message, then **Mark contacted** and later **Mark done**. Requests are
personal health information: do not copy or share them outside the facility.

## Setup (once)

Everything is stored in the facility's Supabase project (`ufzqjejbftsxdhhmsdpy`).

1. **Create the tables and the image bucket.** Either:
   - Supabase dashboard → **SQL Editor** → paste the contents of
     `supabase/migrations/20261014090000_website_media_and_leads.sql` → **Run**; or
   - from this repository on a computer with the Supabase CLI:
     ```
     supabase login
     supabase link --project-ref ufzqjejbftsxdhhmsdpy
     supabase db push
     ```
2. **Vercel → Settings → Environment Variables** (Production), then **Redeploy**:
   - `SUPABASE_SECRET_KEY`: Supabase → Project Settings → API Keys → **Secret key** (`sb_secret_…`).
     Server-only: never put it in code or in a `NEXT_PUBLIC_` variable.
   - `ADMIN_PASSWORD`: a long passphrase for the dashboard.
   - (`NEXT_PUBLIC_SUPABASE_URL` is already set in `apps/web/.env.production`.)

The dashboard shows a yellow notice while either step is missing.

## How it works (for developers)

- Places on the site are defined in `apps/web/src/content/media-slots.ts`. Slot ids are stored with
  every upload: never rename one.
- Each upload is an image in the public Supabase storage bucket `media` (`<slot>/<id>.<ext>`) plus a
  row in the `media_items` table (`src/lib/media-store.ts`). Booking requests are rows in `leads`
  (`src/lib/lead-store.ts`); both tables have row level security on with no public policies, so
  only the server (secret key) can read or write them.
- Pages that show uploads are static with `revalidate = 60`. Posting or removing calls
  `revalidatePath` for the slot's page and the dashboard loads that page once, so the change shows
  straight away; the 60-second window also heals any race when several posts land at once.
- Sign-in is a single shared password with a signed, httpOnly, SameSite=Strict cookie
  (`src/lib/admin-auth.ts`). Upload routes also check the request comes from the site itself.
- Local testing: `MEDIA_STORAGE=local ADMIN_PASSWORD=… pnpm build && pnpm start` stores files in
  `apps/web/.media-local/`.
