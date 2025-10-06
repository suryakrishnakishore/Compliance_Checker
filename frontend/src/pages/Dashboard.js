import DashboardLayout from "../components/DashboardLayout";
import ProductSection from "../components/ProductSection";

export default function Dashboard() {
  const products = [
    {
      platform: "Amazon",
      items: [
        {
          id: 1,
          name: "Beef Masala Pack",
          mrp: "₹199.00",
          quantity: "200 ml",
          mfg: "JAN 2024",
          exp: "DEC 2025",
          violation: "MRP mismatch",
          ruleId: "42",
          inspector: "A Sharma",
          gps: "28.6159°N 77.200°E",
          date: "2024-10-26 15:45:12",
          image: "/product1.jpg",
        },
        {
          id: 2,
          name: "Spice Mix Pouch",
          mrp: "₹149.00",
          quantity: "100 g",
          mfg: "FEB 2024",
          exp: "NOV 2025",
          violation: "Label error",
          ruleId: "18",
          inspector: "R Verma",
          gps: "27.8910°N 78.089°E",
          date: "2024-09-22 14:33:10",
          image: "/product2.jpg",
        },
      ],
    },
    {
      platform: "Flipkart",
      items: [
        {
          id: 3,
          name: "Snack Pouch",
          mrp: "₹99.00",
          quantity: "150 g",
          mfg: "MAR 2024",
          exp: "JAN 2026",
          violation: "Expiry date mismatch",
          ruleId: "27",
          inspector: "K Patel",
          gps: "26.501°N 80.391°E",
          date: "2024-08-12 11:21:05",
          image: "/product3.jpg",
        },
        {
          id: 4,
          name: "Energy Drink Can",
          mrp: "₹75.00",
          quantity: "250 ml",
          mfg: "APR 2024",
          exp: "JAN 2025",
          violation: "Barcode unreadable",
          ruleId: "33",
          inspector: "N Singh",
          gps: "25.324°N 82.973°E",
          date: "2024-09-10 16:12:45",
          image: "/product4.jpg",
        },
      ],
    },
  ];

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-6">Flagged Product Dashboard</h2>
      {products.map((section) => (
        <ProductSection key={section.platform} section={section} />
      ))}
    </DashboardLayout>
  );
}