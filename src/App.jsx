import { useEffect, useState } from "react";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import LeadTable from "./components/LeadTable";
import NewLeadModal from "./components/NewLeadModal";

function App() {
  const [authed, setAuthed] = useState(!!localStorage.getItem("token"));
  const [modalOpen, setModalOpen] = useState(false);
  const [route, setRoute] = useState("leads");

  useEffect(() => {
    const handler = (e) => setRoute(e.detail);
    window.addEventListener("nav", handler);
    return () => window.removeEventListener("nav", handler);
  }, []);

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

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
