// src/hooks/use-toast.ts
"use client";
import * as React from "react";

export type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
};

type ToastState = { toasts: (ToastProps & { id: string })[] };

type Action =
  | { type: "ADD"; toast: ToastProps & { id: string } }
  | { type: "REMOVE"; id: string };

let toastCount = 0;

const listeners: Array<(state: ToastState) => void> = [];
let memoryState: ToastState = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((l) => l(memoryState));
}

function reducer(state: ToastState, action: Action): ToastState {
  switch (action.type) {
    case "ADD":
      return { ...state, toasts: [action.toast, ...state.toasts].slice(0, 5) };
    case "REMOVE":
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) };
  }
}

export function toast(props: ToastProps) {
  const id = String(++toastCount);
  dispatch({ type: "ADD", toast: { ...props, id } });
  setTimeout(() => dispatch({ type: "REMOVE", id }), props.duration ?? 4000);
  return id;
}

export function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const idx = listeners.indexOf(setState);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  return { toasts: state.toasts, toast };
}
