import { useState } from "react";
import { useEffect } from "react";
import StatusIndicator from "../fundamentals/status-indicator";
import { getOrderStatusVariant } from "../../lib/order-status-variant";
import Link from "next/link";
import dayjs from "dayjs";

const ItemLine = (props) => {
  // const { id, number, createdAt, status, total } = props;
  const [status, setStatus] = useState("");
  // console.log(props.id);
  return (
    <Link href={`/orders/${props.id}`} order={props.id} passHref>
      <tr className="group text-xs border-t border-b border-gray-200 text-gray-900 py-2 cursor-pointer hover:bg-gray-50">
        <td className="text-xs h-[40px] group-hover:text-violet-600 text-gray-900 w-20">
          #{props.number}
        </td>
        <td className="text-xs h-[40px]">
          {dayjs(props.createdAt).locale("uk").format("D MMMM YYYY HH:mm")}
        </td>
        <td className="text-xs h-[40px] truncate">
          {/* <StatusIndicator variant={getOrderStatusVariant(props.status)} /> */}
          <StatusIndicator
            title={getOrderStatusVariant(props.status)}
            variant={props.status}
          />
          {/* <div className="flex items-center text-xs"> */}
          {/* <div className="w-1.5 h-1.5 self-center rounded-full bg-teal-50"></div>
            <span className="ml-2">{status}</span> */}

          {/* </div> */}
        </td>
        <td className="text-xs h-[40px]">{props.total}</td>
        <td className="text-xs h-[40px]"></td>
      </tr>
      {/* <a
        href="#"
        className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500"
      >
        <p className="text-slate-500 group-hover:text-white text-sm">
          Create a new project from a variety of starting templates.
        </p>
      </a> */}
    </Link>
  );
};

export default ItemLine;
