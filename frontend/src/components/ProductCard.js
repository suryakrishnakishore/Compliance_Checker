import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export default function ProductCard({ item }) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">{item.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-32 object-cover rounded-md mb-3"
        />
        <div className="text-sm text-gray-700 space-y-1">
          <p>MRP: {item.mrp}</p>
          <p>Net Quantity: {item.quantity}</p>
          <p>Manufactured: {item.mfg}</p>
          <p>Expiry: {item.exp}</p>
        </div>
        <div className="mt-3 p-3 border rounded-md bg-red-50">
          <Badge variant="destructive">Violation Detected</Badge>
          <p className="text-sm mt-2">
            <strong>Rule ID:</strong> {item.ruleId} – {item.violation}
          </p>
          <p className="text-xs mt-1 text-gray-600">
            Inspector: {item.inspector}
          </p>
          <p className="text-xs text-gray-600">GPS: {item.gps}</p>
          <p className="text-xs text-gray-600">Timestamp: {item.date}</p>
        </div>
      </CardContent>
    </Card>
  );
}