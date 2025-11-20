import { useState } from "react";

export default function AdminLogin({ onLogin, onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const backend = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${backend}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_id", data.admin_id);
      localStorage.setItem("admin_username", data.username);
      onLogin();
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-xl w-full max-w-sm text-slate-200">
        <h2 className="text-xl font-semibold mb-2">Admin Login</h2>
        <p className="text-xs text-slate-400 mb-4">Use your administrator credentials.</p>
        <label className="block text-sm mb-1">Username</label>
        <input className="w-full mb-3 px-3 py-2 bg-slate-800 rounded border border-slate-700 focus:outline-none" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label className="block text-sm mb-1">Password</label>
        <input className="w-full mb-4 px-3 py-2 bg-slate-800 rounded border border-slate-700 focus:outline-none" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <div className="text-red-400 text-sm mb-3">{error}</div>}
        <button disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-2 rounded">
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <button type="button" onClick={onBack} className="w-full mt-3 text-slate-300 hover:text-white text-sm">Back to customer login</button>
      </form>
    </div>
  );
}
