// import { PatternFormat } from "react-number-format"

import { log } from "console"
import React from "react"
import { Button } from "@components/atoms/button"
import { Calendar } from "@components/atoms/calendar"
import * as Modal from "@components/atoms/modal"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@components/atoms/popover"
import { useModal } from "@hooks/use-modal"
import { cn } from "@utils/cn"
import { format, getYear, parse, parseISO, sub } from "date-fns"
import { uk } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import DatePicker from "react-datepicker"

const BirthdayPicker = (props) => {
  const [date, setDate] = React.useState<Date>()
  const [active, open, close] = useModal()
  // console.log("props", props.value)
  return (
    <>
      <button
        className="flex h-10 w-full items-center rounded-md border border-gray-200 px-3 text-sm"
        onClick={open}
        type="button"
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {props.value ? (
          // format(parse(props.value, "dd.MM.yyyy", new Date()), "dd/MM/yyyy")
          // format(props.value, "dd/MM/yyyy")
          props.value
        ) : (
          // <div>test</div>
          // <div>test</div>
          <span>Виберіть дату</span>
        )}
      </button>
      <Modal.Root active={active} onClickOutside={close} className="w-fit">
        <Modal.Body>
          <Calendar
            mode="single"
            initialFocus
            className={"rounded-md bg-white"}
            classNames={{
              caption: "flex pt-1 relative items-center",
            }}
            locale={uk}
            captionLayout="dropdown"
            fromYear={getYear(sub(new Date(), { years: 100 }))}
            toYear={getYear(new Date())}
            fixedWeeks
            formatDate={(date) => format(date, "dd.MM.yyyy")}
            {...props}
          />
          <div className="p-2"></div>
        </Modal.Body>
        <Modal.Actions>
          <Button variant={"outline"} className="rounded-md" onClick={close}>
          Зберегти
          </Button>
        </Modal.Actions>
      </Modal.Root>
    </>
    // <Popover>
    //   <PopoverTrigger asChild>
    //     {/* <Button
    //       variant={"outline"}
    //       className={cn(
    //         "w-[280px] justify-start text-left font-normal",
    //         !date && "text-muted-foreground"
    //       )}
    //     >
    //       <CalendarIcon className="mr-2 h-4 w-4" />
    //       {date ? format(date, "PPP") : <span>Pick a date</span>}
    //     </Button> */}

    //     <button className="flex h-10 w-full items-center rounded-md border border-gray-200 px-3 text-sm">
    //       <CalendarIcon className="mr-2 h-4 w-4" />
    //       {props.value ? (
    //         // format(parse(props.value, "dd.MM.yyyy", new Date()), "dd/MM/yyyy")
    //         // format(props.value, "dd/MM/yyyy")
    //         props.value
    //         // <div>test</div>
    //       ) : (
    //         // <div>test</div>
    //         <span>Виберіть дату</span>
    //       )}
    //     </button>
    //   </PopoverTrigger>
    //   <PopoverContent className="w-auto p-0">
    //     <Calendar
    //       mode="single"
    //       initialFocus
    //       className={"rounded-md bg-white"}
    //       classNames={{
    //         caption: "flex pt-1 relative items-center",
    //       }}
    //       locale={uk}
    //       captionLayout="dropdown"
    //       fromYear={getYear(sub(new Date(), { years: 100 }))}
    //       toYear={getYear(new Date())}
    //       fixedWeeks
    //       formatDate={(date) => format(date, "dd.MM.yyyy")}
    //       {...props}
    //     />
    //     <div className="p-2">
    //       <PopoverClose asChild>
    //         <Button variant={"outline"} className="rounded-md">
    //           Закрити
    //         </Button>
    //       </PopoverClose>
    //     </div>
    //   </PopoverContent>
    // </Popover>
  )
}

export { BirthdayPicker }
