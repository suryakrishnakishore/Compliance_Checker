import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Inspectors from "./pages/Inspectors";
import Analytics from "./pages/Analytics";

export default function App() {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return <Dashboard onNavigate={handleNavigate} />;
      case "Reports":
        return <Reports onNavigate={handleNavigate} />;
      case "Inspectors":
        return <Inspectors onNavigate={handleNavigate} />;
      case "Analytics":
        return <Analytics onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return <>{renderPage()}</>;
}
