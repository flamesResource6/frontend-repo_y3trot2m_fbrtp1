import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const backend = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${backend}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("customer_id", data.customer_id);
      localStorage.setItem("customer_name", data.name);
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
        <h2 className="text-xl font-semibold mb-4">Customer Login</h2>
        <label className="block text-sm mb-1">Email</label>
        <input className="w-full mb-3 px-3 py-2 bg-slate-800 rounded border border-slate-700 focus:outline-none" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label className="block text-sm mb-1">Password</label>
        <input className="w-full mb-4 px-3 py-2 bg-slate-800 rounded border border-slate-700 focus:outline-none" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <div className="text-red-400 text-sm mb-3">{error}</div>}
        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-2 rounded">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
