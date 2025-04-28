import { cn } from "@utils/cn"

export const Error = ({ children, className, ...props }) => {
  return (
    <div className={cn("flex text-sm text-red-500", className)} {...props}>
      <div aria-hidden="true">
        <svg
          data-testid="geist-icon"
          fill="none"
          height="20"
          shapeRendering="geometricPrecision"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="20"
          className="text-red-500"
        >
          <circle cx="12" cy="12" r="10" fill=""></circle>
          <path d="M12 8v4" stroke=""></path>
          <path d="M12 16h.01" stroke=""></path>
        </svg>
      </div>
      <div className="ml-2">
        <b className="font-bold">Помилка:</b>
        <span aria-hidden="true" className="ml-[5px] mt-0 inline-block h-px w-px select-none"></span>
        {children}
      </div>
    </div>
  )
}
