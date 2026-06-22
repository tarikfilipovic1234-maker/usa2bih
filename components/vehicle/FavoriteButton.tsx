"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { toggleFavorite } from "@/app/actions/favorites";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  vehicleId,
  initial = false,
  variant = "icon",
}: {
  vehicleId: string;
  initial?: boolean;
  variant?: "icon" | "full";
}) {
  const router = useRouter();
  const [favorited, setFavorited] = useState(initial);
  const [pending, startTransition] = useTransition();

  function onClick() {
    const next = !favorited;
    setFavorited(next); // optimistic
    startTransition(async () => {
      const res = await toggleFavorite(vehicleId);
      if (!res.ok) {
        setFavorited(initial);
        router.push("/auth/sign-in");
        return;
      }
      setFavorited(res.favorited);
    });
  }

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        aria-pressed={favorited}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 rounded-full border px-6 text-sm font-medium transition-all",
          favorited
            ? "border-danger/40 bg-danger/10 text-danger"
            : "border-steel-2 text-silver hover:border-accent hover:text-chrome",
        )}
      >
        <Heart className={cn("h-4 w-4", favorited && "fill-current")} />
        {favorited ? "Saved" : "Save vehicle"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      aria-label={favorited ? "Remove from saved" : "Save vehicle"}
      aria-pressed={favorited}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full backdrop-blur-md transition-all",
        favorited
          ? "bg-danger/90 text-white"
          : "bg-midnight/50 text-silver hover:bg-midnight/80 hover:text-chrome",
      )}
    >
      <Heart className={cn("h-4 w-4", favorited && "fill-current")} />
    </button>
  );
}
