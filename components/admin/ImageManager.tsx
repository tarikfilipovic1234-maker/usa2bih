"use client";

import Image from "next/image";
import { useActionState, useRef, useTransition } from "react";
import { Star, Trash2, Upload } from "lucide-react";
import {
  deleteVehicleImage,
  setPrimaryImage,
  uploadVehicleImages,
  type AdminFormState,
} from "@/app/actions/admin";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Img = { id: string; url: string; isPrimary: boolean };

export function ImageManager({ vehicleId, images }: { vehicleId: string; images: Img[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [state, action, uploading] = useActionState<AdminFormState, FormData>(
    async (prev, fd) => {
      const res = await uploadVehicleImages(vehicleId, prev, fd);
      if (res.ok) formRef.current?.reset();
      return res;
    },
    {},
  );

  return (
    <GlassCard chrome className="flex flex-col gap-5 p-6">
      <div>
        <h2 className="font-display text-lg font-semibold text-chrome">Images</h2>
        <p className="text-sm text-silver-dim">Upload one or more photos. The first becomes the primary.</p>
      </div>

      <form ref={formRef} action={action} className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          name="images"
          type="file"
          accept="image/*"
          multiple
          required
          className="flex-1 text-sm text-silver file:mr-3 file:rounded-md file:border-0 file:bg-accent/20 file:px-3 file:py-1.5 file:text-accent-bright"
        />
        <Button type="submit" disabled={uploading}>
          <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : "Upload"}
        </Button>
      </form>
      {state.error && <p className="text-sm text-danger">{state.error}</p>}

      {images.length === 0 ? (
        <p className="rounded-xl border border-dashed border-steel-2 px-4 py-8 text-center text-sm text-silver-dim">
          No images yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((img) => (
            <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl">
              <Image src={img.url} alt="" fill sizes="200px" className="object-cover" />
              {img.isPrimary && (
                <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-midnight">
                  Primary
                </span>
              )}
              <div className="absolute inset-0 flex items-end justify-end gap-1.5 bg-gradient-to-t from-midnight/80 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  disabled={pending || img.isPrimary}
                  onClick={() => startTransition(async () => void (await setPrimaryImage(img.id)))}
                  aria-label="Set as primary"
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-lg bg-midnight/80 text-silver hover:text-accent",
                    img.isPrimary && "opacity-40",
                  )}
                >
                  <Star className={cn("h-4 w-4", img.isPrimary && "fill-current text-accent")} />
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => startTransition(async () => void (await deleteVehicleImage(img.id)))}
                  aria-label="Delete image"
                  className="grid h-8 w-8 place-items-center rounded-lg bg-midnight/80 text-silver hover:text-danger"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
