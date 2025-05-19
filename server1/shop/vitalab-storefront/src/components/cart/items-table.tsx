import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
];

// @ts-ignore
const ItemsTable = ({ items }) => {
  const [data, setData] = useState([]);
  const { storeCart } = useStore();
  const { cart, setCart } = useCart();
  const mutation = api.cart.remove.useMutation({
    onSuccess: (cart) => {
      setCart(cart);
      storeCart(cart.id);
    },
  });

  useEffect(() => {
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
                      <XMarkIcon className="h-4 w-4 text-gray-900" />
                    </button>
                  ) : null}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsTable;
