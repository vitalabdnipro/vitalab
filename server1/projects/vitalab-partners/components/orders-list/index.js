import { useContext } from "react";
import { PatientContext } from "../../context/patient";
import ItemLine from "./item-line";

const OrdersList = ({ onSwitchOrderForm }) => {
  const context = useContext(PatientContext);
  // const {setIsOrderFormOpen} = props;

  return (
    <div className="rounded-md border bg-white border-gray-200 h-full overflow-hidden flex flex-col min-h-[350px] w-full relative">
      <div className="pt-medium px-8 flex flex-col grow overflow-y-auto">
        <div className="flex items-center justify-between mt-6 h-8">
          <h1 className="font-semibold text-2xl text-gray-900">
            Замовлень {`(${context.length})`}
          </h1>
          <div className="flex items-center space-x-2">
            <div>
              {/* <button onClick={() => onSwitchOrderForm(true)} className="inline-flex h-10 leading-10 items-center px-[14px] py-2 border border-transparent text-sm font-medium rounded-[4px] shadow-md text-white bg-blue-500 hover:bg-blue-400 hover:-translate-y-px focus:outline-none transition ease-in duration-150"> */}
              <button
                onClick={() => onSwitchOrderForm(true)}
                className="text-sm bg-blue-600 border-0 h-7 flex items-center py-1 px-2 rounded-md duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-white shadow-stripe fill-white outline-none focus:ring focus:ring-[rgba(58,151,212,0.36)]"
              >
                <svg
                  aria-hidden="true"
                  height="12"
                  width="12"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    d="M9 7h6a1 1 0 0 1 0 2H9v6a1 1 0 0 1-2 0V9H1a1 1 0 1 1 0-2h6V1a1 1 0 1 1 2 0z"
                    fillRule="evenodd"
                  ></path>
                </svg>
                Створити замовлення
              </button>
            </div>
          </div>
        </div>
        <h3 className="text-xs pt-1.5 text-gray-500">
          Огляд замовлень пацієнта
        </h3>
        <div className="flex flex-col grow my-6">
          <div className="flex grow flex-col pt-2 mt-6">
            <div className="w-full h-full overflow-y-auto">
              <div className="flex flex-col">
                <div className="w-full flex justify-between mb-2"></div>
                <table className="w-full table-auto">
                  <thead className="whitespace-nowrap font-semibold text-xs text-gray-500 border-t border-b border-gray-200">
                    <tr>
                      <th className="text-left h-[40px] w-[200px]">
                        Замовлення
                      </th>
                      <th className="text-left h-[40px]">Дата</th>
                      <th className="text-left h-[40px]">Статус</th>
                      <th className="text-left h-[40px]">Вартість</th>
                    </tr>
                  </thead>
                  <tbody>
                    {context.map((item) => {
                      return <ItemLine key={item.id} {...item} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
