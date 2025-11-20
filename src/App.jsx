import { useEffect, useState } from "react";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import LeadTable from "./components/LeadTable";
import NewLeadModal from "./components/NewLeadModal";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [authed, setAuthed] = useState(!!localStorage.getItem("token"));
  const [adminAuthed, setAdminAuthed] = useState(!!localStorage.getItem("admin_token"));
  const [modalOpen, setModalOpen] = useState(false);
  const [route, setRoute] = useState("leads");
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    const handler = (e) => setRoute(e.detail);
    window.addEventListener("nav", handler);
    return () => window.removeEventListener("nav", handler);
  }, []);

  if (showAdminLogin && !adminAuthed) {
    return <AdminLogin onLogin={() => setAdminAuthed(true)} onBack={() => setShowAdminLogin(false)} />;
  }

  if (!authed && !adminAuthed) {
    return (
      <div>
        <Login onLogin={() => setAuthed(true)} />
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
          <button onClick={() => setShowAdminLogin(true)} className="text-xs text-slate-300 hover:text-white underline">
            Admin login
          </button>
        </div>
      </div>
    );
  }

  if (adminAuthed) {
    return <AdminPanel onLogout={() => { localStorage.removeItem("admin_token"); localStorage.removeItem("admin_id"); localStorage.removeItem("admin_username"); setAdminAuthed(false); }} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Sidebar onLogout={() => { localStorage.clear(); setAuthed(false); }} onNewLead={() => setModalOpen(true)} current={route} />
      <main className="ml-64">
        {route === "leads" && <LeadTable />}
      </main>
      <NewLeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default App;
