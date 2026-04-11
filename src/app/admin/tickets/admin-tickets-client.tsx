"use client";
import { useState } from "react";
import { MessageCircle, ChevronDown, ChevronUp, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const statusConfig: Record<string, string> = {
  OPEN:        "bg-green-500/15 text-green-400 border-green-500/30",
  IN_PROGRESS: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  RESOLVED:    "bg-gray-500/15 text-gray-400 border-gray-500/30",
  CLOSED:      "bg-red-500/15 text-red-400 border-red-500/30",
};

export function AdminTicketsClient({ tickets: initial }: { tickets: any[] }) {
  const { toast } = useToast();
  const [tickets, setTickets] = useState(initial);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = statusFilter === "ALL" ? tickets : tickets.filter((t) => t.status === statusFilter);

  async function sendReply(ticketId: string) {
    const message = replies[ticketId]?.trim();
    if (!message) return;
    setLoading(ticketId);
    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to send reply");
      setTickets((prev) => prev.map((t) =>
        t.id === ticketId ? { ...t, messages: [...t.messages, data.message], status: "IN_PROGRESS" } : t
      ));
      setReplies((r) => ({ ...r, [ticketId]: "" }));
      toast({ title: "Reply sent!" });
    } catch {
      toast({ title: "Failed to send reply", variant: "destructive" });
    } finally {
      setLoading(null);
    }
  }

  async function updateStatus(ticketId: string, status: string) {
    await fetch(`/api/admin/tickets/${ticketId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setTickets((prev) => prev.map((t) => t.id === ticketId ? { ...t, status } : t));
    toast({ title: `Ticket marked as ${status}` });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Support Tickets</h1>
          <p className="text-white/40 text-sm">{tickets.length} total tickets</p>
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#111] border border-white/10 text-white/70 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500/50">
          {["ALL", "OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((s) => (
            <option key={s} value={s}>{s === "ALL" ? "All Tickets" : s.replace("_", " ")}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-white/30 border border-white/[0.06] rounded-xl">
          <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
          No tickets found
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((ticket) => (
            <div key={ticket.id} className="rounded-xl border border-white/[0.07] bg-[#111] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/[0.02]"
                onClick={() => setExpanded(expanded === ticket.id ? null : ticket.id)}>
                <div className="min-w-0">
                  <p className="font-medium text-white text-sm truncate">{ticket.subject}</p>
                  <p className="text-xs text-white/35 mt-0.5">
                    {ticket.user.name ?? ticket.user.email} · #{ticket.id.slice(-8).toUpperCase()} · {new Date(ticket.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                  <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${statusConfig[ticket.status]}`}>
                    {ticket.status.replace("_", " ")}
                  </span>
                  {expanded === ticket.id ? <ChevronUp className="h-4 w-4 text-white/30" /> : <ChevronDown className="h-4 w-4 text-white/30" />}
                </div>
              </div>

              {/* Expanded */}
              {expanded === ticket.id && (
                <div className="border-t border-white/[0.06] p-4 space-y-4">
                  {/* Messages */}
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {ticket.messages.map((msg: any) => (
                      <div key={msg.id} className={`flex gap-3 ${msg.isAdmin ? "flex-row-reverse" : ""}`}>
                        <div className={`h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${msg.isAdmin ? "bg-amber-500/20 text-amber-400" : "bg-white/10 text-white/60"}`}>
                          {msg.isAdmin ? "A" : "U"}
                        </div>
                        <div className={`rounded-xl p-3 text-sm max-w-[80%] ${msg.isAdmin ? "bg-amber-500/10 border border-amber-500/15 text-amber-100" : "bg-white/[0.05] text-white/80"}`}>
                          <p>{msg.message}</p>
                          <p className="text-xs opacity-40 mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply */}
                  <div className="flex gap-2">
                    <textarea
                      value={replies[ticket.id] ?? ""}
                      onChange={(e) => setReplies((r) => ({ ...r, [ticket.id]: e.target.value }))}
                      placeholder="Type your reply..."
                      rows={2}
                      className="flex-1 bg-[#0f0f0f] border border-white/10 text-white placeholder:text-white/25 rounded-xl px-3 py-2 text-sm resize-none focus:border-amber-500/50 focus:outline-none"
                    />
                    <Button onClick={() => sendReply(ticket.id)} disabled={loading === ticket.id || !replies[ticket.id]?.trim()}
                      className="bg-amber-500 hover:bg-amber-400 text-black font-semibold self-end">
                      {loading === ticket.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>

                  {/* Status actions */}
                  <div className="flex gap-2 flex-wrap">
                    {["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((s) => (
                      <button key={s} onClick={() => updateStatus(ticket.id, s)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                          ticket.status === s ? statusConfig[s] : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                        }`}>
                        {s.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
