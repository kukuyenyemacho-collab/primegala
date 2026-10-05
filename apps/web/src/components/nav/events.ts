/**
 * Tiny client event so any button on the page (e.g. the phone action bar) can open
 * the header search dialog without sharing React state with it.
 */
export const OPEN_SEARCH_EVENT = "open-search";

export function openSiteSearch() {
  window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));
}
