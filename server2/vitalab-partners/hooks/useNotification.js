import { toast } from "react-hot-toast";
import Notification from "../components/atoms/notification";

const useNotification = () => {
  return (message, type) => {
    toast.custom(
      (t) => (
        <Notification toast={t} type={type} message={message} />
      ),
      {
        id: toast,
        position: "top-right",
        duration: 7000,
      }
    );
  };
};

export default useNotification;
