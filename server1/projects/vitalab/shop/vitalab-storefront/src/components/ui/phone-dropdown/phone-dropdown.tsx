import { ChevronDownIcon } from "@heroicons/react/24/solid"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import clsx from "clsx"

const phones: RadixMenuItem[] = [
  {
    label: "(067) 310-52-27",
    // icon: <FileIcon className="mr-2 h-3.5 w-3.5" />,
  },
  {
    label: "(050) 360-75-75",
    // icon: <FileIcon className="mr-2 h-3.5 w-3.5" />,
  },
  {
    label: "(063) 251-03-38",
    // icon: <MixerHorizontalIcon className="mr-2 h-3.5 w-3.5" />,
  },
]

const PhoneDropdown = () => {
  return (
    <div className="relative inline-block text-left">
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          <div className="group flex cursor-pointer items-center">
            (067) 310-52-27
            {/* <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 duration-300 group-radix-state-open:rotate-180"
            >
              <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path>
            </svg> */}
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-0.5 duration-300 group-radix-state-open:rotate-180"
            >
              <path
                d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          {/* <ChevronDownIcon className="h-6 w-6 text-slate-900" /> */}
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="end"
            sideOffset={5}
            className={clsx(
              "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
              "z-10 w-48 rounded-lg px-1 py-1 shadow-md md:w-40",
              "bg-white"
            )}
          >
            {phones.map(({ label, icon }, i) => (
              <DropdownMenuPrimitive.Item
                key={`${label}-${i}`}
                className={clsx(
                  "flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
                  "text-gray-400 focus:bg-gray-50"
                )}
              >
                {icon}
                <a
                  href={`tel:+38${label?.replace(/[\(\)\s-]/g, "")}`}
                  className="flex grow text-gray-700"
                >
                  {label}
                </a>
              </DropdownMenuPrimitive.Item>
            ))}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  )
}

export default PhoneDropdown
