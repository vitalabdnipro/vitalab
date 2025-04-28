import { Disclosure } from "@headlessui/react"
import { useCheckout } from "@lib/context/checkout-context"
import { cn } from "@utils/cn"
import clsx from "clsx"
import { useMeCustomer } from "medusa-react"

type StepContainerProps = {
  index: number
  title: string
  closedState?: React.ReactNode
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const StepContainer = ({
  index,
  title,
  className,
  closedState,
  children,
  ...props
}: StepContainerProps) => {
  const {
    editAddresses: { state },
  } = useCheckout()
  const { customer, isLoading } = useMeCustomer()
  console.log(customer)
  return (
    <div>
      <div
        className={clsx("bg-white", className, {
          "opacity-50 pointer-events-none select-none": state || !customer,
        })}
        {...props}
      >
        <div className="text-xl-semi flex items-center gap-x-4 pt-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900 text-sm text-white">
            {index}
          </div>
          <h2>{title}</h2>
        </div>
        <Disclosure>
          <Disclosure.Panel
            static
            className={cn(
              "mt-6 overflow-hidden transition-[max-height,opacity] duration-700 ease-in-out",
              {
                "max-h-[9999px] opacity-100": !state && customer,
                "max-h-0 opacity-0": state || !customer,
              }
            )}
          >
            {children}
          </Disclosure.Panel>
          <Disclosure.Panel
            static
            className={cn(
              "overflow-hidden transition-[max-height,opacity] duration-700 ease-in-out",
              {
                "max-h-[9999px] opacity-100": state || !customer,
                "max-h-0 opacity-0": !state && customer,
              }
            )}
          >
            {closedState}
          </Disclosure.Panel>
        </Disclosure>
      </div>
    </div>
  )
}

export default StepContainer
