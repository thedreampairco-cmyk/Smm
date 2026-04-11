"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 10000,  suffix: "+", label: "Active Customers" },
  { value: 5000,   suffix: "+", label: "SMM Services" },
  { value: 100000, suffix: "+", label: "Active Orders" },
  { value: 300000, suffix: "+", label: "Orders Completed" },
];

function useCountUp(target: number, duration = 2000, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function formatNum(n: number): string {
  if (n >= 100000) return `${(n / 100000).toFixed(0)}L`;
  if (n >= 1000)   return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}

function StatItem({ value, suffix, label }: typeof stats[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, 1800, active);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl font-extrabold" style={{ background: "linear-gradient(135deg, #d4af37, #f5e070)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {formatNum(count)}{suffix}
      </div>
      <div className="text-xs text-white/40 mt-1">{label}</div>
    </div>
  );
}

export function StatsCounter() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
      {stats.map((s) => <StatItem key={s.label} {...s} />)}
    </div>
  );
}
