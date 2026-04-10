"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string; name: string; category: string; description: string;
  rate: number; minQuantity: number; maxQuantity: number; isActive: boolean;
}

const emptyForm = { name: "", category: "", description: "", rate: 0, minQuantity: 100, maxQuantity: 100000, isActive: true };

export function AdminServicesClient({ services: initial }: { services: Service[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [services, setServices] = useState(initial);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  function openCreate() { setEditing(null); setForm(emptyForm); setModalOpen(true); }
  function openEdit(s: Service) {
    setEditing(s);
    setForm({ name: s.name, category: s.category, description: s.description, rate: s.rate, minQuantity: s.minQuantity, maxQuantity: s.maxQuantity, isActive: s.isActive });
    setModalOpen(true);
  }

  async function handleSave() {
    setLoading(true);
    const url = editing ? `/api/admin/services/${editing.id}` : "/api/admin/services";
    const method = editing ? "PATCH" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { toast({ title: "Error", description: data.error, variant: "destructive" }); return; }
    toast({ title: editing ? "Service updated" : "Service created" });
    setModalOpen(false);
    router.refresh();
    if (editing) setServices(services.map((s) => s.id === editing.id ? data.service : s));
    else setServices([data.service, ...services]);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this service?")) return;
    const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    if (res.ok) { setServices(services.filter((s) => s.id !== id)); toast({ title: "Service deleted" }); }
  }

  const field = (key: keyof typeof form, label: string, type = "text") => (
    <div key={key}>
      <Label className="text-white/60 text-sm mb-1.5 block">{label}</Label>
      <Input
        type={type}
        value={String(form[key])}
        onChange={(e) => setForm({ ...form, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
        className="bg-[#0f0f0f] border-white/10 text-white h-10 focus:border-amber-500/40"
      />
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Services</h1>
          <p className="text-white/40 text-sm">{services.length} total</p>
        </div>
        <Button onClick={openCreate} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">
          <Plus className="h-4 w-4 mr-1.5" /> Add Service
        </Button>
      </div>

      <div className="rounded-xl border border-white/[0.07] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.02] border-b border-white/[0.07]">
            <tr className="text-white/35 text-xs uppercase tracking-wider">
              {["Name", "Category", "Rate/1K", "Min", "Max", "Status", ""].map((h) => (
                <th key={h} className="text-left py-3 px-4 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                <td className="py-3 px-4 text-xs text-white font-medium max-w-[200px] truncate">{s.name}</td>
                <td className="py-3 px-4 text-xs text-white/50">{s.category}</td>
                <td className="py-3 px-4 text-xs text-amber-400 font-semibold">${s.rate}</td>
                <td className="py-3 px-4 text-xs text-white/40">{s.minQuantity.toLocaleString()}</td>
                <td className="py-3 px-4 text-xs text-white/40">{s.maxQuantity.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${s.isActive ? "text-green-400 bg-green-500/10 border border-green-500/20" : "text-red-400 bg-red-500/10 border border-red-500/20"}`}>
                    {s.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg text-white/30 hover:text-blue-400 hover:bg-blue-500/10 transition-all">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#111] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold text-white">{editing ? "Edit" : "New"} Service</h2>
              <button onClick={() => setModalOpen(false)} className="text-white/30 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              {field("name", "Name")}
              {field("category", "Category")}
              <div>
                <Label className="text-white/60 text-sm mb-1.5 block">Description</Label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full bg-[#0f0f0f] border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500/40 resize-none"
                />
              </div>
              {field("rate", "Rate per 1K ($)", "number")}
              <div className="grid grid-cols-2 gap-3">
                {field("minQuantity", "Min Quantity", "number")}
                {field("maxQuantity", "Max Quantity", "number")}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                <span className="text-sm text-white/60">Active (visible to users)</span>
              </label>
            </div>
            <Button onClick={handleSave} disabled={loading} className="w-full mt-5 bg-amber-500 hover:bg-amber-400 text-black font-bold h-10">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Check className="h-4 w-4 mr-1.5" /> {editing ? "Save Changes" : "Create Service"}</>}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
