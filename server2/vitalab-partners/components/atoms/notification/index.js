import { toast as global } from "react-hot-toast";
import ToasterContainer from "../toaster-container";
import Spinner from "../../fundamentals/icons/spinner";
import XIcon from "../../fundamentals/icons/x-icon";
import CheckCircleIcon from "../../fundamentals/icons/check-circle-icon";

const Notification = ({ toast, type, message }) => {
  const onDismiss = () => {
    global.dismiss(toast.id);
  };

  return (
    <ToasterContainer visible={toast.visible} className="w-[320px]">
      <div className="p-4">
        <div className="flex items-center">
          <div className="mr-3">{getIcon(type)}</div>
          <div className="w-0 flex-1 flex justify-between">
            <p className="w-0 flex-1 text-sm font-medium text-gray-900">
              {message}
            </p>
            {/* <button
              type="button"
              className="ml-3 flex-shrink-0 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Undo
            </button> */}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onDismiss}
            >
              <span className="sr-only">Close</span>
              <XIcon size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </ToasterContainer>
  );
};

const ICON_SIZE = 24;

function getIcon(type) {
  switch (type) {
    case "loading":
      return (
        <Spinner className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
      );
    case "success":
      return <CheckCircleIcon size={ICON_SIZE} className="text-green-500" />;
    // case "warning":
    //   return <AlertIcon size={ICON_SIZE} className="text-orange-40" />;
    // case "error":
    //   return <XCircleIcon size={ICON_SIZE} className="text-rose-40" />;
    default:
      return <XIcon size={ICON_SIZE} className="text-grey-40" />;
  }
}

export default Notification;
