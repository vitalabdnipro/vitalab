import * as RadixTooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";

const Tooltip = ({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration,
  className,
  side,
  onClick,
  ...props
}) => {
  return (
    <RadixTooltip.Provider delayDuration={100}>
      <RadixTooltip.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}
      >
        <RadixTooltip.Trigger onClick={onClick} asChild={true}>
          <button type="button">{children}</button>
        </RadixTooltip.Trigger>
        <RadixTooltip.Content
          side={side ?? "bottom"}
          sideOffset={10}
          align="center"
          className={clsx(
            "inter-small-semibold text-gray-500",
            "bg-gray-50 py-[6px] px-[12px] shadow-dropdown rounded",
            "border border-solid border-gray-200",
            "max-w-[220px]",
            className
          )}
          {...props}
        >
          {content}
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
