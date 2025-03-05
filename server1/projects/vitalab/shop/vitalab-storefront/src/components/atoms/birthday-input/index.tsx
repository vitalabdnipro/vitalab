import { NumberFormatBase, usePatternFormat } from "react-number-format"

export function BirthdayInput(props: any) {
  /**
   * usePatternFormat, returns all the props required for NumberFormatBase
   * which we can extend in between
   */
  const { format, ...rest } = usePatternFormat({
    ...props,
    format: "##.##.####",
  })

  const _format = (val: any) => {
    let day = val.substring(0, 2)
    let month = val.substring(2, 4)
    const year = val.substring(4, 8)

    // Check day
    if (day.length === 1 && day[0] > 3) {
      day = `0${day[0]}`
    } else if (day.length === 2) {
      // Set the lower and upper boundary for the day
      if (Number(day) < 1) {
        day = "01"
      } else if (Number(day) > 31) {
        day = "31"
      }
    }

    if (month.length === 1 && month[0] > 1) {
      month = `0${month[0]}`
    } else if (month.length === 2) {
      // set the lower and upper boundary
      if (Number(month) === 0) {
        month = `01`
      } else if (Number(month) > 12) {
        month = "12"
      }
    }

    const formattedValue = format(`${day}${month}${year}`)

    return formattedValue
  }

  return (
    <NumberFormatBase
      format={_format}
      pattern="\d{2}.\d{2}.\d{4}"
      {...rest}
      className="flex h-10 w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:border-gray-200 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
    />
  )
}
