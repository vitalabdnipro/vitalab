import { useEffect } from "react";
import { useRef, useState } from "react";
import useNotification from "../hooks/useNotification";

const Test = () => {
  const [open, setOpen] = useState(false);
  const notification = useNotification();

  const notify = () => {
    const p = "Збереження замовлення";

    notification(p, "loading");
    setTimeout(() => notification("Відправлення замовлення", "loading"), 3000);
    setTimeout(() => notification("Замовлення відправлено", "success"), 5000);
    
  };

  // console.log(notification);
  return (
    <div className="flex flex-col grow h-full">
      <div className="w-full flex flex-col grow">
        <div>
          <button onClick={notify}>Make me a toast</button>
        </div>
      </div>
    </div>
  );
};

export default Test;
