"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { buttonClasses } from "@/components/ui";

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className={buttonClasses("secondary", "md", "gap-2")}
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.refresh();
      }}
    >
      <LogOut className="size-4" aria-hidden /> Sign out
    </button>
  );
}
