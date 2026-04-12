import { Suspense } from "react";
import { SignInForm } from "./signin-form";

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center"><div className="text-white/40">Loading...</div></div>}>
      <SignInForm />
    </Suspense>
  );
}
