import React from "react";
import { styled } from "@stitches/react";
// import { blackA } from "@radix-ui/colors";
import * as LabelPrimitive from "@radix-ui/react-label";

const StyledLabel = styled(LabelPrimitive.Root, {
  color: "rgb(107, 114, 128)",
  userSelect: "none",
});

// Exports
const Label = StyledLabel;

// Your app...
const Flex = styled("div", {
  display: "flex",
  width: "100%",
});
const Input = styled("input", {
  all: "unset",
  caretColor: "#7c3aed",
  color: "rgb(17,24,39)",
  lineHeight: "1.5rem",
  width: "100%",
  backgroundColor: "inherit",
});

const InputField = ({
  label,
  name,
  key,
  placeholder,
  onChange,
  ...fieldProps
}) => (
  <Flex
    css={{
      flexDirection: "column",
      height: "74px",
      backgroundColor: "rgb(249, 250, 251)",
      fontWeight: 400,
      fontSize: "0.875rem",
      padding: "0.75rem",
      borderColor: "rgb(229,231,235)",
      borderWidth: "1px",
      borderRadius: "0.5rem",
      "&:focus-within": {
        boxShadow: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px
      `,
        borderColor: "rgb(124,58,237)",
      },
    }}
  >
    <Flex
      css={{
        fontSize: "0.75rem",
        alignItems: "center",
        fontWeight: 600,
      }}
    >
      <Label htmlFor={name} css={{}}>
        {label}
      </Label>
    </Flex>
    <Flex css={{ marginTop: "0.25rem" }}>
      <Input
        type="text"
        id={name}
        autoComplete="off"
        key={key || name}
        placeholder={placeholder}
        onChange={onChange}
        {...fieldProps}
      />
    </Flex>
  </Flex>
);

export default InputField;
