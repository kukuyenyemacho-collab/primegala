import { promises as fs } from "node:fs";
import { localFilePath } from "@/lib/media-store";

/** Serves uploads saved by the local test storage (MEDIA_STORAGE=local). Off in production. */
const TYPES: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  if (process.env.MEDIA_STORAGE !== "local") return new Response("Not found", { status: 404 });
  const { path } = await params;
  const pathname = path.join("/");
  const type = TYPES[pathname.split(".").pop() ?? ""];
  if (!pathname.startsWith("media/") || !type) return new Response("Not found", { status: 404 });
  try {
    const data = await fs.readFile(localFilePath(pathname));
    return new Response(new Uint8Array(data), { headers: { "content-type": type, "cache-control": "public, max-age=31536000" } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
