import { Button } from "./ui/button";
import ProductCard from "./ProductCard";
import { ShoppingCart, ChevronRight } from "lucide-react";

export default function ProductSection({ section }) {
  const platformColors = {
    Amazon: "from-amber-500 to-orange-500",
    Flipkart: "from-sky-500 to-blue-500",
  };

  const platformBgColors = {
    Amazon: "from-amber-50 to-orange-50",
    Flipkart: "from-orange-50 to-pink-50",
  };

  return (
    <div className="mb-12">
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        <div className={`flex justify-between items-center p-6 bg-gradient-to-r ${platformBgColors[section.platform]} border-b border-slate-200`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platformColors[section.platform]} flex items-center justify-center shadow-lg`}>
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">{section.platform}</h3>
              <p className="text-sm text-slate-600">{section.items.length} flagged products</p>
            </div>
          </div>
          <Button variant="link" className="group">
            <span className="text-base font-semibold">See All</span>
            <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {section.items.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
