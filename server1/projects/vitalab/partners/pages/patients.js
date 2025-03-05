import Head from "next/head";
import fetcher from "../lib/fetcher";
import { useSession } from "next-auth/react";
import Link from "next/link";
import PatientItem from "../components/Patients/PatientItem";
import useSWR from "swr";
import AddPatientSlidePanel from "../components/organisms/add-pacient-slide-panel";
import AddPatientModal from "../components/organisms/add-patient-modal";
import { useState } from "react";
import PatientsTable from "../components/Patients/PatientsTable";
import IconTooltip from "../components/atoms/icon-tooltip";

// export async function getServerSideProps() {
//   // Get all patients
//   const allPatients = await prisma.patient.findMany();
//   // Pass the data to the patientList component
//   return {
//     props: {
//       allPatients: JSON.parse(JSON.stringify(allPatients)),
//     },
//   };
// }

export default function Patients() {
  //{ allPatients = [] }
  const { data: session, status } = useSession();
  const { data: patients, error } = useSWR("/api/users", fetcher, {
    refreshInterval: 1000,
    refreshWhenHidden: true,
  });

  // console.log(status);
  if (status === "loading") {
    return <p>Loading!</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied!</p>;
  }

  // console.log(patients);
  if (error) return "An error has occurred.";
  if (!patients) return "Loading...";

  // console.log("session", session);

  // console.log(allPatients);

  // console.log("session:", session);
  return (
    <>
      <Head>
        <title>Партнери VitaLab</title>
        <meta name="description" content="Партнери VitaLab" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-4 sm:mx-8 md:mx-14 xl:mx-auto xl:max-w-7xl xl:w-full">
        <div className="flex flex-col grow h-full">
          <div className="rounded-lg border bg-gray-0 border-gray-200 h-full overflow-hidden flex flex-col min-h-[350px] w-full">
            <div className="pt-medium px-8 flex flex-col grow overflow-y-auto">
              <div className="flex items-center justify-between mt-6 h-8">
                <div>
                  <div className="flex leading-6 font-semibold gap-x-4 text-gray-400">
                    <div className="cursor-pointer text-gray-900">Пацієнти</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div>
                    {/* <Link href="/patients/add">
                      <a className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-500 transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Додати пацієнта
                      </a>
                    </Link> */}
                    {/* <AddPatientSlidePanel /> */}
                    <AddPatientModal />
                  </div>
                </div>
              </div>
              <div className="flex flex-col grow my-8">
                <div className="w-full h-full overflow-y-auto flex flex-col justify-between">
                  <PatientsTable patients={patients} />
                  {/* <table className="w-full table-auto">
                      <thead className="text-xs leading-5 whitespace-nowrap font-semibold text-gray-500 border-t border-b border-gray-200">
                        <tr className="">
                          <th
                            className="text-left h-[40px] w-[100px]"
                            colSpan="1"
                          >
                            Телефон
                          </th>
                          <th
                            className="text-left h-[40px] w-[200px]"
                            colSpan="1"
                          >
                            ФИО
                          </th>
                          <th
                            className="text-left h-[40px] w-[100px]"
                            colSpan="1"
                          >
                            Дата рождения
                          </th>
                          <th
                            className="text-left h-[40px] w-[50px]"
                            colSpan="1"
                          >
                            Пол
                          </th>
                          <th
                            className="text-left h-[40px] w-[100px]"
                            colSpan="1"
                          >
                            E-mail
                          </th>
                          <th
                            className="text-left h-[40px] w-[100px]"
                            colSpan="1"
                          >
                            Последний заказ
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {patients.patients.map((patient) => (
                          <PatientItem key={patient.id} {...patient} />
                        ))}
                      </tbody>
                    </table> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
