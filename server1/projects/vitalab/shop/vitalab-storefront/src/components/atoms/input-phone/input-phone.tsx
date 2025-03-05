import { NumberFormatBase, usePatternFormat } from "react-number-format";

const InputPhone = (props) => {
  /**
   * usePatternFormat, returns all the props required for NumberFormatBase
   * which we can extend in between
   */
  const { format, onChange, ...rest } = usePatternFormat({
    ...props,
    format: "## / ## / ####",
    allowEmptyFormatting: true,
    mask: "_",
  });

  const _format = (val: string) => {
    const day = val.substring(0, 2);
    const month = val.substring(2, 4);
    const year = val.substring(4, 8);

    // if (month.length === 1 && month[0] > 1) {
    //   month = `0${month[0]}`;
    // } else if (month.length === 2) {
    //   // set the lower and upper boundary
    //   if (Number(month) === 0) {
    //     month = `01`;
    //   } else if (Number(month) > 12) {
    //     month = "12";
    //   }
    // }

    // return format(val);
    // const day = val.substring(0, 2);
    // const month = val.substring(5, 7);
    // const year = val.substring(10, 14);

    // // if (month.length === 1 && month[0] > 1) {
    // //   month = `0${month[0]}`;
    // // } else if (month.length === 2) {
    // //   // set the lower and upper boundary
    // //   if (Number(month) === 0) {
    // //     month = `01`;
    // //   } else if (Number(month) > 12) {
    // //     month = "12";
    // //   }
    // // }

    return format(`${day}${month}${year}`);
  };

  return (
    <NumberFormatBase
      format={_format}
      {...rest}
      onChange={(e) => {
        // console.log(_format(e.target.value));
        onChange("5");
      }}
    />
  );
};

export { InputPhone };
