import * as RadixSwitch from "@radix-ui/react-switch";
import clsx from "clsx";

/**
 * A controlled switch component atom.
 */
function Switch(props) {
  return (
    <RadixSwitch.Root
      {...props}
      className={clsx(
        "w-8 h-[18px] rounded-full transition-bg bg-gray-300 radix-state-checked:bg-blue-500"
      )}
      asChild
    >
      <div className="flex items-center">
        <RadixSwitch.Thumb
          className={clsx(
            "w-2 h-2 bg-white rounded-full block transition-transform translate-x-[5px] radix-state-checked:translate-x-[19px]"
          )}
        />
      </div>
    </RadixSwitch.Root>
  );
}

export default Switch;
