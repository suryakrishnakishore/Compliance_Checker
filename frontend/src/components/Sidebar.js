import { Button } from "./ui/button";
import { LayoutDashboard, FileText, Users, BarChart3, Settings, LogOut } from "lucide-react";

export default function Sidebar({ currentPage, onNavigate }) {
  const sidebarOptions = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Reports", icon: FileText },
    { name: "Inspectors", icon: Users },
    { name: "Analytics", icon: BarChart3 },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-slate-50 to-sky-50 border-r border-slate-200 p-6 flex flex-col shadow-sm">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            CerebroTech
          </h1>
        </div>
        <p className="text-xs text-slate-500 ml-13 pl-0.5">Product Compliance System</p>
      </div>

      <nav className="space-y-2 flex-1">
        {sidebarOptions.map((option) => {
          const Icon = option.icon;
          const isActive = currentPage === option.name;
          return (
            <Button
              key={option.name}
              variant="ghost"
              onClick={() => onNavigate(option.name)} 
              className={`w-full justify-start text-left group ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
                  : "text-slate-700"
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-white" : "text-slate-400 group-hover:text-emerald-500"} transition-colors`} />
              <span className="font-medium">{option.name}</span>
            </Button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="bg-gradient-to-r from-sky-100 to-cyan-100 rounded-xl p-4 border border-sky-200">
          <p className="text-xs font-semibold text-slate-700 mb-1">Need Help?</p>
          <p className="text-xs text-slate-600">Contact support team</p>
        </div>

        <Button className="w-full" variant="outline">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
