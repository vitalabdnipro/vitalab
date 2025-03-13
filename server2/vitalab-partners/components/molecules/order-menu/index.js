import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useNotification from "../../../hooks/useNotification";
import { styled, keyframes } from "@stitches/react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import CheckIcon from "../../fundamentals/icons/check-icon";

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
  minWidth: 180,
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
    color: "#3c4257",
    opacity: 0.5,
    pointerEvents: "none",
  },

  "&:focus": {
    backgroundColor: "#3482F6",
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
    backgroundColor: "#3482F6",
    color: "#3482F6",
  },
  ...itemStyles,
});

const StyledLabel = styled(DropdownMenuPrimitive.Label, {
  paddingLeft: 5,
  fontSize: 12,
  lineHeight: "25px",
  color: "#3482F6",
});

const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: 1,
  backgroundColor: "rgb(229,231,235)",
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
  color: "#3482F6",
  ":focus > &": { color: "white" },
  "[data-disabled] &": { color: "#3482F6" },
});

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 35,
  width: 35,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#3482F6",
  backgroundColor: "white",
  // boxShadow: `0 2px 10px #000`,
  // "&:hover": { backgroundColor: "#3482F6" },
  // "&:focus": { boxShadow: `0 0 0 2px black` },
});

const OrderMenu = ({ onSetEdit, onSetShowPrices, status }) => {
  const [showPrices, setShowPrices] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const notification = useNotification();

  // const [urlsChecked, setUrlsChecked] = React.useState(false);
  // const [person, setPerson] = React.useState("pedro");

  useEffect(() => {
    onSetShowPrices(showPrices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPrices]);

  const deleteOrder = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/orders/${id}`, {
      method: "DELETE",
    });

    const { patientId, number } = await res.json();

    if (patientId && number) {
      router.push(`/patients/${patientId}`);
      notification(`Замовлення #${number} видалено`, "success");
    }
  };
  console.log(status);
  return (
    <Box>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center h-8 w-8 ml-2">
            <span className="inline-block overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={5}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <DropdownMenuCheckboxItem
            checked={showPrices}
            onCheckedChange={setShowPrices}
          >
            <DropdownMenuItemIndicator>
              <CheckIcon size={14} />
            </DropdownMenuItemIndicator>
            Показати ціни
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={deleteOrder} disabled={status !== "NEW"}>
            Видалити
          </DropdownMenuItem>
          {/* <DropdownMenuArrow offset={12} /> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  );
};

export default OrderMenu;
