import { Suspense } from "react";
import { SignInForm } from "./signin-form";

export default function SignInPage() {
  return <Suspense fallback={<div className="min-h-screen bg-[#0f0f0f]" />}><SignInForm /></Suspense>;
}
