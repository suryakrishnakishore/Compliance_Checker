import DashboardLayout from "../components/DashboardLayout";
import ProductSection from "../components/ProductSection";
import { TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";

export default function Dashboard({ onNavigate }) {
  const products = [
    {
      platform: "Amazon",
      items: [
        {
          id: 1,
          name: "Oreo Biscuit Pack",
          mrp: "₹199.00",
          quantity: "200 ml",
          mfg: "JAN 2024",
          exp: "DEC 2025",
          violation: "MRP mismatch",
          ruleId: "42",
          inspector: "A Sharma",
          gps: "28.6159°N 77.200°E",
          date: "2024-10-26 15:45:12",
          image: "https://m.media-amazon.com/images/I/61VMo0FAcHL._SL1100_.jpg",
        },
        {
          id: 2,
          name: "Dark Fantasy Choco Fills",
          mrp: "₹149.00",
          quantity: "100 g",
          mfg: "FEB 2024",
          exp: "NOV 2025",
          violation: "Label error",
          ruleId: "18",
          inspector: "R Verma",
          gps: "27.8910°N 78.089°E",
          date: "2024-09-22 14:33:10",
          image: "https://m.media-amazon.com/images/I/91nkpo2PEBL._SL1500_.jpg",
        },
      ],
    },
    {
      platform: "Flipkart",
      items: [
        {
          id: 3,
          name: "Eclairs Chocolates Pack",
          mrp: "₹99.00",
          quantity: "150 g",
          mfg: "MAR 2024",
          exp: "JAN 2026",
          violation: "Expiry date mismatch",
          ruleId: "27",
          inspector: "K Patel",
          gps: "26.501°N 80.391°E",
          date: "2024-08-12 11:21:05",
          image: "https://m.media-amazon.com/images/I/61gj7rZRRRL._SL1100_.jpg",
        },
        {
          id: 4,
          name: "Munch Chocolates Pack of 50",
          mrp: "₹75.00",
          quantity: "250 ml",
          mfg: "APR 2024",
          exp: "JAN 2025",
          violation: "Barcode unreadable",
          ruleId: "33",
          inspector: "N Singh",
          gps: "25.324°N 82.973°E",
          date: "2024-09-10 16:12:45",
          image: "https://m.media-amazon.com/images/I/815VO6AfMWL._SL1500_.jpg",
        },
      ],
    },
  ];

  const stats = [
    {
      title: "Total Violations",
      value: "4",
      change: "+12%",
      icon: AlertCircle,
      gradient: "from-rose-500 to-red-500",
      bg: "from-rose-50 to-red-50",
    },
    {
      title: "Resolved",
      value: "0",
      change: "+8%",
      icon: CheckCircle,
      gradient: "from-emerald-500 to-teal-500",
      bg: "from-emerald-50 to-teal-50",
    },
    {
      title: "Active Inspectors",
      value: "6",
      change: "+3%",
      icon: TrendingUp,
      gradient: "from-sky-500 to-blue-500",
      bg: "from-purple-50 to-fuchsia-50",
    },
  ];

  return (
    <DashboardLayout currentPage="Dashboard" onNavigate={onNavigate}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
          Flagged Product Dashboard
        </h1>
        <p className="text-slate-600">Monitor and manage product compliance violations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  stat.change.startsWith('+')
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-rose-100 text-rose-700'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-slate-600 text-sm mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {products.map((section) => (
        <ProductSection key={section.platform} section={section} />
      ))}
    </DashboardLayout>
  );
}
