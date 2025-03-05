import Head from "next/head";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import CustomTableHeader from "../components/molecules/custom-table-header";
import BodyCard from "../components/organisms/body-card";
import ReportTable from "../components/templates/report-table";
import FilteringOptions from "../components/molecules/table/filtering-option";
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import utc from "dayjs/plugin/utc";
import FilteringOptions2 from "../components/molecules/table/filtering-option2";
dayjs.extend(utc);

const PeriodHeaderPrinting = ({ period }) => {
  const { data: user, error } = useSWR(`/api/users/`, fetcher);

  if (error) return "An error has occurred.";
  if (!user) return "Loading...";

  const header = `Замовлення за період: ${dayjs(period[0]).format(
    "DD.MM.YYYY"
  )} - ${dayjs(period[1]).format("DD.MM.YYYY")}`;

  return (
    <div className="hidden print:block">
      <div className="text-sm flex items-center justify-end h-8 mb-8">
        <span className="font-semibold mr-1">
          Партнер: {user.organization.name}
        </span>
      </div>
      <div className="w-full mb-4">
        <div className="flex justify-center items-center text-base">
          {header}
        </div>
      </div>
    </div>
  );
};

const Reports = () => {
  const midnight = () => {
    let md = dayjs().utcOffset(3).startOf("date").toDate();
    return dayjs().diff(md, "seconds");
  };

  const [period, setPeriod] = useState([
    dayjs().subtract(midnight(), "seconds").toDate(),
    new Date(),
  ]);

  const actionables = [
    {
      label: "Роздрукувати звіт",
      onClick: () => window.print(),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
      ),
    },
  ];
  // const x = dayjs().utcOffset(3).startOf("date").toDate();
  // console.log(dayjs().diff(x, 'hours'));

  return (
    <div className="flex flex-col grow h-full">
      <div className="w-full flex flex-col grow">
        <BodyCard
          customHeader={<CustomTableHeader name="Звіт" />}
          actionables={actionables}
        >
          <div className="w-full overflow-y-auto flex flex-col justify-between min-h-[300px] h-full">
            <div className="flex flex-col">
              <PeriodHeaderPrinting period={period} />
              <div className="w-full flex justify-between mb-2 print:hidden">
                {/* <FilteringOptions period={period} onSetPeriod={setPeriod} /> */}
                <FilteringOptions2 period={period} setPeriod={setPeriod} />
              </div>
              <ReportTable period={period} />
              <div className="hidden print:block mt-20">
                <div className="grid grid-cols-12">
                  <div className="col-span-8 text-xs font-semibold">
                    Супровідний лист сформував ПІБ:
                  </div>
                  <div className="col-span-2 font-semibold">Підпис:</div>
                  <div className="col-span-2 font-semibold">Дата:</div>
                </div>
              </div>
            </div>
          </div>
        </BodyCard>
      </div>
    </div>
  );
};

export default Reports;
