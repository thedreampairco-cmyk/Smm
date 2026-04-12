import { Suspense } from "react";
import { SignUpForm } from "./signup-form";

export default function SignUpPage() {
  return <Suspense fallback={<div className="min-h-screen bg-[#0f0f0f]" />}><SignUpForm /></Suspense>;
}
