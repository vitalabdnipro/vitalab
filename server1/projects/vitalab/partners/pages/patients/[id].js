import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import OrdersList from "../../components/orders-list";
import { PatientContext } from "../../context/patient";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import { useRouter } from "next/router";
import NewOrder from "../../components/orders-list/NewOrder";
import PatientMenu from "../../components/molecules/patient-menu";
import EditPatientModal from "../../components/molecules/edit-patient-modal";
import dayjs from "dayjs";

// export const getServerSideProps = async (context) => {
//   const session = await getSession({ context });

//   const patient = await prisma.patient.findUnique({
//     where: {
//       id: String(context.params.id),
//     },
//     include: {
//       orders: {
//         orderBy: {
//           createdAt: "desc",
//         },
//       },
//     },
//   });

//   return {
//     props: JSON.parse(JSON.stringify(patient)),
//   };
//   // allPatients: JSON.parse(JSON.stringify(allPatients)),
// };

export default function PatientCard(props) {
  const router = useRouter();
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const { id, order } = router.query;

  useEffect(() => {
    if (order) {
      setIsOrderFormOpen(order);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: patient, error } = useSWR(
    id ? `/api/patients/${id}` : null,
    fetcher,
    {
      refreshInterval: 1000,
      refreshWhenHidden: true,
    }
  );

  if (error) return "An error has occurred.";
  if (!patient) return "Loading...";

  return (
    <PatientContext.Provider value={patient.orders}>
      {/* <div className="xl:px-8 py-8 bg-gray-50 min-h-[calc(100vh-56px)] overflow-y-auto"> */}
      <div className="mx-4 sm:mx-8 md:mx-14 xl:mx-auto xl:max-w-7xl 2xl:w-full h-full">
        <div className="h-full" style={{ outline: "none" }}>
          <div style={{ outline: "none" }}>
            <div className="w-full flex items-center text-xs font-semibold text-gray-500 mb-4">
              <Link href={`/patients`} legacyBehavior>
                <a className="text-violet-600 cursor-pointer">Пацієнти</a>
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
              <span>Відомості про пацієнта</span>
            </div>
            <div className="rounded-lg border bg-white border-gray-200 h-full overflow-hidden flex flex-col min-h-[350px] relative w-full pt-[100px] mb-4">
              <div className="px-8 flex flex-col grow overflow-y-auto">
                <div className="flex items-center justify-between mt-6 h-8" />
                <div className="flex flex-col grow my-6">
                  <div className="h-[120px] w-full absolute top-0 right-0 left-0 bg-gradient-to-b from-blue-200 z-0"></div>
                  <div className="flex flex-col grow overflow-y-auto">
                    <div className="flex items-center justify-between">
                      <h1 className="font-semibold text-2xl text-gray-900 truncate max-w-[50%]">
                        {`${patient.lastName} ${patient.firstName} ${
                          patient.middleName ? patient.middleName : ""
                        }`}
                      </h1>
                      <div>
                        <EditPatientModal patient={patient} />
                      </div>
                    </div>
                    <div className="text-xs pt-1.5 text-gray-500"></div>
                  </div>
                  <div className="flex mt-6 space-x-6 divide-x">
                    <div className="flex flex-col">
                      <div className="text-sm text-gray-500 mb-1 leading-6">
                        Телефон
                      </div>
                      <div className="text-sm leading-6">{patient.phone}</div>
                    </div>
                    {patient.email && (
                      <div className="flex flex-col pl-6">
                        <div className="text-sm text-gray-500 mb-1 leading-6">
                          Електронна пошта
                        </div>
                        <div className="text-sm leading-6">{patient.email}</div>
                      </div>
                    )}
                    <div className="flex flex-col pl-6">
                      <div className="text-sm text-gray-500 mb-1 leading-6">
                        Стать
                      </div>
                      <div className="text-sm leading-6">{patient.gender}</div>
                    </div>
                    <div className="flex flex-col pl-6">
                      <div className="text-sm text-gray-500 mb-1 leading-6">
                        Дата народження
                      </div>
                      <div className="text-sm leading-6">
                        {dayjs(patient.birthday).format("DD.MM.YYYY")}
                      </div>
                    </div>
                    <div className="flex flex-col pl-6">
                      <div className="text-sm text-gray-500 mb-1 leading-6">
                        Останнє замовлення
                      </div>
                      <div className="text-sm leading-6">
                        {patient.lastOrder
                          ? `${patient.lastOrder} (${dayjs(
                              patient.lastOrderCreated
                            ).format("DD.MM.YYYY HH:mm")})`
                          : "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="min-h-[24px]" />
            </div>
            {!isOrderFormOpen ? (
              <OrdersList onSwitchOrderForm={setIsOrderFormOpen} />
            ) : (
              <NewOrder
                patient={patient}
                onSwitchOrderForm={setIsOrderFormOpen}
              />
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </PatientContext.Provider>
  );
}
