export const dynamic = "force-dynamic";
import { Suspense } from "react";
import { SignInForm } from "./signin-form";

export default function SignInPage() {
  return <Suspense><SignInForm /></Suspense>;
}
