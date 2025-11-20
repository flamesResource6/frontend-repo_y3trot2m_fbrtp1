import { useState } from "react";

export default function NewLeadModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("");
  const backend = import.meta.env.VITE_BACKEND_URL;

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backend}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, email, phone, source }),
      });
      if (!res.ok) throw new Error("Failed to create lead");
      onClose();
      window.dispatchEvent(new Event("refresh-leads"));
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={submit} className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md text-slate-200">
        <div className="text-lg font-semibold mb-4">New Lead</div>
        <div className="space-y-3">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" required />
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" />
          <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone" className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" />
          <input value={source} onChange={(e)=>setSource(e.target.value)} placeholder="Source" className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" />
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-2 rounded bg-slate-800">Cancel</button>
          <button className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white">Create</button>
        </div>
      </form>
    </div>
  );
}
