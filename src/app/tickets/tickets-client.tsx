"use client";
import { useState } from "react";
import { Plus, X, MessageCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const statusConfig: Record<string, string> = {
  OPEN:        "bg-green-500/15 text-green-400 border-green-500/30",
  IN_PROGRESS: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  RESOLVED:    "bg-gray-500/15 text-gray-400 border-gray-500/30",
  CLOSED:      "bg-red-500/15 text-red-400 border-red-500/30",
};

const priorityConfig: Record<string, string> = {
  LOW:    "text-gray-400",
  MEDIUM: "text-yellow-400",
  HIGH:   "text-orange-400",
  URGENT: "text-red-400",
};

export function TicketsClient({ tickets: initial, orders }: { tickets: any[]; orders: any[] }) {
  const { toast } = useToast();
  const [tickets, setTickets] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ subject: "", message: "", orderId: "", priority: "MEDIUM" });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to create ticket");
      setTickets([data.ticket, ...tickets]);
      setShowForm(false);
      setForm({ subject: "", message: "", orderId: "", priority: "MEDIUM" });
      toast({ title: "Ticket created!", description: "We'll respond within 24 hours." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Support Tickets</h1>
          <p className="text-white/40 text-sm mt-1">Get help from our support team</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}
          className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">
          <Plus className="h-4 w-4 mr-1.5" /> New Ticket
        </Button>
      </div>

      {/* New ticket form */}
      {showForm && (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white">Create New Ticket</h2>
            <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <Label className="text-white/60 text-sm mb-1.5 block">Subject *</Label>
              <Input placeholder="Brief description of your issue"
                value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required minLength={5}
                className="bg-[#0f0f0f] border-white/10 text-white placeholder:text-white/25 focus:border-amber-500/50 h-11" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white/60 text-sm mb-1.5 block">Related Order (optional)</Label>
                <select value={form.orderId} onChange={(e) => setForm({ ...form, orderId: e.target.value })}
                  className="w-full bg-[#0f0f0f] border border-white/10 text-white/70 rounded-lg px-3 py-2.5 text-sm focus:border-amber-500/50 focus:outline-none">
                  <option value="">— No specific order —</option>
                  {orders.map((o) => (
                    <option key={o.id} value={o.id}>
                      #{o.id.slice(-8).toUpperCase()} — {o.service.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-white/60 text-sm mb-1.5 block">Priority</Label>
                <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="w-full bg-[#0f0f0f] border border-white/10 text-white/70 rounded-lg px-3 py-2.5 text-sm focus:border-amber-500/50 focus:outline-none">
                  {["LOW", "MEDIUM", "HIGH", "URGENT"].map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <Label className="text-white/60 text-sm mb-1.5 block">Message *</Label>
              <textarea
                placeholder="Describe your issue in detail..."
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                required minLength={10} rows={4}
                className="w-full bg-[#0f0f0f] border border-white/10 text-white placeholder:text-white/25 focus:border-amber-500/50 focus:outline-none rounded-xl px-4 py-3 text-sm resize-none"
              />
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}
                className="border-white/10 text-white/60 hover:text-white">Cancel</Button>
              <Button type="submit" disabled={loading}
                className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Ticket"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Tickets list */}
      {tickets.length === 0 ? (
        <div className="text-center py-20 border border-white/[0.06] rounded-2xl">
          <MessageCircle className="h-10 w-10 text-white/20 mx-auto mb-3" />
          <p className="text-white/40">No tickets yet</p>
          <p className="text-white/25 text-sm mt-1">Create a ticket if you need help with anything</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="rounded-xl border border-white/[0.07] bg-[#111] overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/[0.02]"
                onClick={() => setExpanded(expanded === ticket.id ? null : ticket.id)}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm truncate">{ticket.subject}</p>
                    <p className="text-xs text-white/30 mt-0.5">
                      #{ticket.id.slice(-8).toUpperCase()} · {new Date(ticket.createdAt).toLocaleDateString()}
                      · <span className={priorityConfig[ticket.priority]}>{ticket.priority}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-3">
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium border ${statusConfig[ticket.status]}`}>
                    {ticket.status.replace("_", " ")}
                  </span>
                  {expanded === ticket.id
                    ? <ChevronUp className="h-4 w-4 text-white/30" />
                    : <ChevronDown className="h-4 w-4 text-white/30" />}
                </div>
              </div>

              {expanded === ticket.id && (
                <div className="border-t border-white/[0.06] p-4 space-y-3">
                  {ticket.messages.map((msg: any) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.isAdmin ? "flex-row-reverse" : ""}`}>
                      <div className={`h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                        msg.isAdmin ? "bg-amber-500/20 text-amber-400" : "bg-white/10 text-white/60"
                      }`}>
                        {msg.isAdmin ? "A" : "U"}
                      </div>
                      <div className={`rounded-xl p-3 text-sm max-w-[80%] ${
                        msg.isAdmin ? "bg-amber-500/10 border border-amber-500/15 text-amber-100" : "bg-white/[0.05] text-white/80"
                      }`}>
                        <p>{msg.message}</p>
                        <p className="text-xs opacity-50 mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
