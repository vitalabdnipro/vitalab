// // your-select.jsx
// import React from "react";
// import * as SelectPrimitive from "@radix-ui/react-select";
// import clsx from "clsx";
// import { CheckIcon } from "@heroicons/react/24/solid";
// // import {
// //   CheckIcon,
// //   ChevronDownIcon,
// //   ChevronUpIcon,
// // } from "@radix-ui/react-icons";

// const LaboratorySelect = React.forwardRef(
//   ({ children, ...props }, forwardedRef) => {
//     return (
//       <SelectPrimitive.Root {...props}>
//         <SelectPrimitive.Trigger ref={forwardedRef} asChild>
//           <div className="relative mt-6 flex h-full w-full">
//             <label
//               // htmlFor={name}
//               // onClick={() => inputRef.current?.focus()}
//               className={clsx(
//                 "absolute left-2.5 -top-2.5 origin-[0] scale-75 bg-white px-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-gray-400",
//                 {
//                   // "!text-rose-500": hasError,
//                 }
//               )}
//             >
//               Лабораторія
//             </label>
//             <button className="flex h-full w-full items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-2 text-left text-s font-normal text-black">
//               <SelectPrimitive.Value />
//               <SelectPrimitive.Icon className="pl-4">
//                 {/* <ChevronDownIcon /> */}
//               </SelectPrimitive.Icon>
//             </button>
//           </div>
//         </SelectPrimitive.Trigger>
//         <SelectPrimitive.Portal>
//           <SelectPrimitive.Content className="z-10">
//             <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
//               up
//             </SelectPrimitive.ScrollUpButton>
//             <SelectPrimitive.Viewport className="rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800">
//               {children}
//             </SelectPrimitive.Viewport>
//             <SelectPrimitive.ScrollDownButton>
//               down
//             </SelectPrimitive.ScrollDownButton>
//           </SelectPrimitive.Content>
//           {/* <SelectPrimitive.Content>
//             <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
//               up
//             </SelectPrimitive.ScrollUpButton>
//             <SelectPrimitive.Viewport className="rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800">
//               <SelectPrimitive.Group>
//                 {["Apple", "Banana", "Blueberry", "Strawberry", "Grapes"].map(
//                   (f, i) => (
//                     <SelectPrimitive.Item
//                       disabled={f === "Grapes"}
//                       key={`${f}-${i}`}
//                       value={f.toLowerCase()}
//                       className={clsx(
//                         "relative flex items-center rounded-md px-8 py-2 text-sm font-medium text-gray-700 focus:bg-gray-100 dark:text-gray-300 dark:focus:bg-gray-900",
//                         "radix-disabled:opacity-50",
//                         "select-none focus:outline-none"
//                       )}
//                     >
//                       <SelectPrimitive.ItemText>{f}</SelectPrimitive.ItemText>
//                       <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
//                         icon
//                       </SelectPrimitive.ItemIndicator>
//                     </SelectPrimitive.Item>
//                   )
//                 )}
//               </SelectPrimitive.Group>
//             </SelectPrimitive.Viewport>
//             <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
//               up
//             </SelectPrimitive.ScrollDownButton>
//           </SelectPrimitive.Content> */}
//         </SelectPrimitive.Portal>
//       </SelectPrimitive.Root>
//     );
//   }
// );

// LaboratorySelect.displayName = "LaboratorySelect";

// const LaboratorySelectItem = React.forwardRef(
//   ({ children, ...props }, forwardedRef) => {
//     return (
//       <SelectPrimitive.Item
//         {...props}
//         ref={forwardedRef}
//         className={clsx(
//           "relative flex items-center rounded-md px-8 py-2 text-sm font-medium text-gray-700 focus:bg-gray-100",
//           "radix-disabled:opacity-50",
//           "select-none focus:outline-none"
//         )}
//       >
//         <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
//         <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
//           <CheckIcon className="h-4 w-4" />
//         </SelectPrimitive.ItemIndicator>
//       </SelectPrimitive.Item>
//     );
//   }
// );

// LaboratorySelectItem.displayName = "LaboratorySelectItem";

// export { LaboratorySelect, LaboratorySelectItem };

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/atoms/select"

const labs = [
  {
    label: "КП «ДБКЛ з надання психіатричної допомоги» ДОР»",
    value: "test111",
  },
  {
    label: "Діагностичний лабораторний центр 'VitaLab' м. Нікополь",
    value: "test2111",
  },
]

const LaboratorySelect = (props) => {
  const { field, handleChange } = props

  return (
    <Select
      onValueChange={(value: string) => handleChange(value, field.onChange)}
    >
      <SelectTrigger className="">
        <SelectValue placeholder="Виберіть лабораторію..." />
      </SelectTrigger>
      <SelectContent className="ml-6" align="end">
        {labs.map((lab) => (
          <SelectItem value={lab.value}>{lab.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { LaboratorySelect }
