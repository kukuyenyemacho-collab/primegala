import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildLead, leadInputSchema } from "@primegala/contracts";

vi.mock("server-only", () => ({}));

/** Minimal stand-in for the Supabase client: records calls, returns canned rows. */
const calls: { op: string; table?: string; args?: unknown }[] = [];
let rows: Record<string, unknown>[] = [];
let insertError: { code: string; message: string } | null = null;

function query(table: string) {
  const chain = {
    select: () => chain,
    order: () => chain,
    limit: () => Promise.resolve({ data: rows, error: null }),
    eq: () => chain,
    maybeSingle: () => Promise.resolve({ data: { path: "gallery/x.jpg" }, error: null }),
    insert: (args: unknown) => {
      calls.push({ op: "insert", table, args });
      return Promise.resolve({ error: insertError });
    },
    delete: () => {
      calls.push({ op: "delete", table });
      return { eq: () => Promise.resolve({ error: null }) };
    },
  };
  return chain;
}
const fake = {
  from: query,
  storage: {
    from: () => ({
      upload: (path: string) => {
        calls.push({ op: "upload", args: path });
        return Promise.resolve({ error: null });
      },
      getPublicUrl: (path: string) => ({
        data: { publicUrl: `https://ref.supabase.co/storage/v1/object/public/media/${path}` },
      }),
      remove: (paths: string[]) => {
        calls.push({ op: "remove", args: paths });
        return Promise.resolve({ error: null });
      },
    }),
  },
};
vi.mock("./supabase", () => ({ supabaseAdmin: () => fake, MEDIA_BUCKET: "media" }));

const store = await import("./media-store");
const { storeLead } = await import("./lead-store");

beforeEach(() => {
  calls.length = 0;
  rows = [];
  insertError = null;
});

describe("Supabase image storage", () => {
  it("uploads the image, then records it in media_items", async () => {
    const item = await store.saveMediaItem(
      { id: "abc", slot: "gallery", alt: "The building", createdAt: "2026-10-14T08:00:00.000Z" },
      { bytes: Buffer.from("x"), contentType: "image/jpeg", ext: "jpg" },
    );
    expect(store.storageDriver()).toBe("supabase");
    expect(calls[0]).toMatchObject({ op: "upload", args: "gallery/abc.jpg" });
    expect(calls[1]).toMatchObject({
      op: "insert",
      table: "media_items",
      args: { id: "abc", path: "gallery/abc.jpg" },
    });
    expect(item.url).toBe("https://ref.supabase.co/storage/v1/object/public/media/gallery/abc.jpg");
  });

  it("removes the uploaded file if the database insert fails", async () => {
    insertError = { code: "500", message: "boom" };
    await expect(
      store.saveMediaItem(
        { id: "abc", slot: "gallery", alt: "x", createdAt: "2026-10-14T08:00:00.000Z" },
        { bytes: Buffer.from("x"), contentType: "image/jpeg", ext: "jpg" },
      ),
    ).rejects.toThrow();
    expect(calls.map((c) => c.op)).toEqual(["upload", "insert", "remove"]);
  });

  it("maps database rows to items", async () => {
    rows = [
      {
        id: "a",
        slot: "promotions",
        url: "u",
        alt: "d",
        caption: null,
        title: "T",
        link: null,
        ends_on: "2026-12-31",
        created_at: "2026-10-14T08:00:00Z",
      },
    ];
    expect(await store.listMediaItems()).toEqual([
      {
        id: "a",
        slot: "promotions",
        url: "u",
        alt: "d",
        title: "T",
        endsOn: "2026-12-31",
        createdAt: "2026-10-14T08:00:00Z",
      },
    ]);
  });

  it("deletes the file and its row", async () => {
    await store.deleteMediaItem({ id: "x", slot: "gallery", url: "u", alt: "a", createdAt: "" });
    expect(calls.map((c) => c.op)).toEqual(["remove", "delete"]);
  });
});

describe("Supabase booking requests", () => {
  const lead = buildLead(
    leadInputSchema.parse({
      type: "appointment",
      fullName: "Wanjiru Njoroge",
      phone: "0722 000 111",
      preferredChannel: "whatsapp",
      consent: true,
    }),
    { id: "3f9a1c2b-0000-4000-8000-000000000000", policyVersion: "test" },
  );

  it("saves the request with its reference", async () => {
    expect(await storeLead(lead)).toBe("stored");
    expect(calls[0]).toMatchObject({
      op: "insert",
      table: "leads",
      args: {
        reference: "PG-3F9A1C",
        full_name: "Wanjiru Njoroge",
        phone: "+254722000111",
        contact_channel: "whatsapp",
      },
    });
  });

  it("treats a duplicate (retried) request as saved, and reports other errors", async () => {
    insertError = { code: "23505", message: "duplicate" };
    expect(await storeLead(lead)).toBe("stored");
    insertError = { code: "500", message: "down" };
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(await storeLead(lead)).toBe("failed");
  });
});
