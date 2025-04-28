import TubeColor from "../../molecules/tube-color";

const EditOrder = ({ data, onSetEdit }) => {
  console.log(data);
  const analyzes = [...data.analyzes];
  console.log(analyzes);
  return (
    <>
      <div className="col-span-3 rounded-lg border bg-white border-gray-200 overflow-hidden relative w-full min-h-0">
        <div className="px-8 flex flex-col grow overflow-y-auto">
          <div className="flex items-center justify-between mt-6 h-8">
            <h1 className="font-semibold text-2xl text-gray-900">Аналізи</h1>
            <div className="flex items-center space-x-2"></div>
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
                    </th>
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
                      Ціна (грн)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.analyzes.map((item, i) => (
                    <tr
                      key={i}
                      className="font-normal text-xs leading-5 border-t border-b border-gray-200 text-gray-900 cursor-pointer hover:bg-gray-50"
                      role="row"
                    >
                      <td className="font-normal h-[40px] pl-2">
                        {item.analysisCode}
                      </td>
                      <td className="font-normal h-[40px] min-w-[100px]">
                        {item.analysisName}
                      </td>

                      <td className="font-normal h-[40px]">-</td>
                      <td className="font-normal h-[40px]">-</td>
                      <td className="font-normal h-[40px]">
                        {item.analysisContainerName}
                      </td>
                      <td className="font-normal h-[40px] flex items-center">
                        <TubeColor color={`#${item.analysisColor}`} />
                      </td>
                      <td className="font-normal h-[40px]">
                        {item.analysisPrice / 100}
                      </td>
                    </tr>
                  ))}
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
      <div className="pb-8 mt-2 flex justify-end items-center gap-x-2 col-span-3">
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
          // className="inline-flex items-center px-3 py-2 border border-gray-200 text-xs leading-4 font-semibold rounded shadow-sm text-gray-900 bg-white hover:border-gray-900 focus:outline-none transition ease-out duration-200"
          className="font-medium text-sm bg-white border-0 h-7 flex items-center py-1 px-2 rounded-md duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-[#3c4257] shadow-stripe hover:text-[#1a1f36] hover:shadow-stripeHover hover:fill-[#1a1f36] fill-[#4f566b] outline-none focus:ring focus:ring-[rgba(58,151,212,0.36)]"
          onClick={() => onSetEdit(false)}
        >
          Скасувати
        </button>
        <button
          type="button"
          // className="inline-flex items-center px-3 py-1.5 h-8 border border-gray-200 text-sm leading-4 font-semibold rounded shadow-sm text-gray-900 bg-white hover:border-gray-900 focus:outline-none transition ease-out duration-200"
          className="text-sm bg-blue-600 border-0 h-7 flex items-center py-1 px-2 rounded-md duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-white shadow-stripe fill-white outline-none focus:ring focus:ring-[rgba(58,151,212,0.36)] focus:border-blue-500 disabled:opacity-50 disabled: disabled:bg-white disabled:text-[#3c4257] disabled:fill-[#4f566b]"
          onClick={console.log("ggg")}
        >
          Зберегти
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

export default EditOrder;
