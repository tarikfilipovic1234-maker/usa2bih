"use client";

import { useActionState, useRef } from "react";
import { Upload } from "lucide-react";
import { uploadDocument, type DocState } from "@/app/actions/documents";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select } from "@/components/ui/Field";

const TYPES = ["invoice", "title", "bill_of_lading", "customs", "registration", "other"];

export function UploadDocumentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState<DocState, FormData>(
    async (prev, fd) => {
      const res = await uploadDocument(prev, fd);
      if (res.ok) formRef.current?.reset();
      return res;
    },
    {},
  );

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="flex-1">
        <Label htmlFor="file">Upload a document</Label>
        <Input id="file" name="file" type="file" required className="file:mr-3 file:rounded-md file:border-0 file:bg-accent/20 file:px-3 file:py-1 file:text-accent-bright" />
      </div>
      <div className="sm:w-44">
        <Label htmlFor="type">Type</Label>
        <Select id="type" name="type" defaultValue="other">
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t.replace(/_/g, " ")}
            </option>
          ))}
        </Select>
      </div>
      <Button type="submit" disabled={pending}>
        <Upload className="h-4 w-4" /> {pending ? "Uploading…" : "Upload"}
      </Button>
      {state.error && <p className="text-sm text-danger sm:self-center">{state.error}</p>}
    </form>
  );
}
