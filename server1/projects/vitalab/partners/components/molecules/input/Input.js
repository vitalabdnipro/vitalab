import cn from "clsx";
import * as Label from "@radix-ui/react-label";
import s from "./Input.module.css";

const Input = (props) => {
  const { className, children, onChange, ...rest } = props;

  const rootClassName = cn(s.root, {}, className);

  const handleOnChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
    return null;
  };

  return (
    <div>
      <Label>{props.label}</Label>
      <input
        className={rootClassName}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
    </div>
  );
};

export default Input;
