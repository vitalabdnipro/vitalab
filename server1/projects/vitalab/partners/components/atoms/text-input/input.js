/* eslint-disable react/display-name */
import clsx from "clsx";
import { useRef, forwardRef, useImperativeHandle } from "react";

import s from "./input.module.css";

const InputField = forwardRef(
  ({ className, label, name, placeholder, actions, ...fieldProps }, ref) => {
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => inputRef.current);

    return (
      // <input
      //   ref={ref}
      //   className={clsx(
      //     "placeholder:inter-base-regular placeholder-grey-40 focus:outline-none",
      //     className
      //   )}
      //   {...props}
      // />

      <div
        className="relative"
        onClick={() => !fieldProps.disabled && inputRef?.current?.focus()}
      >
        <input
          className="peer h-10 px-4 text-sm rounded-md w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-gray-600"
          ref={inputRef}
          name={name}
          placeholder=" "
          // onChange={onChange}
          autoComplete="off"
          {...fieldProps}
        />
        <label className="bg-white absolute left-2.5 px-2 -top-2.5 scale-75 origin-[0] text-gray-600 text-sm transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:scale-75 peer-focus:px-2 peer-placeholder-shown:scale-100">
          {label}
        </label>
        {actions ? (
          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5 z-10">
            <button
              type="button"
              onClick={actions.onClick}
              className="inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400"
            >
              {actions.label}
            </button>
          </div>
        ) : null}
      </div>
    );
  }
);

export default InputField;
