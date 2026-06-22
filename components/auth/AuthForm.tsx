"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input, Label } from "@/components/ui/Field";
import { Logo } from "@/components/layout/Logo";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSignUp = mode === "sign-up";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "");

    try {
      const result = isSignUp
        ? await authClient.signUp.email({ email, password, name })
        : await authClient.signIn.email({ email, password });

      if (result?.error) {
        setError(result.error.message ?? "Something went wrong. Please try again.");
        setPending(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setPending(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 flex justify-center">
        <Logo />
      </div>

      <GlassCard chrome className="p-7 sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl font-bold text-chrome">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-1 text-sm text-silver-dim">
            {isSignUp
              ? "Start saving vehicles and tracking imports."
              : "Sign in to your USA2BIH dashboard."}
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {isSignUp && (
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" autoComplete="name" required placeholder="Your name" />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@email.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              required
              minLength={8}
              placeholder="••••••••"
            />
            {isSignUp && <p className="mt-1 text-xs text-silver-dim/70">At least 8 characters.</p>}
          </div>

          {error && (
            <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-accent text-sm font-medium text-midnight transition-colors hover:bg-accent-bright disabled:opacity-60"
          >
            {pending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                {isSignUp ? "Create account" : "Sign in"} <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-silver-dim">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <Link
            href={isSignUp ? "/auth/sign-in" : "/auth/sign-up"}
            className="font-medium text-accent hover:underline"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </GlassCard>

      <p className="mt-6 text-center text-sm text-silver-dim">
        <Link href="/" className="hover:text-accent">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
