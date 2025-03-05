import { forwardRef } from "react";
import { cva } from "class-variance-authority";

const buttonClasses = cva("relative cursor-pointer inline-flex items-center", {
  variants: {
    type: {
      primary: [
        "group rounded-full pr-3 pl-4 pt-1 pb-[5px] text-m font-semibold leading-[1.6] text-white transition duration-150 ease-hover",
      ],
      // **or**
      // primary: "bg-blue-500 text-white border-transparent hover:bg-blue-600",
      secondary: [],
      base: "max-w-full justify-center rounded-[5px] border border-black bg-black px-3 font-medium text-white transition hover:bg-transparent hover:text-black h-10",
    },
    size: {
      small: ["h-3"],
      medium: ["text-base", "py-2", "px-4"],
    },
    disabled: {
      true: "cursor-not-allowed",
    },
    loading: {
      true: "cursor-not-allowed",
    },
  },
  compoundVariants: [
    // Primary variants
    {
      disabled: true,
      type: "primary",
      className: "bg-slate-900",
    },
    {
      // disabled: true,
      loading: true,
      type: "primary",
      className: "bg-slate-900",
    },
    {
      // disabled: false,
      loading: false,
      type: "primary",
      className: "bg-orange-600 hover:bg-slate-900",
    },
    // {
    //   type: "primary",
    //   size: "medium",
    //   class: "uppercase",
    //   // **or** if you're a React.js user, `className` may feel more consistent:
    //   // className: "uppercase"
    // },
  ],
  defaultVariants: {
    // type: "primary",
    // size: "medium",
  },
});

// eslint-disable-next-line react/display-name
export const Button = forwardRef((props, ref) => {
  const {
    type = "primary",
    size,
    disabled,
    loading,
    // isActive,
    children,
    className,
    prefix,
    ...rest
  } = props;

  const contentProps = { children };

  return (
    <button
      {...rest}
      ref={ref}
      disabled={disabled || loading}
      className={buttonClasses({
        type,
        size,
        loading,
        disabled,
        className,
      })}
    >
      {/* {loading && prefix && <>...</>} */}
      <ButtonContent {...contentProps} />
      {type === "primary" && !loading && (
        <svg
          className="mt-0.5 ml-2.5 stroke-white stroke-2" //-mr-1
          fill="none"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-hidden="true"
        >
          <path
            className="opacity-0 transition duration-150 ease-hover group-hover:opacity-100"
            d="M0 5h7"
          ></path>
          <path
            className="transition duration-150 ease-hover group-hover:translate-x-[3px]"
            d="M1 1l4 4-4 4"
          ></path>
        </svg>
      )}
      {loading && (
        <svg
          viewBox="0 0 24 24"
          role="status"
          aria-label="Loading"
          className="ml-1 h-4 w-4 animate-spin"
        >
          <g transform="translate(1 1)" fillRule="nonzero" fill="none">
            <circle cx="11" cy="11" r="11"></circle>
            <path
              d="M10.998 22a.846.846 0 0 1 0-1.692 9.308 9.308 0 0 0 0-18.616 9.286 9.286 0 0 0-7.205 3.416.846.846 0 1 1-1.31-1.072A10.978 10.978 0 0 1 10.998 0c6.075 0 11 4.925 11 11s-4.925 11-11 11z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      )}
    </button>
  );
});

type ButtonContentProps = Pick<ButtonProps, "children">;

const ButtonContent = (props: ButtonContentProps) => {
  const { children } = props;
  return <>{children}</>;
};
