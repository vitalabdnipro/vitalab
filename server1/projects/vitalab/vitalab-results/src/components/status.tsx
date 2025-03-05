import { cn } from "~/utils/cn";

type State = "READY";

const StatusIndicator = ({ title, state, className, ...props }) => {
  const dotClass = cn({
    "bg-green-500": state === "READY",
    "bg-rose-50": state === "QUEUED",
    "bg-red-50": state === "CANCELED",
  });

  return (
    <span className={cn("inline-flex items-center", className)} {...props}>
      <span className={cn("w-2.5 h-2.5 rounded-full inline-flex", dotClass)} />
      {title && <span className="ml-2 leading-4 text-sm">{title}</span>}
    </span>
  );
};

export function StatusDot({
  status,
  label,
}: {
  status: string;
  label: boolean;
}) {
  switch (status) {
    case "ready":
      return <StatusIndicator state="READY" title="Готовий" label />;
    case "not ready":
      return <StatusIndicator state="QUEUED" title="Не готовий" label />;
    case "cancelled":
      return <StatusIndicator state="CANCELED" title="Скасовано" label />;
    default:
      return null;
  }
}
