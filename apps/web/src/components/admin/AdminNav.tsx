import Link from "next/link";
import { ClipboardList, Images } from "lucide-react";
import { cn } from "@/lib/cn";
import { SignOutButton } from "./SignOutButton";

/** Tabs across the top of every dashboard page. */
export function AdminNav({ current }: { current: "images" | "requests" }) {
  const tabs = [
    { key: "requests", href: "/admin/requests", label: "Booking requests", Icon: ClipboardList },
    { key: "images", href: "/admin", label: "Images", Icon: Images },
  ] as const;
  return (
    <div className="flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
      <nav aria-label="Dashboard" className="flex gap-2">
        {tabs.map(({ key, href, label, Icon }) => (
          <Link
            key={key}
            href={href}
            aria-current={current === key ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-semibold",
              current === key
                ? "border-trust-800 bg-trust-800 text-white"
                : "border-line bg-white text-ink hover:border-brand-300",
            )}
          >
            <Icon className="size-4" aria-hidden /> {label}
          </Link>
        ))}
      </nav>
      <SignOutButton />
    </div>
  );
}
