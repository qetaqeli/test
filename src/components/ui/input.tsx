import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`w-full rounded-md border border-gray-700 bg-black px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
