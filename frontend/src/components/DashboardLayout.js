import Sidebar from "./Sidebar";

export default function DashboardLayout({ children, currentPage, onNavigate }) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-cyan-50">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
