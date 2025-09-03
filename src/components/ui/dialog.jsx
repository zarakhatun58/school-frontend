
import { useRef } from "react";
import React from "react";
export const Dialog = ({ children, open, onOpenChange }) => {
  const contentRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      onOpenChange(false); 
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-sm"
      onClick={handleOverlayClick}
    >
      {children && typeof children.type !== "undefined"
        ? React.cloneElement(children, { ref: contentRef })
        : children}
    </div>
  );
};

export const DialogTrigger = ({ children, onClick }) => <div onClick={onClick}>{children}</div>;

export const DialogContent = React.forwardRef(({ children, className = "" }, ref) => (
  <div
    ref={ref}
    className={`bg-white p-6 rounded shadow max-w-md w-full mx-4 sm:mx-auto text-sm ${className}`}
  >
    {children}
  </div>
));

export const DialogHeader = ({ children }) => <div className="mb-4 text-sm">{children}</div>;
export const DialogTitle = ({ children }) => <h2 className="text-xl font-bold">{children}</h2>;
export const DialogDescription = ({ children }) => (
  <p className="text-sm text-gray-600 text-sm">{children}</p>
);
export const DialogFooter = ({ children }) => <div className="mt-4 flex justify-end gap-2">{children}</div>;
