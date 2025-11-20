import { LogOut, Shield } from "lucide-react";

export default function AdminPanel({ onLogout }) {
  const username = localStorage.getItem("admin_username") || "admin";
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Shield size={22} className="text-emerald-400" />
          <h1 className="text-2xl font-semibold">Admin Console</h1>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded">
          <LogOut size={18} /> Logout
        </button>
      </header>
      <section className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-medium mb-2">Welcome, {username}</h2>
        <p className="text-slate-300 text-sm">You're signed in with administrator privileges. From here, we can add controls to manage customers, leads, and feedback.</p>
      </section>
    </div>
  );
}
