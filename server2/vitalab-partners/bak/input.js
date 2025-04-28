/* eslint-disable react/display-name */
import clsx from "clsx";
import { forwardRef } from "react";

import s from "./input.module.css";

const InputField = forwardRef(
  ({ className, label, name, placeholder, ...fieldProps }, ref) => {
    return (
      // <input
      //   ref={ref}
      //   className={clsx(
      //     "placeholder:inter-base-regular placeholder-grey-40 focus:outline-none",
      //     className
      //   )}
      //   {...props}
      // />

      // <div className="relative">
      //   <input
      //     type="text"
      //     id="floating_outlined"
      //     className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      //     placeholder=" "
      //   />
      //   <label
      //     htmlFor="floating_outlined"
      //     className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      //   >
      //     Floating outlined
      //   </label>
      // </div>
      <div className="relative">
        <input
          className="peer h-12 px-4 text-sm rounded-md w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
          name={name}
          placeholder={placeholder || "Placeholder"}
          onChange={onChange}
          autoComplete="off"
          {...fieldProps}
        />
        <label className="bg-white absolute left-2.5 px-2 -top-2.5 scale-75 origin-[0] text-gray-600 text-sm transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:scale-75 peer-focus:px-2 peer-placeholder-shown:scale-100">
          {label}
        </label>
      </div>
    );
  }
);

export default InputField;
