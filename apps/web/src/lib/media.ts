import "server-only";
import { cache } from "react";
import { listMediaItems, storageDriver, type MediaItem } from "./media-store";

export type { MediaItem } from "./media-store";

/** One storage listing per render, shared by every slot on the page. */
const allItems = cache(async (): Promise<MediaItem[]> => {
  if (!storageDriver()) return [];
  try {
    return await listMediaItems();
  } catch (error) {
    // A storage outage must never take the public site down: show the built-in photos only.
    console.error("[media] could not list uploads", error);
    return [];
  }
});

/** Today's date in Nairobi as YYYY-MM-DD, for promotion end dates. */
function todayInNairobi() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Nairobi" }).format(new Date());
}

/** Images posted to one slot, newest first. Expired promotions are left out. */
export async function getSlotItems(slot: string): Promise<MediaItem[]> {
  const today = todayInNairobi();
  return (await allItems()).filter((i) => i.slot === slot && (!i.endsOn || i.endsOn >= today)).reverse();
}
