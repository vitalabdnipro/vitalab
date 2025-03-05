import { ErrorMessage } from "@hookform/error-message";
import Eye from "@modules/common/icons/eye";
import EyeOff from "@modules/common/icons/eye-off";
import clsx from "clsx";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { get } from "react-hook-form";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "placeholder"
> & {
  label: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
  name: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, errors, touched, required, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text");
      }

      if (type === "password" && !showPassword) {
        setInputType("password");
      }
    }, [type, showPassword]);

    useImperativeHandle(ref, () => inputRef.current!);

    const hasError = get(errors, name) && get(touched, name);

    return (
      <div>
        <div className="relative z-0 w-full">
          <input
            type={inputType}
            name={name}
            placeholder=" "
            className={clsx(
              "peer h-10 w-full rounded-[5px] border border-gray-300 px-4 text-sm text-gray-900 placeholder-transparent focus:border-gray-500 focus:outline-none",
              {
                "border-rose-500 focus:border-rose-500": hasError,
              }
            )}
            {...props}
            ref={inputRef}
          />
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className={clsx(
              "absolute left-2.5 -top-2.5 origin-[0] scale-75 bg-white px-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-gray-400",
              {
                "!text-rose-500": hasError,
              }
            )}
          >
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-3 px-4 text-gray-400 outline-none transition-all duration-150 focus:text-gray-700 focus:outline-none"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
        {hasError && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return (
                // pl-2
                <div className="pt-1 text-xs text-rose-500">
                  <span>{message}</span>
                </div>
              );
            }}
          />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
