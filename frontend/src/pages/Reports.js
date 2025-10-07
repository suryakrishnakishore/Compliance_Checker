import DashboardLayout from "../components/DashboardLayout";
import { Search, Calendar, Download, TrendingUp, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

export default function Reports({ onNavigate }) {
  const handleDownloadPDF = (report) => {
    const link = document.createElement('a');
    link.href = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    link.download = `${report.website.replace(/\s+/g, '_')}_Report.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const websiteReports = [
    {
      id: 1,
      website: "Amazon India",
      url: "amazon.in",
      totalProducts: 15,
      violations: 2,
      resolved: 0,
      lastScanned: "2025-10-05 14:32:00",
      violationRate: "7.1%",
      trend: "down",
      categories: ["Food & Beverages", "Personal Care", "Health Supplements"],
      topViolations: ["MRP mismatch", "Label errors", "Expiry date issues"],
    },
    {
      id: 2,
      website: "Flipkart",
      url: "flipkart.com",
      totalProducts: 14,
      violations: 2,
      resolved: 0,
      lastScanned: "2025-10-05 16:15:00",
      violationRate: "7.2%",
      trend: "up",
      categories: ["Groceries", "Beauty", "Wellness"],
      topViolations: ["Barcode issues", "Weight mismatch", "Packaging errors"],
    },
    {
      id: 3,
      website: "BigBasket",
      url: "bigbasket.com",
      totalProducts: 2145,
      violations: 112,
      resolved: 95,
      pending: 17,
      lastScanned: "2024-10-04 18:45:00",
      violationRate: "5.2%",
      trend: "down",
      categories: ["Fresh Produce", "Packaged Foods", "Dairy"],
      topViolations: ["Freshness date errors", "Origin mislabeling", "MRP issues"],
    },
    {
      id: 4,
      website: "JioMart",
      url: "jiomart.com",
      totalProducts: 1534,
      violations: 78,
      resolved: 61,
      pending: 17,
      lastScanned: "2024-10-05 11:20:00",
      violationRate: "5.1%",
      trend: "stable",
      categories: ["Staples", "Snacks", "Beverages"],
      topViolations: ["Quantity mismatch", "Label compliance", "Certification missing"],
    },
    {
      id: 5,
      website: "Blinkit",
      url: "blinkit.com",
      totalProducts: 678,
      violations: 45,
      resolved: 38,
      pending: 7,
      lastScanned: "2024-10-05 09:10:00",
      violationRate: "6.6%",
      trend: "down",
      categories: ["Quick Commerce", "Essentials", "Snacks"],
      topViolations: ["Storage temp display", "Expiry proximity", "Bundle pricing"],
    },
    {
      id: 6,
      website: "Zepto",
      url: "zepto.com",
      totalProducts: 523,
      violations: 32,
      resolved: 28,
      pending: 4,
      lastScanned: "2024-10-05 13:55:00",
      violationRate: "6.1%",
      trend: "down",
      categories: ["Fast Delivery", "Grocery", "Personal Care"],
      topViolations: ["MRP accuracy", "Product description", "Image mismatch"],
    },
  ];

  return (
    <DashboardLayout currentPage="Reports" onNavigate={onNavigate}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
          Compliance Reports
        </h1>
        <p className="text-slate-600">Generate and analyze website-wise compliance reports</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
            <Search className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-slate-800">Search Reports</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-3 pl-11 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none text-slate-700"
                placeholder="Select start date"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              End Date
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-3 pl-11 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none text-slate-700"
                placeholder="Select end date"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Website
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-3 pl-11 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none text-slate-700"
                placeholder="Search website..."
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="flex flex-row justify-center gap-2 items-center w-full">
            <Search className="w-4 h-4" />
            <p className="">Generate Reports</p>
          </Button>
          <Button variant="outline" className="flex flex-col items-center">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Websites Monitored</p>
              <p className="text-4xl font-bold text-emerald-700">2</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-xs text-emerald-700 font-medium">Active monitoring across e-commerce platforms</p>
        </div>

        <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-2xl p-6 border border-sky-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">Average Violation Rate</p>
              <p className="text-4xl font-bold text-sky-700">6.2%</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-xs text-sky-700 font-medium">Decreased by 1.3% from last month</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Website Reports</h2>
        <p className="text-slate-600 text-sm">Detailed compliance analysis for each platform</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {websiteReports.map((report) => (
          <Card key={report.id} className="group hover:scale-[1.01] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-slate-800">{report.website}</h3>
                        <a
                          href={`https://${report.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <p className="text-sm text-slate-500">{report.url}</p>
                    </div>
                    <Badge
                      variant={report.trend === "down" ? "success" : report.trend === "up" ? "warning" : "default"}
                      className="flex items-center gap-1"
                    >
                      <TrendingUp className={`w-3 h-3 ${report.trend === "down" ? "rotate-180" : ""}`} />
                      {report.trend}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">Total Products</p>
                      <p className="text-xl font-bold text-slate-800">{report.totalProducts.toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-lg p-3 border border-rose-200">
                      <p className="text-xs text-rose-600 mb-1">Violations</p>
                      <p className="text-xl font-bold text-rose-700">{report.violations}</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-200">
                      <p className="text-xs text-emerald-600 mb-1">Resolved</p>
                      <p className="text-xl font-bold text-emerald-700">{report.resolved}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Violation Rate:</span>
                      <span className="text-sm font-semibold text-slate-800">{report.violationRate}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                        style={{ width: `${100 - parseFloat(report.violationRate)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-80 space-y-4">
                  <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-xl p-4 border border-sky-200">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-sky-600" />
                      <h4 className="text-sm font-semibold text-slate-800">Top Violations</h4>
                    </div>
                    <div className="space-y-2">
                      {report.topViolations.map((violation, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                          <span className="text-xs text-slate-700">{violation}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-200">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-4 h-4 text-violet-600" />
                      <h4 className="text-sm font-semibold text-slate-800">Categories Monitored</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {report.categories.map((category, index) => (
                        <Badge key={index} variant="default" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                    <p className="text-xs text-slate-500 mb-1">Last Scanned</p>
                    <p className="text-sm font-medium text-slate-700">{report.lastScanned}</p>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full flex flex-row justify-center gap-2 items-center"
                    onClick={() => handleDownloadPDF(report)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
