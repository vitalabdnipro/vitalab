import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "@components/ui";
import { useStore } from "@lib/context/store-context";
import { api } from "utils/api";
import { useCart } from "medusa-react";

const columnHelper = createColumnHelper<Laboratory>();

const columns = [
  columnHelper.accessor("title", {
    header: () => <span></span>,
    cell: (info) => (
      <>
        <div className="relative flex h-full items-center text-sm font-semibold text-gray-900">
          {info.getValue()}
        </div>
      </>
    ),
  }),
  columnHelper.accessor("unit_price", {
    header: () => null,
    cell: (info) => (
      <div className="relative flex h-full items-center text-base font-normal text-gray-900">
        <span>{info.getValue()} грн</span>
      </div>
    ),
  }),
  //   columnHelper.accessor((row) => row.address, {
  //     id: "lastName",
  //     cell: (info) => (
  //       <div className="flex flex-col">
  //         <div>{info.getValue()}</div>
  //         {info.row.original.terminal || info.row.original.kid ? (
  //           <div className="mt-2 flex items-center [&>:not(:first-child)]:ml-3">
  //             {info.row.original.terminal && (
  //               <>
  //                 <span className="">
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     viewBox="0 0 152.407 108"
  //                     className="h-5"
  //                   >
  //                     <g>
  //                       <rect
  //                         width="152.407"
  //                         height="108"
  //                         style={{ fill: "none" }}
  //                       />
  //                       <g>
  //                         <rect
  //                           x="60.4117"
  //                           y="25.6968"
  //                           width="31.5"
  //                           height="56.6064"
  //                           style={{ fill: "#ff5f00" }}
  //                         />
  //                         <path
  //                           d="M382.20839,306a35.9375,35.9375,0,0,1,13.7499-28.3032,36,36,0,1,0,0,56.6064A35.938,35.938,0,0,1,382.20839,306Z"
  //                           transform="translate(-319.79649 -252)"
  //                           style={{ fill: "#eb001b" }}
  //                         />
  //                         <path
  //                           d="M454.20349,306a35.99867,35.99867,0,0,1-58.2452,28.3032,36.00518,36.00518,0,0,0,0-56.6064A35.99867,35.99867,0,0,1,454.20349,306Z"
  //                           transform="translate(-319.79649 -252)"
  //                           style={{ fill: "#f79e1b" }}
  //                         />
  //                         <path
  //                           d="M450.76889,328.3077v-1.1589h.4673v-.2361h-1.1901v.2361h.4675v1.1589Zm2.3105,0v-1.3973h-.3648l-.41959.9611-.41971-.9611h-.365v1.3973h.2576v-1.054l.3935.9087h.2671l.39351-.911v1.0563Z"
  //                           transform="translate(-319.79649 -252)"
  //                           style={{ fill: "#f79e1b" }}
  //                         />
  //                       </g>
  //                     </g>
  //                   </svg>
  //                 </span>
  //                 <span className="">
  //                   <Image src={visa} alt="Visa" className="h-3 w-full" />
  //                 </span>
  //               </>
  //             )}
  //             {info.row.original.kid && (
  //               <div className="relative flex items-center">
  //                 {/* <Image
  //                 src={kid}
  //                 alt="Visa"
  //                 className="absolute mb-1.5 h-6 w-full -bottom-1 left-0"
  //               /> */}
  //                 <div className="ml-7 bg-auto font-medium before:absolute before:-top-0.5 before:left-0 before:h-full before:w-full before:bg-[url('../../public/img/kid.png')] before:bg-[length:22px] before:bg-no-repeat">
  //                   {info.row.original.kid}+
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //         ) : null}
  //       </div>
  //     ),
  //     header: () => <span>Адреса</span>,
  //   }),
  //   columnHelper.accessor("workingHours", {
  //     header: () => <span>Години роботи</span>,
  //     cell: (row) => (
  //       <ul>
  //         {row.row.original.workingHours.map((time) => (
  //           <ul key={time}>
  //             <li>{time}</li>
  //           </ul>
  //         ))}
  //       </ul>
  //     ),
  //   }),
  //   columnHelper.accessor("biomaterial", {
  //     header: () => <span>Забір біоматеріалу</span>,
  //     cell: (row) => (
  //       <ul>
  //         {row.row.original.biomaterial.map((time) => (
  //           <ul key={time}>
  //             <li>{time}</li>
  //           </ul>
  //         ))}
  //       </ul>
  //     ),
  //   }),
  // columnHelper.accessor("status", {
  //   header: "Status",
  //   footer: (info) => info.column.id,
  // }),
  // columnHelper.accessor("progress", {
  //   header: "Profile Progress",
  //   footer: (info) => info.column.id,
  // }),
];

const ItemsTable = ({ items }) => {
  const [data, setData] = useState([]);
  const { storeCart } = useStore();
  const { cart, setCart } = useCart();
  const mutation = api.cart.remove.useMutation({
    onSuccess: (cart) => {
      setCart(cart);
      storeCart(cart.id);
      // timedOpen();
    },
  });
  // const { deleteItem } = useStore();

  useEffect(() => {
    // console.log(items);
    setData(items);
  }, [items]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!cart?.id) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-x-4">
      <table className="grid w-auto min-w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="relative grid grid-cols-4 items-start"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-3 pb-2.5 text-left text-m font-semibold"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="relative block py-1 before:absolute before:inset-x-0 before:top-0 before:h-full before:rounded-lg before:bg-white before:shadow-md">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="relative grid grid-cols-4 items-center even:before:absolute even:before:inset-x-1 even:before:top-0 even:before:h-full even:before:rounded even:before:bg-gray-50"
            >
              {/* <div className="col-span-3"> */}
              {/* <td className="flex items-center p-3 pl-5"></td> */}
              {row.getVisibleCells().map((cell, index) => (
                <td
                  key={cell.id}
                  className={clsx(
                    index === 0
                      ? "relative z-[1] col-span-3 flex p-3 pr-4 text-left text-m font-semibold sm:pr-8"
                      : "relative flex min-h-[56px] items-center p-3 pr-5 text-start text-m md:min-h-[48px]",
                    {
                      "justify-end before:absolute before:top-2 before:left-0 before:bottom-2 before:w-px before:bg-[rgba(66,71,112,0.06)]":
                        index >= 1,
                    }
                  )}
                >
                  {index === 0 &&
                  row.original.variant.product.metadata.category.code !== 14 ? (
                    <button
                      onClick={() => {
                        mutation.mutate({
                          cartId: cart?.id,
                          lineId: row.original.id,
                        });
                      }}
                      className="ml-2 mr-4"
                    >
                      {/* {console.log("rowID", row.original)} */}
                      <XMarkIcon className="h-4 w-4 text-gray-900" />
                    </button>
                  ) : null}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              {/* </div> */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="">
        <Card shadow="small">
          <div className="p-4">
            <Button variant="solid">Выбрать лабораторию</Button>
          </div>
        </Card>
      </div> */}
    </div>
  );
};

export default ItemsTable;
