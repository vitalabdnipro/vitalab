import { cn } from "~/utils/cn"

type State = "READY"

const StatusIndicator = ({ title, state, className, ...props }) => {
  const dotClass = cn({
    "bg-green-500": state === "READY",
    "bg-yellow-500": state === "QUEUED",
    "bg-gray-400": state === "CANCELED",
    "bg-red-500": state === "DELETED",
  })

  return (
    <span className={cn("inline-flex items-center", className)} {...props}>
      <span className={cn("inline-flex h-2.5 w-2.5 rounded-full", dotClass)} />
      {title && <span className="ml-2 text-xs leading-4 hidden md:flex md:text-sm">{title}</span>}
    </span>
  )
}

export function StatusDot({
  status,
  label,
}: {
  status: string
  label: boolean
}) {
  switch (status) {
    case "created":
      return <StatusIndicator state="READY" title="Готовий" label />
    case "not created":
      return <StatusIndicator state="QUEUED" title="Не готовий" label />
    //case "cancelled":
    //  return <StatusIndicator state="CANCELED" title="Скасовано" label />
    case "no file":
      return <StatusIndicator state="DELETED" title="Вилучений" label />
    default:
      return null
  }
}
