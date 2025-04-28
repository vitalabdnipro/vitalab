import TopbarUser from "../organisms/user-topbar";
import { Toaster } from "react-hot-toast";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";

const Topbar = () => {
  const { data: user, error } = useSWR(`/api/users/`, fetcher);

  if (!user) return "Loading...";

  return (
    <div className="w-full min-h-[56px] max-h-[56px] pr-8 pl-4 border-b border-gray-200 sticky top-0 flex items-center justify-between z-40 print:hidden">
      <div className="mx-auto">
        {user.isActive !== "TRUE" && (
          <div className="font-semibold text-red-700">
            Цей особистий кабінет вимкнено. Зверніться будь-ласка до Vitalab
          </div>
        )}
      </div>
      {/* <button className="flex basis-1/2 items-center px-small py-[6px]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-400"
        >
          <title>Search</title>
          <path
            d="M20.4696 21.5303C20.7625 21.8232 21.2373 21.8232 21.5302 21.5303C21.8231 21.2374 21.8231 20.7626 21.5302 20.4697L20.4696 21.5303ZM17.1802 16.1197C16.8873 15.8268 16.4125 15.8268 16.1196 16.1197C15.8267 16.4126 15.8267 16.8874 16.1196 17.1803L17.1802 16.1197ZM18.25 11C18.25 15.0041 15.0041 18.25 11 18.25V19.75C15.8325 19.75 19.75 15.8325 19.75 11H18.25ZM11 18.25C6.99594 18.25 3.75 15.0041 3.75 11H2.25C2.25 15.8325 6.16751 19.75 11 19.75V18.25ZM3.75 11C3.75 6.99594 6.99594 3.75 11 3.75V2.25C6.16751 2.25 2.25 6.16751 2.25 11H3.75ZM11 3.75C15.0041 3.75 18.25 6.99594 18.25 11H19.75C19.75 6.16751 15.8325 2.25 11 2.25V3.75ZM21.5302 20.4697L17.1802 16.1197L16.1196 17.1803L20.4696 21.5303L21.5302 20.4697Z"
            fill="currentColor"
          ></path>
        </svg>
        <div className="ml-5">
          <div className="flex items-center text-gray-400">
            <p className="m-0 font-semibold text-sm">
              <span className="font-semibold text-sm">Ctrl K</span>
            </p>
          </div>
        </div>

        <span className="ml-2 text-gray-400 text-sm">Пошук...</span>
      </button> */}
      <Toaster
        containerStyle={{
          top: 67,
          left: 24,
          bottom: 24,
          right: 24,
        }}
      />
      <div className="flex items-center">
        <div>
          <a href="#" className="flex-shrink-0 group block">
            <TopbarUser />
          </a>
        </div>
        <div className="ml-large w-large h-large"></div>
      </div>
    </div>
  );
};

export default Topbar;
