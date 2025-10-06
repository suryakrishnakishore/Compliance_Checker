import { Button } from "./ui/button";
import ProductCard from "./ProductCard";

export default function ProductSection({ section }) {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">{section.platform}</h3>
        <Button variant="link" className="text-blue-600">
          See All
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {section.items.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}