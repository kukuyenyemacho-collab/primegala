# Image dashboard (staff guide)

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

## Setup (once, in Vercel)

1. **Storage:** project → Storage → Create Database → **Blob** → connect it to the project. This adds
   `BLOB_READ_WRITE_TOKEN` automatically.
2. **Password:** project → Settings → Environment Variables → add `ADMIN_PASSWORD` (a long passphrase).
3. **Redeploy.** The dashboard shows a yellow notice if either step is missing.

## How it works (for developers)

- Places on the site are defined in `apps/web/src/content/media-slots.ts`. Slot ids are stored with
  every upload: never rename one.
- Each upload is an image (`media/<slot>/<id>.<ext>`) plus a small JSON description
  (`media-meta/<slot>/<id>.json`) in Vercel Blob (`src/lib/media-store.ts`).
- Pages that show uploads are static with `revalidate = 60`. Posting or removing calls
  `revalidatePath` for the slot's page and the dashboard loads that page once, so the change shows
  straight away; the 60-second window also heals any race when several posts land at once.
- Sign-in is a single shared password with a signed, httpOnly, SameSite=Strict cookie
  (`src/lib/admin-auth.ts`). Upload routes also check the request comes from the site itself.
- Local testing: `MEDIA_STORAGE=local ADMIN_PASSWORD=… pnpm build && pnpm start` stores files in
  `apps/web/.media-local/`.
