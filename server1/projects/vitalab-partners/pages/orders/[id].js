import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect, useState } from "react";
import StatusIndicator from "../../components/fundamentals/status-indicator";
import fetcher from "../../lib/fetcher";
import { getOrderStatusVariant } from "../../lib/order-status-variant";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import dayjs from "dayjs";
import uk from "dayjs/locale/uk";
import OrderMenu from "../../components/molecules/order-menu";
import OrderAnalyzesTable from "../../components/organisms/order-analyzes-table";
import EditOrder from "../../components/organisms/edit-order";
import { getInitials } from "../../lib/get-initials";

function OrderDetails() {
  const [edit, setEdit] = useState(false);
  const [showPrices, setShowPrices] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(id ? `/api/orders/${id}` : null, fetcher, {
    refreshInterval: 1000,
    refreshWhenHidden: true,
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (data && data.note !== "") {
      setValue("note", data.note);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = (data) => {
    onSetOrderNumber(data.number);
    setOpen(false);
  };

  const handleBlur = async (data) => {
    // console.log("test", data);

    const res = await fetch("/api/orders/notes/", {
      body: JSON.stringify({
        id,
        note: data.note,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();
    if (error) {
      console.log(error);
      // setForm({
      //   state: Form.Error,
      //   message: error,
      // });
      // return;
    }
  };

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  return (
    // <div className="xl:px-8 py-8 bg-gray-50 min-h-[calc(100vh-56px)] overflow-y-auto">
    <div className="mx-4 sm:mx-8 md:mx-14 xl:mx-auto xl:max-w-7xl 2xl:w-full h-full">
      <div className="h-full" style={{ outline: "none" }}>
        <div style={{ outline: "none" }}>
          <div className="w-full flex items-center text-xs font-semibold text-gray-500 mb-4 print:hidden">
            <Link href={`/patients`}>
              <a className="text-blue-500 cursor-pointer">Пацієнти</a>
            </Link>
            <span className="mx-0.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
            <Link href={`/patients/${data.patient.id}`}>
              <a className="text-blue-500 cursor-pointer">
                {getInitials(
                  `${data.patient.lastName} ${data.patient.firstName}`
                )}
              </a>
            </Link>
            <span className="mx-0.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
            <span>Детали заказа</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-full print:col-span-3">
              <div className="rounded-lg border bg-white border-gray-200 h-full overflow-hidden flex flex-col w-full relative mb-4 min-h-[200px] print:border-none">
                <div className="px-8 flex flex-col grow overflow-y-auto print:px-2">
                  <div className="flex items-center justify-between mt-6 h-8">
                    <div>
                      <button
                        type="text"
                        className="text-2xl font-semibold text-gray-900 active:text-violet-900 cursor-pointer gap-x-2 flex items-center"
                      >
                        #{data.number}
                      </button>
                    </div>
                    <div className="flex items-center space-x-2 print:hidden">
                      <StatusIndicator
                        title={getOrderStatusVariant(data.status)}
                        variant={data.status}
                      ></StatusIndicator>
                      <OrderMenu
                        onSetShowPrices={setShowPrices}
                        onSetEdit={setEdit}
                        status={data.status}
                      />
                    </div>
                  </div>
                  <h3 className="text-xs pt-1.5 text-gray-500">
                    {dayjs(data.createdAt)
                      .locale("uk")
                      .format("D MMMM YYYY HH:mm")}
                  </h3>
                  <div className="flex flex-col grow my-6">
                    <div className="flex mt-6 space-x-6 divide-x">
                      <div className="flex flex-col">
                        <div className="text-sm text-gray-500 mb-1">
                          Партнер
                        </div>
                        {/* <div className="text-gray-900 active:text-violet-900 cursor-pointer gap-x-1 flex items-center"> */}
                        <div className="text-sm">
                          {data.partner.name}
                          {data.partner.organization.name
                            ? ` ${data.partner.organization.name}`
                            : ""}
                        </div>
                      </div>
                      <div className="flex flex-col pl-6">
                        <div className="text-sm text-gray-500 mb-1">
                          ПІБ пацієнта
                        </div>
                        <div className="text-sm">{`${data.patient.lastName} ${
                          data.patient.firstName
                        } ${
                          data.patient.middleName ? data.patient.middleName : ""
                        }`}</div>
                      </div>
                      <div className="flex flex-col pl-6">
                        <div className="text-sm text-gray-500 mb-1">
                          Дата народження
                        </div>
                        <div className="text-sm">
                          {dayjs(data.patient.birthday).format("DD.MM.YYYY")}
                        </div>
                      </div>
                      {showPrices ? (
                        <div className="flex flex-col pl-6">
                          <div className="text-sm text-gray-500 mb-1">
                            Сума замовлення
                          </div>
                          <div className="text-sm">{data.total} грн</div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="min-h-[24px]"></div>
              </div>
            </div>
            <div className="rounded-lg bg-white border border-gray-200 h-60 print:hidden">
              <div className="py-6 px-8 border-gray-200 h-full">
                <form
                  className="h-full relative"
                  onBlur={handleSubmit(handleBlur)}
                >
                  <label
                    htmlFor="note"
                    className="absolute -top-2 left-3 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                  >
                    Примітка до замовлення
                  </label>
                  <div className="h-full flex items-center py-3 px-3.5 min-h-full bg-gray-100 border border-gray-200 rounded-lg focus-within:border-gray-400 focus-within:shadow-[0_0_0_2px_rgba(62,207,142,.1)] ">
                    {/* <textarea
                        className="h-full flex-grow bg-transparent font-light text-sm placeholder:text-gray-400 focus:outline-none resize-none"
                        name="notes"
                        id="notes-textarea"
                        cols="30"
                        autoComplete="off"
                        placeholder="Примітка до замовлення..."
                        maxLength ="240"
                      ></textarea> */}
                    <textarea
                      {...register("note", {
                        maxLength: 240,

                        // onBlur: (e) => console.log(e.target.value),
                      })}
                      id="note"
                      autoComplete="off"
                      cols="30"
                      placeholder="Додайте примітку до замовлення"
                      className="h-full flex-grow bg-transparent font-light text-sm placeholder:text-gray-400 focus:outline-none resize-none"
                    />
                  </div>
                </form>
              </div>
            </div>
            <OrderAnalyzesTable showPrices={showPrices} data={data} />
            {/* <div className="mt-6"></div> */}
          </div>
          {data.note ? (
            <div className="text-xs hidden print:block">
              Примітка до замовлення: {data.note}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>

    // </div>
  );
}

export default OrderDetails;
