export function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-lg border ${className}`}>{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="p-4 border-b">{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h3 className={`font-semibold text-lg ${className}`}>{children}</h3>;
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}