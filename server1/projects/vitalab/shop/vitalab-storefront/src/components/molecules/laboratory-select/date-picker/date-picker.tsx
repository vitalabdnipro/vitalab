import { useRef } from "react";
import { useDatePickerState } from "@react-stately/datepicker";
import { useDatePicker } from "react-aria";
import { DateField } from "./date-field";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export function DatePicker(props) {
  const state = useDatePickerState(props);
  const ref = useRef();
  const { groupProps, labelProps, fieldProps } = useDatePicker(
    props,
    state,
    ref
  );

  return (
    <div className="relative inline-flex flex-col text-left">
      <span {...labelProps} className="text-sm text-gray-800">
        {props.label}
      </span>
      <div {...groupProps} ref={ref} className="group flex">
        <div className="relative flex items-center rounded-l-md border border-gray-300 bg-white p-1 pr-10 transition-colors group-focus-within:border-violet-600 group-hover:border-gray-400 group-focus-within:group-hover:border-violet-600">
          <DateField {...fieldProps} />
          {state.validationState === "invalid" && (
            <ExclamationCircleIcon className="absolute right-1 h-6 w-6 text-red-500" />
          )}
        </div>
      </div>
    </div>
  );
}
