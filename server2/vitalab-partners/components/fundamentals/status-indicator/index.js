import clsx from "clsx";
import React from "react";

const StatusIndicator = ({
  title,
  variant = "new",
  className,
  ...props
}) => {
  const dotClass = clsx({
    "bg-yellow-500": variant === "NEW",
    "bg-blue-500": variant === "SENT",
    "bg-green-500": variant === "COMPLETED",
    // "bg-violet-60": variant === "primary",
    // "bg-emerald-40": variant === "active",
    "bg-red-500": variant === "FAILED",
    "bg-grey-40": variant === "Undefined",
  });
  return (
    <div
      className={clsx("flex items-center text-xs", className)}
      {...props}
    >
      <div className={clsx("w-2 h-2 self-center rounded-full", dotClass)} />
      {title && <span className="ml-2">{title}</span>}
    </div>
  );
};

export default StatusIndicator;
