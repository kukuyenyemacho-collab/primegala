export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00+03:00`).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Nairobi",
  });
}
