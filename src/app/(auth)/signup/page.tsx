import { Suspense } from "react";
import { SignUpForm } from "./signup-form";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center"><div className="text-white/40">Loading...</div></div>}>
      <SignUpForm />
    </Suspense>
  );
}
