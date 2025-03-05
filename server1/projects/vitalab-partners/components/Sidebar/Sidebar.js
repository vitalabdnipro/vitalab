import Link from "next/link";
import { useSession } from "next-auth/react";

import Logo from "../Logo";
import SidebarMenuItem from "../SidebarMenuItem";
import UserPlusIcon from "../fundamentals/icons/user-plus-icon";
import RefreshIcon from "../fundamentals/icons/refresh-icon";
import AddPartnerModal from "../organisms/add-partner-modal";
import ReloadOrderModal from "../organisms/reload-order-modal";

const Sidebar = () => {
  const { data: session, status } = useSession();

  if (!session) {
    console.log(session);
    return <div>loading...</div>;
  }

  return (
    <div className="min-w-[240px] max-w-[240px] overflow-y-auto bg-white border-r border-gray-200 py-4 px-4 print:hidden">
      <div className="h-full">
        <Logo />
        <div className="border-b pb-3.5 border-gray-200">
          <SidebarMenuItem
            href={"/patients"}
            text={"Пацієнти"}
            icon={
              <svg
                data-testid="geist-icon"
                fill="none"
                height="20"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="20"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
                <path d="M16 3.13a4 4 0 010 7.75"></path>
              </svg>
            }
          />
          {/* <SidebarMenuItem href={"/orders"} icon={"X"} text={"Заказы"}  /> */}
          <SidebarMenuItem
            href={"/reports"}
            text={"Звіт"}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sbui-icon"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            }
          />
          <SidebarMenuItem
            href={"/price"}
            text={"Аналізи"}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-list"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            }
          />
        </div>
        {session.user.role === "ADMIN" ? (
          <div className="mt-5">
            <SidebarMenuItem
              href={"/partners"}
              text={"Партнери"}
              icon={<UserPlusIcon size={20} />}
            />
            <ReloadOrderModal />
          </div>
        ) : null}
        {/* <div className="font-semibold mt-5 flex flex-col text-xs">
          <div className="border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Добавить партнера</span>
            </div>
            <div className="flex items-center bg-white px-2.5 py-1.5 cursor-pointer text-blue-600">
              <div className="w-[24px] h-[24px]  bg-blue-200 text-blue-600 rounded-full text-center flex justify-center items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 4.16667V15.8333"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M4.16699 10H15.8337"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <span className="ml-2.5">Добавить</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
