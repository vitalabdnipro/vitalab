import { useSession } from "next-auth/react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import BodyCard from "../components/organisms/body-card";
import PartnersTable from "../domain/partners/table";
import CustomTableHeader from "../components/molecules/custom-table-header";
import PlusIcon from "../components/fundamentals/icons/plus-icon";
import AddPartnerModal from "../components/organisms/add-partner-modal";

const Partners = () => {
  const { data: session, status } = useSession();
  const { data: partners, error } = useSWR("/api/partners", fetcher, {
    refreshInterval: 1000,
    refreshWhenHidden: true,
  });

  if (status === "loading") {
    return <p>Loading!</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied!</p>;
  }

  // console.log(patients);
  if (error) return "An error has occurred.";
  if (!partners) return "Loading...";

  if (!session) return <div>loading...</div>;
  if (session.user.role !== "ADMIN") return;

  // const actionables = [
  //   {
  //     label: "Додати партнера",
  //     onClick: () => console.log("add"),
  //     icon: <PlusIcon size="18" className="mr-2" />,
  //   },
  // ];

  return (
    <div className="flex flex-col grow h-full">
      <div className="w-full flex flex-col grow">
        <BodyCard
          customHeader={<CustomTableHeader name="Партнери" />}
          customActionable={<AddPartnerModal />}
        >
          <div className="w-full overflow-y-auto flex flex-col justify-between min-h-[300px] h-full">
            <div className="flex flex-col">
              <div className="w-full flex justify-between mb-2 print:hidden"></div>
              <PartnersTable partners={partners} />
            </div>
          </div>
        </BodyCard>
      </div>
    </div>
  );

  //   return (
  //     <div className="mx-4 sm:mx-8 md:mx-14 xl:mx-auto xl:max-w-7xl xl:w-full">
  //       <div className="flex flex-col grow h-full">
  //         <div className="rounded-lg border bg-gray-0 border-gray-200 h-full overflow-hidden flex flex-col min-h-[350px] w-full">
  //           <div className="pt-medium px-8 flex flex-col grow overflow-y-auto">
  //             <div className="flex items-center justify-between mt-6 h-8">
  //               <div>
  //                 <div className="flex leading-6 font-semibold gap-x-4 text-gray-400">
  //                   <div className="cursor-pointer text-gray-900">Пацієнти</div>
  //                 </div>
  //               </div>
  //               <div className="flex items-center space-x-2">
  //                 <div>
  //                   {/* <Link href="/patients/add">
  //                       <a className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-500 transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
  //                         <svg
  //                           xmlns="http://www.w3.org/2000/svg"
  //                           className="h-4 w-4 mr-2"
  //                           viewBox="0 0 20 20"
  //                           fill="currentColor"
  //                         >
  //                           <path
  //                             fillRule="evenodd"
  //                             d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
  //                             clipRule="evenodd"
  //                           />
  //                         </svg>
  //                         Додати пацієнта
  //                       </a>
  //                     </Link> */}
  //                   {/* <AddPatientSlidePanel /> */}
  //                   {/* <AddPatientModal /> */}
  //                   addpartner
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="flex flex-col grow my-8">
  //               <div className="w-full h-full overflow-y-auto flex flex-col justify-between">
  //                 <PartnersTable partners={partners} />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default Partners;
