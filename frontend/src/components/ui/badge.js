export function Badge({ children, variant = "default" }) {
  const variants = {
    default: "bg-gray-200 text-gray-800",
    destructive: "bg-red-500 text-white",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded ${variants[variant]}`}>
      {children}
    </span>
  );
}