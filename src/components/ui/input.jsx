import React, { forwardRef } from "react";

export const Input = forwardRef((props, ref) => {
  return (
    <input
      ref={ref} 
      className={`border border-gray-200 rounded px-3 py-2 w-full ${props.className || ""}`}
      {...props}
    />
  );
});

Input.displayName = "Input";
