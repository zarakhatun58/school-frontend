export const Button = ({ children, className = "", ...props }) => (
  <button className={`bg-[#1a2246] hover:bg-blue-600 text-white px-4 text-sm py-2 rounded ${className}`} {...props}>
    {children}
  </button>
);
