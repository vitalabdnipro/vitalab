import { useEffect, useState } from "react";
import { styled, keyframes } from "@stitches/react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import dayjs from "dayjs";
import uk from "dayjs/locale/uk";
import DotFilledIcon from "../../fundamentals/icons/dot-filled-icon";

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const StyledContent = styled(DropdownMenuPrimitive.Content, {
  minWidth: 220,
  backgroundColor: "white",
  border: "1px solid rgb(229,231,235)",
  borderRadius: 6,
  padding: 5,
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    animationFillMode: "forwards",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

const itemStyles = {
  all: "unset",
  fontSize: 13,
  lineHeight: 1,
  color: "rgb(17,24,39)",
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 5px",
  position: "relative",
  paddingLeft: 25,
  userSelect: "none",

  "&[data-disabled]": {
    color: "#3b82f6",
    pointerEvents: "none",
  },

  "&:focus": {
    backgroundColor: "rgb(52, 130, 246)",
    color: "#fff",
  },
};

const StyledItem = styled(DropdownMenuPrimitive.Item, { ...itemStyles });
const StyledCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem, {
  ...itemStyles,
});
const StyledRadioItem = styled(DropdownMenuPrimitive.RadioItem, {
  ...itemStyles,
});
const StyledTriggerItem = styled(DropdownMenuPrimitive.TriggerItem, {
  '&[data-state="open"]': {
    backgroundColor: "#6366f1",
    color: "#6366f1",
  },
  ...itemStyles,
});

const StyledLabel = styled(DropdownMenuPrimitive.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: "25px",
  color: "#3b82f6",
});

const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: 1,
  backgroundColor: "#6366f1",
  margin: 5,
});

const StyledItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: "white",
});

// Exports
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = StyledContent;
export const DropdownMenuItem = StyledItem;
export const DropdownMenuCheckboxItem = StyledCheckboxItem;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuRadioItem = StyledRadioItem;
export const DropdownMenuItemIndicator = StyledItemIndicator;
export const DropdownMenuTriggerItem = StyledTriggerItem;
export const DropdownMenuLabel = StyledLabel;
export const DropdownMenuSeparator = StyledSeparator;
export const DropdownMenuArrow = StyledArrow;

// Your app...
const Box = styled("div", {});

const RightSlot = styled("div", {
  marginLeft: "auto",
  paddingLeft: 20,
  color: "#3b82f6",
  ":focus > &": { color: "white" },
  "[data-disabled] &": { color: "#3b82f6" },
});

const convertValue = (data) => {
  let delta = 0;

  switch (data) {
    case "За останню добу":
      delta = (function () {
        let midnight = dayjs().utcOffset(3).startOf("date").toDate();
        // console.log(dayjs().diff(midnight, "hours"));
        return dayjs().diff(midnight, "minutes");
      })();
      break;
    case "За останні 30 днів":
      delta = 43200;
      break;
    default:
      break;
  }

  return delta;
};

const TimeRangeLabel = ({ range }) => {
  // console.log(
  //   dayjs()
  //     .subtract(21, "hour")
  //     .locale("uk")
  //     .format("MMMM DD, YYYY HH:mm")
  // );
  return (
    <div className="hidden items-center space-x-1 lg:flex">
      <span className="text-scale-1100 text-xs">
        {dayjs()
          .subtract(convertValue(range), "minutes")
          .locale("uk")
          .format("MMMM DD, YYYY HH:mm")}
      </span>
      <span className="text-gray-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sbui-icon "
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </span>
      <span className="text-scale-1100 text-xs">
        {dayjs().locale("uk").format("MMMM DD, YYYY HH:mm")}
      </span>
    </div>
  );
};

export const FilteringOptions = ({ period, onSetPeriod }) => {
  const [timeRange, setTimeRange] = useState("За останню добу");

  useEffect(() => {
    onSetPeriod(convertValue(timeRange));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  return (
    <Box>
      <DropdownMenu>
        <div className="flex mb-2 self-end">
          <div className="flex items-center space-x-3">
            <DropdownMenuTrigger asChild>
              <button className="flex bg-gray-50 border border-gray-200 font-semibold text-xs px-2.5 py-1 h-6 text-gray-900 rounded-lg items-center space-x-1">
                {timeRange}
                <div className="text-gray-500 ml-1 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sbui-icon "
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </button>
            </DropdownMenuTrigger>
            <TimeRangeLabel range={timeRange} />
          </div>
        </div>

        <DropdownMenuContent
          align={"start"}
          sideOffset={5}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          {/* <DropdownMenuLabel>People</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          <DropdownMenuRadioGroup
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <DropdownMenuRadioItem value="За останню добу">
              <DropdownMenuItemIndicator>
                <DotFilledIcon size={6} />
              </DropdownMenuItemIndicator>
              За останню добу
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="За останні 30 днів">
              <DropdownMenuItemIndicator>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sbui-icon "
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </DropdownMenuItemIndicator>
              За останні 30 днів
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          {/* <DropdownMenuArrow offset={12} /> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  );
};

export default FilteringOptions;
