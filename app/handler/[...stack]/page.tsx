import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "@/stack";

/** Renders all Neon Auth (Stack) flows: sign-in, sign-up, account, etc. */
export default function Handler(props: unknown) {
  return <StackHandler fullPage app={stackServerApp} routeProps={props} />;
}
