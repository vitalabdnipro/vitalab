import { useState, forwardRef, createRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import CalendarIcon from "../../fundamentals/icons/calendar-icon";

import "react-datepicker/dist/react-datepicker.css";
import s from "./filtering-option2.module.css";

const FilteringOptions2 = ({ period, setPeriod }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    setStartDate(period[0]);
    setEndDate(period[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (dates.length == 2) {
      setPeriod(dates);
    }
  };

  const handleClick = () => {
    const start = dayjs().startOf("day").toDate();
    const end = dayjs().toDate();

    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      setPeriod([start, end]);
    }
  };

  // const handleBlur = (props) => {
  //   console.log(props);
  //   // const [start, end] = dates;
  //   // setStartDate(start);
  //   // setEndDate(end);
  // };

  // console.log(startDate);
  const CustomInput = forwardRef(function Input({ value, onClick }, ref) {
    return (
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          className={s.input}
          type="text"
          onClick={onClick}
          value={`${dayjs(startDate).format("DD.MM.YYYY")} - ${dayjs(
            endDate
          ).format("DD.MM.YYYY")}`}
          readOnly
        />
        <button
          onClick={handleClick}
          className="px-3 py-1 w-[100px] text-xs font-semibold outline-none rounded-r-md transition-all border-y border-r focus:border-gray-400 focus:border focus:shadow-[0_0_0_2px_rgba(62,207,142,.1)]"
        >
          За добу
        </button>
      </div>
      // <input
      //   className={s.input}
      //   type="text"
      //   onClick={onClick}
      //   value={`${startDate} + ${endDate}`}
      //   readOnly
      // />
    );
  });

  const CustomButton = () => {
    return (
      <div
        onClick={(e) => {
          return;
        }}
      >
        test
      </div>
    );
  };

  const months = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];
  const days = ["Нед.", "Пон.", "Вів.", "Сер.", "Чет.", "П'ят.", "Суб."];

  const locale = {
    localize: {
      day: (n) => days[n],
      month: (n) => months[n],
    },
    formatLong: {
      date: () => "mm/dd/yyyy",
    },
  };

  return (
    <DatePicker
      wrapperClassName={s.wrapper}
      dateFormat="dd.MM.yyyy"
      selected={startDate}
      onChange={(dates) => onChange(dates)}
      startDate={startDate}
      endDate={endDate}
      locale={locale}
      calendarStartDay={1}
      closeOnScroll={true}
      // onBlur={(dates) => handleBlur(dates)}
      selectsRange
      customInput={<CustomInput />}
      // inline
    />
  );
};

export default FilteringOptions2;
