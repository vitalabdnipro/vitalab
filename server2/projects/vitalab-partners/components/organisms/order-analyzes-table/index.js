import { useEffect, useState } from "react";
import murmurhash from "murmurhash";
import { getAnalysisStatusVariant } from "../../../lib/order-status-variant";
import StatusIndicator from "../../fundamentals/status-indicator";
import PrintLabel from "../../molecules/print-label";
import TubeColor from "../../molecules/tube-color";
import SearchAnalysisModal from "../search-analysis-modal";
import ClockIcon from "../../fundamentals/icons/clock-icon";
import DownloadIcon from "../../fundamentals/icons/download-icon";
import XIcon from "../../fundamentals/icons/x-icon";
import useSWR from "swr";
import fetcher from "../../../lib/fetcher";

const OrderAnalyzesTable = ({ data, showPrices }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState([]);
  const { data: user, error } = useSWR(`/api/users/`, fetcher);

  const sendOrder = async () => {
    const res = await fetch(`/api/lab/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number: data.number }),
    });

    const { error } = await res.json();
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    addAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analysis]);

  //TODO REMOVE STATE DEP.
  const addAnalysis = async () => {
    if (analysis.length > 0) {
      const total = Number(data.total) + analysis[0].searchInput.price / 100;
      await fetch(`/api/orders/${data.id}/analyzes?total=${total}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(analysis),
      });

      setAnalysis([]);
    }
  };

  const deleteAnalysis = async (e, item) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const total = data.total - item.analysisPrice / 100;

      await fetch(
        `/api/orders/${data.id}/analyzes?analysis=${item.id}&total=${
          total > 0 ? total : 0
        }`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!user) return "Loading...";
  
  return (
    <>
      <div className="col-span-3 rounded-lg border bg-white border-gray-200 overflow-hidden relative w-full min-h-0 print:border-none">
        <div className="px-8 flex flex-col grow overflow-y-auto print:px-2">
          <div className="flex items-center justify-between mt-6 h-8 print:hidden">
            <h1 className="font-semibold text-2xl text-gray-900">Аналізи</h1>
            <div className="flex items-center space-x-2 print:hidden">
              <SearchAnalysisModal
                analysis={[]}
                onSetAnalysis={setAnalysis}
                status={data.status !== "NEW"}
              />
            </div>
          </div>
          <div className="flex flex-col grow my-6">
            <div className="mt-6">
              <table className="w-full table-auto">
                <thead className="text-xs leading-5 whitespace-nowrap font-semibold text-gray-500 border-t border-b border-gray-200">
                  <tr role="row">
                    <th
                      className="text-left h-[40px]"
                      colSpan="1"
                      role="columnheader"
                    >
                      <span className="text-left h-[40px] pl-2">Код</span>
                    </th>
                    <th
                      className="text-left h-[40px]"
                      colSpan="1"
                      role="columnheader"
                    >
                      Назва
                    </th>
                    {showPrices ? (
                      <th
                        className="text-left h-[40px]"
                        colSpan="1"
                        role="columnheader"
                      >
                        Ціна (грн)
                      </th>
                    ) : (
                      <th></th>
                    )}
                    {/* 
                    <th
                      className="text-left h-[40px]"
                      colSpan="1"
                      role="columnheader"
                    >
                      Планова дата
                    </th>
                    <th
                      className="text-left h-[40px]"
                      colSpan="1"
                      role="columnheader"
                    >
                      Фактична дата
                    </th> */}
                    <th
                      className="text-left h-[40px]"
                      colSpan="1"
                      role="columnheader"
                    >
                      Контейнер
                    </th>
                    <th
                      className="text-left h-[40px]"
                      colSpan="1"
                      role="columnheader"
                    >
                      Колір пробірки
                    </th>
                    <th
                      className="text-left h-[40px]"
                      colSpan="1"
                      role="columnheader"
                    >
                      Статус
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.analyzes.map((item) =>
                    item.analysisCode !== "00001" ? (
                      <tr
                        key={item.id}
                        className="font-normal text-xs leading-5 border-t border-b border-gray-200 text-gray-900 hover:bg-gray-50"
                        role="row"
                      >
                        <td className="font-normal h-[40px] pl-2">
                          {item.analysisCode}
                        </td>
                        <td className="font-normal h-[40px] min-w-[100px]">
                          {item.analysisName}
                        </td>
                        {showPrices ? (
                          <td className="font-normal h-[40px]">
                            {item.analysisPrice / 100}
                          </td>
                        ) : (
                          <td></td>
                        )}
                        {/* <td className="font-normal h-[40px]">-</td>
                      <td className="font-normal h-[40px]">-</td> */}
                        <td className="font-normal h-[40px]">
                          {item.analysisContainerName}
                        </td>
                        <td className="font-normal h-[40px] flex items-center">
                          {item.analysisCode !== "00001" ? (
                            <TubeColor color={`#${item.analysisColor}`} />
                          ) : null}
                        </td>
                        <td className="font-normal h-[40px]">
                          {item.analysisCode !== "00001" ? (
                            <StatusIndicator
                              title={getAnalysisStatusVariant(item.status)}
                              variant={item.status}
                            />
                          ) : null}
                        </td>
                        {data.status === "NEW" ? (
                          <td className="h-[40px]">
                            <div className="flex justify-center w-full print:hidden">
                              <button
                                onClick={(e) => {
                                  deleteAnalysis(e, item);
                                }}
                                disabled={isLoading || data.status !== "NEW"}
                              >
                                <XIcon size={20} color={"#4b5563"} />
                              </button>
                            </div>
                          </td>
                        ) : item.status === "SENT" ? (
                          <td className="h-[40px]">
                            <div className="flex justify-center w-full print:hidden">
                              {/* <ClockIcon size={20} color={"#4b5563"} /> */}
                            </div>
                          </td>
                        ) : (
                          <td className="h-[40px]">
                            <div className="flex justify-center w-full print:hidden">
                              <a
                                href={`https://r.vitalab.com.ua/${murmurhash.v3(
                                  data.number,
                                  8
                                )}/${item.id}.pdf`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <DownloadIcon size={20} color={"#4b5563"} />
                              </a>
                            </div>
                          </td>
                        )}
                      </tr>
                    ) : (
                      <tr
                        key={item.id}
                        className="font-normal text-xs leading-5 border-t border-b border-gray-200 text-gray-900 hover:bg-gray-50"
                        role="row"
                      >
                        <td className="font-normal h-[40px] pl-2">
                          {item.analysisCode}
                        </td>
                        <td className="font-normal h-[40px] min-w-[100px]">
                          {item.analysisName}
                        </td>
                        {showPrices ? (
                          <td className="font-normal h-[40px]">
                            {item.analysisPrice / 100}
                          </td>
                        ) : (
                          <td></td>
                        )}
                        <td className="font-normal h-[40px]"></td>
                        <td className="font-normal h-[40px] flex items-center"></td>
                        <td className="font-normal h-[40px]"></td>
                        <td className="h-[40px]"></td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* <div className="flex justify-between mt-4 items-center">
      <div></div>
      <div className="text-2xl font-semibold text-gray-900">
        test
      </div>
    </div> */}
        </div>
      </div>
      <div className="pb-8 mt-2 flex justify-end items-center gap-x-2 col-span-3 print:hidden">
        {/* <button
                type="button"
                // className="inline-flex items-center px-3 py-2 border border-gray-200 text-xs leading-4 font-semibold rounded shadow-sm text-gray-900 bg-white hover:border-gray-900 focus:outline-none transition ease-out duration-200"
                className="font-medium text-sm bg-white border-0 h-7 flex items-center py-1 px-2 rounded-md duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-[#3c4257] shadow-stripe hover:text-[#1a1f36] hover:shadow-stripeHover hover:fill-[#1a1f36] fill-[#4f566b] outline-none focus:ring focus:ring-[rgba(58,151,212,0.36)]"
                // onClick={cancelOrder}
              >
                Скасувати
              </button> */}
        <button
          type="button"
          // className="inline-flex items-center px-2.5 py-1.5 border border-gray-200 text-xs leading-4 font-semibold rounded shadow-sm text-gray-900 bg-white hover:border-gray-900 focus:outline-none transition ease-out duration-200"
          className="font-medium text-sm bg-white border-0 h-7 flex items-center py-1 px-2 rounded-md duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-[#3c4257] shadow-stripe hover:text-[#1a1f36] hover:shadow-stripeHover hover:fill-[#1a1f36] fill-[#4f566b] outline-none focus:ring focus:ring-[rgba(58,151,212,0.36)] focus:border-blue-500"
          onClick={() => window.print()}
        >
          {/* inline-flex items-center px-2.5 py-1.5 border border-gray-200 shadow-sm text-xs font-semibold rounded text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 */}
          Друк замовлення
        </button>
        <PrintLabel
          data={{
            analyzes: data.analyzes,
            number: data.number,
            patient: `${data.patient.lastName} ${data.patient.firstName} ${data.patient.middleName}`,
            partner: data.partner.organization.name,
          }}
        />
        <button
          type="button"
          // className="inline-flex items-center px-3 py-1.5 h-8 border border-gray-200 text-sm leading-4 font-semibold rounded shadow-sm text-gray-900 bg-white hover:border-gray-900 focus:outline-none transition ease-out duration-200"
          className="text-sm bg-blue-600 border-0 h-7 flex items-center py-1 px-2 rounded-md duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-white shadow-stripe fill-white outline-none focus:ring focus:ring-[rgba(58,151,212,0.36)] focus:border-blue-500 disabled:opacity-50 disabled:bg-white disabled:text-[#3c4257] disabled:fill-[#4f566b]"
          onClick={sendOrder}
          disabled={data.status !== "NEW" || user.isActive !== "TRUE"}
        >
          Надіслати замовлення до лабораторії
          <div className="-translate-y-px pl-2">
            <svg
              aria-hidden="true"
              height="12"
              width="12"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.769 7.331a.994.994 0 0 0 0 1.408 1 1 0 0 0 1.411 0l3.528-3.52a.994.994 0 0 0 0-1.407L12.18.292a1 1 0 0 0-1.411 0 .994.994 0 0 0 0 1.408l1.86 1.855H7.982A2.99 2.99 0 0 0 4.99 6.542v4.48a.997.997 0 0 0 1.995 0v-4.48c0-.55.447-.996.998-.996h4.576L10.77 7.331Z"
                fillRule="evenodd"
              ></path>
              <path
                d="M.998 11.022c.55 0 .998.446.998.996v1.99h11.973v-1.99a.997.997 0 0 1 1.995 0v2.986c0 .55-.446.996-.997.996H.997A.997.997 0 0 1 0 15.004v-2.986c0-.55.447-.996.998-.996Z"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
        </button>
      </div>
    </>
  );
};

export default OrderAnalyzesTable;
