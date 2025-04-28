import clsx from "clsx";

const ToasterContainer = ({ children, visible, className, ...rest }) => {
  return (
    <div
      className={clsx(
        "max-w-sm w-full bg-white shadow-md rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden",
        {
          "animate-enter": visible,
        },
        {
          "animate-leave": !visible,
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default ToasterContainer;
