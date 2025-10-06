import DashboardLayout from "../components/DashboardLayout";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { User, MapPin, Award, Clock, TrendingUp, Search, Filter, Mail, Phone } from "lucide-react";

export default function Inspectors({ onNavigate }) {
  const inspectors = [
    {
      id: 1,
      name: "A Sharma",
      email: "a.sharma@neco.gov.in",
      phone: "+91 98765 43210",
      region: "North Delhi",
      zone: "Zone A",
      totalInspections: 342,
      violationsFound: 89,
      activeCase: 12,
      resolved: 77,
      efficiency: "94%",
      rating: 4.8,
      status: "active",
      lastActive: "2 mins ago",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    {
      id: 2,
      name: "R Verma",
      email: "r.verma@neco.gov.in",
      phone: "+91 98765 43211",
      region: "South Delhi",
      zone: "Zone B",
      totalInspections: 298,
      violationsFound: 64,
      activeCase: 8,
      resolved: 56,
      efficiency: "91%",
      rating: 4.6,
      status: "active",
      lastActive: "15 mins ago",
      avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    {
      id: 3,
      name: "K Patel",
      email: "k.patel@neco.gov.in",
      phone: "+91 98765 43212",
      region: "West Delhi",
      zone: "Zone C",
      totalInspections: 415,
      violationsFound: 112,
      activeCase: 15,
      resolved: 97,
      efficiency: "96%",
      rating: 4.9,
      status: "active",
      lastActive: "5 mins ago",
      avatar: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    {
      id: 4,
      name: "N Singh",
      email: "n.singh@neco.gov.in",
      phone: "+91 98765 43213",
      region: "East Delhi",
      zone: "Zone D",
      totalInspections: 267,
      violationsFound: 78,
      activeCase: 10,
      resolved: 68,
      efficiency: "89%",
      rating: 4.5,
      status: "inactive",
      lastActive: "2 hours ago",
      avatar: "https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    {
      id: 5,
      name: "M Kumar",
      email: "m.kumar@neco.gov.in",
      phone: "+91 98765 43214",
      region: "Central Delhi",
      zone: "Zone E",
      totalInspections: 389,
      violationsFound: 95,
      activeCase: 14,
      resolved: 81,
      efficiency: "93%",
      rating: 4.7,
      status: "active",
      lastActive: "30 mins ago",
      avatar: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    {
      id: 6,
      name: "P Reddy",
      email: "p.reddy@neco.gov.in",
      phone: "+91 98765 43215",
      region: "Noida",
      zone: "Zone F",
      totalInspections: 324,
      violationsFound: 87,
      activeCase: 11,
      resolved: 76,
      efficiency: "92%",
      rating: 4.6,
      status: "active",
      lastActive: "1 hour ago",
      avatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
  ];

  const stats = [
    {
      title: "Total Inspectors",
      value: "28",
      change: "+3",
      icon: User,
      gradient: "from-emerald-500 to-teal-500",
      bg: "from-emerald-50 to-teal-50",
    },
    {
      title: "Active Now",
      value: "24",
      change: "86%",
      icon: TrendingUp,
      gradient: "from-sky-500 to-blue-500",
      bg: "from-sky-50 to-blue-50",
    },
    {
      title: "Avg Efficiency",
      value: "92.5%",
      change: "+2.3%",
      icon: Award,
      gradient: "from-violet-500 to-purple-500",
      bg: "from-violet-50 to-purple-50",
    },
    {
      title: "Total Inspections",
      value: "2,035",
      change: "+156",
      icon: Clock,
      gradient: "from-amber-500 to-orange-500",
      bg: "from-amber-50 to-orange-50",
    },
  ];

  return (
    <DashboardLayout currentPage="Inspectors" onNavigate={onNavigate}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
          Inspector Management
        </h1>
        <p className="text-slate-600">Monitor and manage field inspectors</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full px-4 py-3 pl-11 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none text-slate-700"
              placeholder="Search inspectors by name, region, or zone..."
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`bg-gradient-to-r ${stat.bg} rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                  {stat.change}
                </span>
              </div>
              <p className="text-slate-600 text-sm mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Inspector Directory</h2>
        <p className="text-slate-600 text-sm">View detailed profiles and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {inspectors.map((inspector) => (
          <Card key={inspector.id} className="group hover:scale-[1.01] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative">
                  <img
                    src={inspector.avatar}
                    alt={inspector.name}
                    className="w-20 h-20 rounded-xl object-cover shadow-md"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                    inspector.status === "active" ? "bg-emerald-500" : "bg-slate-400"
                  }`}></div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{inspector.name}</h3>
                      <p className="text-sm text-slate-500">{inspector.zone} • {inspector.region}</p>
                    </div>
                    <Badge variant={inspector.status === "active" ? "success" : "default"}>
                      {inspector.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {inspector.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {inspector.phone}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Last active: {inspector.lastActive}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-2 border border-slate-200 text-center">
                      <p className="text-xs text-slate-500 mb-0.5">Total</p>
                      <p className="text-sm font-bold text-slate-800">{inspector.totalInspections}</p>
                    </div>
                    <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-lg p-2 border border-rose-200 text-center">
                      <p className="text-xs text-rose-600 mb-0.5">Found</p>
                      <p className="text-sm font-bold text-rose-700">{inspector.violationsFound}</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-2 border border-amber-200 text-center">
                      <p className="text-xs text-amber-600 mb-0.5">Active</p>
                      <p className="text-sm font-bold text-amber-700">{inspector.activeCase}</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-2 border border-emerald-200 text-center">
                      <p className="text-xs text-emerald-600 mb-0.5">Resolved</p>
                      <p className="text-sm font-bold text-emerald-700">{inspector.resolved}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-semibold text-slate-700">Rating: {inspector.rating}/5</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-semibold text-emerald-700">{inspector.efficiency} Efficiency</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
