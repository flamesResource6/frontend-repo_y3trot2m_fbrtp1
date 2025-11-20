import { useEffect, useState } from "react";

export default function LeadTable() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const backend = import.meta.env.VITE_BACKEND_URL;

  const fetchLeads = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${backend}/leads`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to load leads");
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    const handler = () => fetchLeads();
    window.addEventListener("refresh-leads", handler);
    return () => window.removeEventListener("refresh-leads", handler);
  }, []);

  const submitFeedback = async (leadId, payload) => {
    try {
      const res = await fetch(`${backend}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ lead_id: leadId, ...payload }),
      });
      if (!res.ok) throw new Error("Failed to submit feedback");
      window.dispatchEvent(new Event("refresh-leads"));
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading) return <div className="p-6 text-slate-300">Loading leads...</div>;
  if (error) return <div className="p-6 text-red-400">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-slate-200 mb-4">Leads</h2>
      <div className="overflow-x-auto border border-slate-800 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">Source</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-t border-slate-800">
                <td className="p-3 text-slate-200">{lead.name}</td>
                <td className="p-3 text-slate-300">{lead.email || "-"}</td>
                <td className="p-3 text-slate-300">{lead.phone || "-"}</td>
                <td className="p-3 text-slate-300">{lead.source || "-"}</td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">{lead.status}</span>
                </td>
                <td className="p-3">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target;
                      const rating = form.rating.value ? parseInt(form.rating.value) : undefined;
                      const disposition = form.disposition.value || undefined;
                      const comment = form.comment.value || undefined;
                      submitFeedback(lead._id, { rating, disposition, comment });
                      form.reset();
                    }}
                    className="flex items-center gap-2"
                  >
                    <select name="rating" className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200">
                      <option value="">Rating</option>
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                    <select name="disposition" className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200">
                      <option value="">Disposition</option>
                      <option value="qualified">Qualified</option>
                      <option value="unqualified">Unqualified</option>
                      <option value="follow_up">Follow up</option>
                      <option value="wrong_number">Wrong number</option>
                      <option value="no_response">No response</option>
                    </select>
                    <input name="comment" placeholder="Comment" className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 w-48" />
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded">Save</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
