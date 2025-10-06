export function Button({ children, variant = "default", className = "", ...props }) {
  const base =
    "px-4 py-2 rounded-md font-medium transition-all focus:outline-none";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    ghost: "text-gray-700 hover:bg-gray-100",
    link: "text-blue-600 underline-offset-2 hover:underline",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}