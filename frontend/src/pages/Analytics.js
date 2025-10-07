import DashboardLayout from "../components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, BarChart3, PieChart, Calendar, Download } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Analytics({ onNavigate }) {
  const kpiCards = [
    {
      title: "Total Violations (This Month)",
      value: "4",
      change: "+12.5%",
      trend: "up",
      icon: AlertTriangle,
      gradient: "from-rose-500 to-red-500",
      bg: "from-rose-50 to-red-50",
      description: "Compared to last month",
    },
    {
      title: "Resolution Rate",
      value: "87.3%",
      change: "+5.2%",
      trend: "up",
      icon: CheckCircle,
      gradient: "from-emerald-500 to-teal-500",
      bg: "from-emerald-50 to-teal-50",
      description: "Average resolution time: 4.2 days",
    },
    
    {
      title: "Compliance Score",
      value: "92.4%",
      change: "+3.1%",
      trend: "up",
      icon: BarChart3,
      gradient: "from-violet-500 to-purple-500",
      bg: "from-violet-50 to-purple-50",
      description: "Industry average: 85%",
    },
  ];

  const violationTrends = [
    { month: "Jan", violations: 98, resolved: 89 },
    { month: "Feb", violations: 112, resolved: 95 },
    { month: "Mar", violations: 105, resolved: 98 },
    { month: "Apr", violations: 128, resolved: 110 },
    { month: "May", violations: 134, resolved: 118 },
    { month: "Jun", violations: 147, resolved: 128 },
  ];

  const categoryBreakdown = [
    { category: "MRP Violations", count: 342, percentage: 27.4, color: "from-rose-500 to-red-500" },
    { category: "Label Errors", count: 289, percentage: 23.2, color: "from-amber-500 to-orange-500" },
    { category: "Expiry Issues", count: 234, percentage: 18.8, color: "from-sky-500 to-blue-500" },
    { category: "Weight Mismatch", count: 187, percentage: 15.0, color: "from-emerald-500 to-teal-500" },
    { category: "Barcode Problems", count: 145, percentage: 11.6, color: "from-violet-500 to-purple-500" },
    { category: "Others", count: 50, percentage: 4.0, color: "from-slate-400 to-slate-500" },
  ];

  const platformPerformance = [
    { platform: "Amazon India", violations: 342, complianceRate: 92.6, trend: "up", color: "amber" },
    { platform: "Flipkart", violations: 289, complianceRate: 93.2, trend: "up", color: "blue" },
    { platform: "BigBasket", violations: 234, complianceRate: 94.8, trend: "up", color: "emerald" },
    { platform: "JioMart", violations: 187, complianceRate: 94.9, trend: "stable", color: "violet" },
    { platform: "Blinkit", violations: 145, complianceRate: 93.4, trend: "down", color: "rose" },
    { platform: "Zepto", violations: 50, complianceRate: 93.9, trend: "up", color: "sky" },
  ];

  const topInspectors = [
    { name: "K Patel", inspections: 415, efficiency: 96, violations: 112 },
    { name: "M Kumar", inspections: 389, efficiency: 93, violations: 95 },
    { name: "A Sharma", inspections: 342, efficiency: 94, violations: 89 },
    { name: "P Reddy", inspections: 324, efficiency: 92, violations: 87 },
    { name: "R Verma", inspections: 298, efficiency: 91, violations: 64 },
  ];

  const maxViolationValue = Math.max(...violationTrends.map(item => item.violations));

  return (
    <DashboardLayout currentPage="Analytics" onNavigate={onNavigate}>
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-slate-600">Comprehensive insights and performance metrics</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-slate-800">Date Range</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="default" className="text-sm">Last 7 Days</Button>
          <Button variant="outline" className="text-sm">Last 30 Days</Button>
          <Button variant="outline" className="text-sm">Last Quarter</Button>
          <Button variant="outline" className="text-sm">Last Year</Button>
          <Button variant="outline" className="text-sm">Custom Range</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="hover:scale-[1.02] transition-all duration-300">
              <CardContent className={`p-6 bg-gradient-to-r ${kpi.bg}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant={kpi.trend === "up" && kpi.title.includes("Violations") ? "destructive" : "success"}>
                    {kpi.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {kpi.change}
                  </Badge>
                </div>
                <p className="text-slate-600 text-sm mb-1">{kpi.title}</p>
                <p className="text-3xl font-bold text-slate-800 mb-2">{kpi.value}</p>
                <p className="text-xs text-slate-500">{kpi.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                Violation Trends
              </CardTitle>
              <Badge variant="default">6 Months</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {violationTrends.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{item.month}</span>
                    <div className="flex gap-4">
                      <span className="text-rose-600">
                        <span className="text-xs">V:</span> {item.violations}
                      </span>
                      <span className="text-emerald-600">
                        <span className="text-xs">R:</span> {item.resolved}
                      </span>
                    </div>
                  </div>
                  <div className="relative h-8 bg-slate-100 rounded-lg overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-rose-400 to-red-400 rounded-lg transition-all duration-500"
                      style={{ width: `${(item.violations / maxViolationValue) * 100}%` }}
                    ></div>
                    <div
                      className="absolute h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg transition-all duration-500 opacity-80"
                      style={{ width: `${(item.resolved / maxViolationValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gradient-to-r from-rose-400 to-red-400"></div>
                <span className="text-xs text-slate-600">Violations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gradient-to-r from-emerald-400 to-teal-400"></div>
                <span className="text-xs text-slate-600">Resolved</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-emerald-600" />
              Violation Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryBreakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600">{item.count}</span>
                      <Badge variant="default" className="text-xs">{item.percentage}%</Badge>
                    </div>
                  </div>
                  <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`absolute h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformPerformance.map((platform, index) => (
                <div key={index} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-slate-800">{platform.platform}</h4>
                      <p className="text-xs text-slate-500 mt-1">{platform.violations} violations detected</p>
                    </div>
                    <Badge variant={platform.trend === "up" ? "success" : platform.trend === "down" ? "warning" : "default"}>
                      {platform.trend}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Compliance Rate</span>
                      <span className="font-semibold text-emerald-700">{platform.complianceRate}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                        style={{ width: `${platform.complianceRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Inspectors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topInspectors.map((inspector, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gradient-to-r from-sky-50 to-cyan-50 rounded-xl border border-sky-200">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold shadow-lg">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800">{inspector.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-600">
                        {inspector.inspections} inspections
                      </span>
                      <span className="text-xs text-emerald-600 font-semibold">
                        {inspector.efficiency}% efficiency
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Violations</p>
                    <p className="text-lg font-bold text-rose-600">{inspector.violations}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
