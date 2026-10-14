-- PRIMEGALA HOSPITAL website: dashboard images and booking requests.
--
-- Both tables have row level security switched on with NO policies, so the public
-- (publishable/anon) key can neither read nor write them. Only the website's server,
-- using the secret key, can. Booking requests are personal health data (Data Protection
-- Act, 2019): never add a public policy to `leads`.

-- Images posted from the staff dashboard (/admin) -------------------------------------
create table if not exists public.media_items (
  id          text primary key,
  slot        text not null,                -- place on the site, see apps/web/src/content/media-slots.ts
  path        text not null,                -- object path in the `media` storage bucket
  url         text not null,                -- public URL of the image
  alt         text not null,                -- description, read aloud to blind visitors
  caption     text,
  title       text,                         -- promotions only
  link        text,                         -- promotions only
  ends_on     date,                         -- promotions only: last day to show
  created_at  timestamptz not null default now()
);
create index if not exists media_items_slot_idx on public.media_items (slot, created_at desc);
alter table public.media_items enable row level security;

-- Public bucket for those images: anyone can view, only the server can upload or delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 4194304, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Booking requests from the website forms -----------------------------------------------
create table if not exists public.leads (
  id              uuid primary key,
  reference       text not null unique,     -- e.g. PG-3F9A1C, shown to the patient
  type            text not null,            -- appointment, callback, enquiry, sha-help, maternity-tour
  full_name       text not null,
  phone           text not null,            -- E.164, e.g. +254712345678
  email           text,
  service         text,
  preferred_date  date,
  preferred_time  text,
  contact_channel text,
  message         text,
  status          text not null default 'new' check (status in ('new', 'contacted', 'done')),
  payload         jsonb not null,           -- the full lead, including consent and attribution
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists leads_status_created_idx on public.leads (status, created_at desc);
alter table public.leads enable row level security;
