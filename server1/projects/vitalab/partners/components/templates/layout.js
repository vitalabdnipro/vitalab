import { Sidebar } from "../Sidebar";
import { Topbar } from "../Topbar";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  console.log(router.pathname !== "/reports" && "hi!!");
  return (
    <div className="flex w-full h-screen font-normal text-sm text-gray-900">
      {/* <Navbar /> */}
      {router.pathname !== "/reports" ? (
        <style type="text/css" media="print">
          {` @page { size: portrait; } `}
        </style>
      ) : (
        <style type="text/css" media="print">
          {` @page { size: landscape; } `}
        </style>
      )}
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <div className="2xl:px-8 py-8 bg-gray-50 min-h-[calc(100vh-56px)] overflow-y-auto print:overflow-visible">
          <main className="mx-4 sm:mx-8 md:mx-14 2xl:mx-auto 2xl:max-w-7xl 2xl:w-full h-full">
            {/* <div className="h-full" tabIndex={-1} style={{ outline: "none" }}> */}
            {children}
            {/* </div> */}
          </main>
        </div>
      </div>
    </div>
  );
}
