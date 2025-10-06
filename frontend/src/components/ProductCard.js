import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertTriangle, Calendar, MapPin, User, Package } from "lucide-react";

export default function ProductCard({ item }) {
  return (
    <Card className="group hover:scale-[1.02] transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg flex items-start justify-between">
          <span className="flex-1">{item.name}</span>
          <Package className="w-5 h-5 text-emerald-500 flex-shrink-0 ml-2" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4 rounded-xl overflow-hidden shadow-md">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="default" className="bg-white/90 backdrop-blur-sm">
              ID: {item.id}
            </Badge>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-100">
              <p className="text-xs text-slate-500 mb-1">MRP</p>
              <p className="text-sm font-semibold text-emerald-700">{item.mrp}</p>
            </div>
            <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-lg p-3 border border-sky-100">
              <p className="text-xs text-slate-500 mb-1">Net Quantity</p>
              <p className="text-sm font-semibold text-sky-700">{item.quantity}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-3 border border-slate-200">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-slate-500">Manufactured</p>
                <p className="font-medium text-slate-700 mt-0.5">{item.mfg}</p>
              </div>
              <div>
                <p className="text-slate-500">Expiry</p>
                <p className="font-medium text-slate-700 mt-0.5">{item.exp}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-rose-50 to-red-50 rounded-xl p-4 border-2 border-rose-200 shadow-sm">
          <div className="flex items-start gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <Badge variant="destructive" className="mb-2">
                Violation Detected
              </Badge>
              <p className="text-sm font-semibold text-rose-800">
                Rule ID: {item.ruleId}
              </p>
              <p className="text-sm text-rose-700 mt-1">{item.violation}</p>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-rose-200">
            <div className="flex items-center text-xs text-rose-700">
              <User className="w-3.5 h-3.5 mr-2 text-rose-500" />
              <span className="font-medium">Inspector:</span>
              <span className="ml-1">{item.inspector}</span>
            </div>
            <div className="flex items-center text-xs text-rose-700">
              <MapPin className="w-3.5 h-3.5 mr-2 text-rose-500" />
              <span className="font-medium">GPS:</span>
              <span className="ml-1">{item.gps}</span>
            </div>
            <div className="flex items-center text-xs text-rose-700">
              <Calendar className="w-3.5 h-3.5 mr-2 text-rose-500" />
              <span className="font-medium">Timestamp:</span>
              <span className="ml-1">{item.date}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
