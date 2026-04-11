export const dynamic = "force-dynamic";
import { Suspense } from "react";
import { SignUpForm } from "./signup-form";

export default function SignUpPage() {
  return <Suspense><SignUpForm /></Suspense>;
}
