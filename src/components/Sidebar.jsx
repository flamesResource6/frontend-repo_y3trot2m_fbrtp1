import { LogOut, User, ListChecks, PlusCircle } from "lucide-react";

export default function Sidebar({ onLogout, onNewLead, current }) {
  return (
    <aside className="h-screen w-64 bg-slate-900/80 border-r border-slate-800 backdrop-blur-sm fixed left-0 top-0 p-4 text-slate-200">
      <div className="mb-8">
        <div className="text-xl font-bold">Agency Dashboard</div>
        <div className="text-xs text-slate-400">Leads & Feedback</div>
      </div>

      <nav className="space-y-1">
        <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 ${current === 'leads' ? 'bg-slate-800' : ''}`}
          onClick={() => window.dispatchEvent(new CustomEvent('nav', { detail: 'leads' }))}>
          <ListChecks size={18} />
          <span>Leads</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800" onClick={onNewLead}>
          <PlusCircle size={18} />
          <span>Add Lead</span>
        </button>
      </nav>

      <div className="mt-auto absolute bottom-4 left-4 right-4">
        <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-slate-800/60 mb-2">
          <User size={18} />
          <span className="truncate">{localStorage.getItem('customer_name') || 'Customer'}</span>
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-red-600/90 hover:bg-red-600 text-white" onClick={onLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
