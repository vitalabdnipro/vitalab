import { useContext, useCallback, useState } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { PatientContext } from "../../context/patient";
import debounce from "lodash/debounce";
import AsyncSelect from "react-select/async";
import axios from "axios";
import SearchAnalysisModal from "../organisms/search-analysis-modal";
import Link from "next/link";
import { useRouter } from "next/router";
import { saveOrder } from "../../lib/db";
import SetOrderNumberModal from "../organisms/set-order-number-modal";
import { sendOrderTL } from "../../lib/terralab";
import AddNoteModal from "../organisms/add-note-modal";
import TubeColor from "../molecules/tube-color";
import toast, { Toaster } from "react-hot-toast";
import useNotification from "../../hooks/useNotification";

const NewOrder = ({ patient, onSwitchOrderForm }) => {
  const [analysis, setAnalysis] = useState([]);
  const [orderNumber, setOrderNumber] = useState(null);
  const [note, setNote] = useState("");
  const router = useRouter();
  const context = useContext(PatientContext);
  const notification = useNotification();
  const { register, control, handleSubmit, reset, watch } = useForm();

  const { id } = router.query;

  const components = {
    DropdownIndicator: null,
    IndicatorSeparator: null,
  };

  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: "test",
    });

  const cancelOrder = () => {
    onSwitchOrderForm(false);
  };

  const sumOrder = () => {
    let sum = analysis.reduce((prev, { searchInput: { price } }) => {
      return prev + price;
    }, 0);

    return sum / 100;
  };

  const createOrder = async (send) => {
    if (analysis.length == 0) return;

    const total = sumOrder();

    let data = {
      patientId: patient.id,
      orderNumber,
      analysis: analysis,
      total,
      note,
    };

    // const order = await saveOrder(data);
    notification("Збереження замовлення...", "loading");

    const saveOrder = await fetch(`/api/orders/`, {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const { number } = await saveOrder.json();

    if (send) {
      notification("Відправлення замовлення...", "loading");

      const res = await fetch(`/api/lab/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number }),
      });

      const { error } = await res.json();
      console.log(error);

      console.log("sended:", number);
      notification("Замовлення відправлено", "success");
    } else {
      notification("Чернетка збережено", "success");
    }

    onSwitchOrderForm(false);
  };

  // const getAsyncOptions = (inputText) => {
  //   const candidate = inputText.toLowerCase();
  //   const byLabel = ({ label }) => label.toLowerCase().includes(candidate);
  //   // remove this line and uncomment below to try with your impementation
  //   // return new Promise((resolve) =>
  //   //   setTimeout(resolve, 1, options.filter(byLabel))
  //   // );

  //   return axios
  //     .get(`https://jsonplaceholder.typicode.com/users/${inputText}`)
  //     .then((response) => {
  //       return [
  //         {
  //           label: response.data.name,
  //           value: response.data.id,
  //         },
  //       ];
  //     })
  //     .catch((error) => {
  //       alert(JSON.stringify(error));
  //     });
  // };

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const loadOptions = useCallback(
  //   debounce((inputText, callback) => {
  //     getAsyncOptions(inputText).then((options) => callback(options));
  //   }, 1000),
  //   []
  // );

  const [inputValue, setInputValue] = useState("");

  const onSubmit = (data) => console.log("data", data);

  const handleInputChange = (event) => {
    setInputValue((event) => event);
  };

  // export default class WithCallbacks extends Component<{}, State> {
  //   state: State = { inputValue: '' };
  //   const handleInputChange = (newValue) => (newValue) => {
  //     const inputValue = newValue.replace(/\W/g, '');
  //     this.setState({ inputValue });
  //     return inputValue;
  //   };

  // const watchResult = watch("test");
  // console.log(watchResult);

  // The following is useWatch example
  // console.log(useWatch({ name: "test", control }));

  return (
    <>
      <div className="rounded-md border bg-white border-gray-200 h-full overflow-hidden flex flex-col min-h-[350px] w-full relative">
        <div className="pt-medium px-8 flex flex-col grow overflow-y-auto">
          <div className="flex items-center justify-between mt-6 h-8">
            <h5 className="font-semibold text-lg text-gray-900">
              {orderNumber
                ? `Нове замовлення #${orderNumber}`
                : "Нове замовлення"}
            </h5>
            <div className="flex items-center space-x-2">
              {/* <button className="items-center rounded flex justify-center text-xs font-semibold leading-5 py-[6px] px-3 border border-gray-200 bg-white text-gray-900">
                Встановити номер замовлення
              </button> */}
              {/* <button
                type="button"
                className="inline-flex items-center px-2.5 py-1.5 border border-gray-200 shadow-sm text-xs font-semibold rounded text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Встановити номер замовлення
              </button> */}
              <SetOrderNumberModal onSetOrderNumber={setOrderNumber} />
              <AddNoteModal note={note} onSetNote={setNote} />
              <SearchAnalysisModal
                analysis={analysis}
                onSetAnalysis={setAnalysis}
              />
            </div>
          </div>
          <h3 className="text-xs pt-1.5 text-gray-500">
            {`Створення нового замовлення для ${patient.lastName} ${patient.firstName}`}
          </h3>
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <div className="flex flex-col grow my-6">
            <div className="flex grow flex-col pt-2 mt-6">
              <div className="w-full h-full overflow-y-auto">
                <div className="flex flex-col">
                  <div className="w-full flex justify-between mb-2"></div>
                  <table className="w-full table-auto">
                    <thead className="whitespace-nowrap font-semibold text-xs text-gray-500 border-t border-b border-gray-200">
                      <tr>
                        <th className="text-left h-[40px] w-[3%]">Код</th>
                        <th className="text-left h-[40px] w-1/2">Название</th>
                        <th className="text-left h-[40px] w-[7%]">
                          Цена (грн)
                        </th>
                        <th className="text-left h-[40px] w-[30%]">
                          Контейнер
                        </th>
                        <th className="text-left h-[40px] w-[10%]">
                          Колір пробірки
                        </th>

                        {/* <th className="h-[40px] w-[2%]"></th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {analysis.map((item, index) => {
                        // <PatientItem key={patient.id} {...patient} />
                        // const { label, value } = item.searchInput;

                        const {
                          label,
                          value,
                          price,
                          colorTube,
                          containerName,
                        } = item.searchInput;

                        return (
                          <tr
                            key={index}
                            className="border-b border-gray-200 text-gray-900"
                          >
                            <td className="h-[53px]">{value}</td>
                            <td className="h-[53px] ml-15">
                              <span>{label}</span>
                            </td>

                            <td className="h-[53px]">{price / 100}</td>
                            <td className="h-[53px]">
                              <span className="truncate ...">
                                {containerName}
                              </span>
                            </td>
                            <td className="h-[53px] flex items-center">
                              <TubeColor color={`#${colorTube}`} />
                            </td>
                            {/* <td className="h-[53px] ml-10">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="sbui-icon "
                              >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                            </td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
      <div className="mt-6"></div>
      <div className="mt-4 pb-8 flex justify-end items-center gap-x-2">
        <button
          type="button"
          // className="inline-flex items-center px-3 py-2 border border-gray-200 text-xs leading-4 font-semibold rounded shadow-sm text-gray-900 bg-white hover:border-gray-900 focus:outline-none transition ease-out duration-200"
          className="font-medium text-sm bg-white border-0 h-7 flex items-center py-1 px-2 rounded-md duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-[#3c4257] shadow-stripe hover:text-[#1a1f36] hover:shadow-stripeHover hover:fill-[#1a1f36] fill-[#4f566b] outline-none focus:ring focus:ring-[rgba(58,151,212,0.36)]"
          onClick={cancelOrder}
        >
          Скасувати
        </button>
        <button
          type="button"
          className="font-medium text-sm bg-white border-0 h-7 flex items-center py-1 px-2 rounded-md duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-[#3c4257] shadow-stripe hover:text-[#1a1f36] hover:shadow-stripeHover hover:fill-[#1a1f36] fill-[#4f566b] disabled:opacity-50 outline-none focus:ring focus:ring-[rgba(58,151,212,0.36)]"
          onClick={() => createOrder(false)}
          disabled={!analysis.length}
        >
          Зберегти як чернетку
        </button>
        <button
          type="button"
          // className="inline-flex items-center px-3 py-1.5 h-8 border border-gray-200 text-sm leading-4 font-semibold rounded shadow-sm text-gray-900 bg-white hover:border-gray-900 focus:outline-none transition ease-out duration-200"
          className="text-sm bg-blue-600 border-0 h-7 flex items-center py-1 px-2 rounded-md duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-white shadow-stripe fill-white outline-none focus:ring focus:ring-[rgba(58,151,212,0.36)] focus:border-blue-500 disabled:opacity-50 disabled: disabled:bg-white disabled:text-[#3c4257] disabled:fill-[#4f566b]"
          onClick={() => createOrder(true)}
          disabled={!analysis.length}
        >
          Відправити замовлення
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

export default NewOrder;
