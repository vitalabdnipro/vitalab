import { cn } from "~/utils/cn";

export const GeistContainer = ({ children, className, ...props }) => {
  return (
    <div className={cn("relative flex min-w-[1px] max-w-full flex-col", className)} {...props}>
      {children}
    </div>
  );
};