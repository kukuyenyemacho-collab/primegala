import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#08172d",
    lang: "en-KE",
    categories: ["health", "medical"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Book a visit", url: "/book", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Emergency care", url: "/emergency", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Find us", url: "/contact", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
