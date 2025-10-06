import { Button } from "./ui/button";

export default function Sidebar() {
  const sidebarOptions = [
    "Dashboard",
    "Flagged Items",
    "Reports",
    "Inspectors",
    "Analytics",
    "Settings",
  ];

  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col">
      <h1 className="text-2xl font-semibold mb-6">NECO Utility</h1>
      <nav className="space-y-3 flex-1">
        {sidebarOptions.map((option) => (
          <Button
            key={option}
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-gray-100"
          >
            {option}
          </Button>
        ))}
      </nav>
      <Button className="mt-auto w-full" variant="outline">
        Logout
      </Button>
    </aside>
  );
}