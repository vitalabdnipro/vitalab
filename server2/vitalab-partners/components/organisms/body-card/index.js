import clsx from "clsx";
import Actionables from "../../molecules/actionables";
import AddPartnerModal from "../add-partner-modal";

// import Button from "../fundamentals/button";
const BodyCard = ({
  title,
  subtitle,
  events,
  actionables,
  forceDropdown = false,
  customActionable,
  status,
  customHeader,
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        "rounded-lg border bg-white border-gray-200 h-full overflow-hidden flex flex-col min-h-[350px] w-full print:border-none",
        className
      )}
      {...rest}
    >
      <div className="relative">
        {/* {isScrolled && (
          <div className="absolute rounded-t-rounded top-0 left-0 right-0 bg-gradient-to-b from-grey-0 to-[rgba(255,255,255,0)] h-xlarge z-10" />
        )} */}
      </div>
      <div className="px-8 flex flex-col grow overflow-y-auto print:px-2">
        <div className="flex items-center justify-between mt-6 h-8 print:hidden">
          {customHeader ? (
            <div>{customHeader}</div>
          ) : title ? (
            <h1 className="font-semibold text-2xl leading-9 text-gray-900">
              {title}
            </h1>
          ) : (
            <div />
          )}

          <div className="flex items-center space-x-2">
            {status && status}            
            <Actionables
              actions={actionables}
              customTrigger={customActionable}
              // forceDropdown={forceDropdown}
            />
          </div>
        </div>
        {subtitle && (
          <h3 className="font-normal text-xs leading-5 pt-1.5 text-gray-500">
            {subtitle}
          </h3>
        )}
        {children && <div className="flex flex-col grow my-6">{children}</div>}
      </div>
      <div className="min-h-[24px]" />
    </div>
  );
};

export default BodyCard;
