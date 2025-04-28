import { cn } from "~/utils/cn";

export const Error = ({ children, className, ...props }) => {
  return (
    <div className={cn("text-sm text-red-500", className)} {...props}>
      {children}
    </div>
  );
};