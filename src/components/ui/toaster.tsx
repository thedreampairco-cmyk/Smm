"use client";
import { useToast } from "@/hooks/use-toast";
import { X, CheckCircle2, AlertCircle } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg animate-fade-in ${
            t.variant === "destructive"
              ? "bg-red-950/90 border-red-500/30 text-red-100"
              : "bg-[#1a1a1a] border-white/10 text-white"
          }`}
        >
          {t.variant === "destructive" ? (
            <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1 min-w-0">
            {t.title && <p className="text-sm font-semibold">{t.title}</p>}
            {t.description && <p className="text-xs text-white/60 mt-0.5">{t.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
