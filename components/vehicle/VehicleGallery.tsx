"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type GalleryImage = { id: string; url: string; alt: string | null };

export function VehicleGallery({ images, name }: { images: GalleryImage[]; name: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="panel grid aspect-[16/10] place-items-center rounded-lg text-silver-dim">
        No images
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="panel relative aspect-[16/10] overflow-hidden rounded-lg p-2">
        <div className="relative h-full w-full overflow-hidden rounded-md">
          <Image
            /* Keyed so swapping the source remounts the element and replays the fade. */
            key={images[active].id}
            src={images[active].url}
            alt={images[active].alt ?? name}
            fill
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="animate-fade-in object-cover"
          />
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md border-2 transition-colors",
                i === active
                  ? "border-accent"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <Image src={img.url} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
