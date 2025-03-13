import { useMemo, useState } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
// A great library for fuzzy filtering/sorting items
import { matchSorter } from "match-sorter";
import Link from "next/link";
import IconTooltip from "../../components/atoms/icon-tooltip";
import dayjs from "dayjs";
import EmojiHappyIcon from "../../components/fundamentals/icons/emoji-happy-icon";
import EmojiSadIcon from "../../components/fundamentals/icons/emoji-sad-icon";
import EditPartnerModal from "../../components/organisms/edit-partner-modal";

// import makeData from "./makeData";

// const Styles = styled.div`
//   padding: 1rem;
//   table {
//     border-spacing: 0;
//     border: 1px solid black;
//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }
//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;
//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
// `

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="relative flex space-x-1">
      <div className="relative">
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`Пошук`}
          className="block box-border w-full rounded-md shadow-sm transition-all text-scale-1200 focus:shadow-md outline-none focus:ring-current focus:ring-2 focus:border-gray-500 focus:ring-gray-200 placeholder-gray-500 bg-[#05294d07] border border-gray-200 pl-10 text-sm leading-4 px-3 py-2"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-scale-1100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sbui-icon"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>
    </div>
  );
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Our table component
function Table({ columns, data }) {
  const [open, setOpen] = useState(false);
  const [partner, setPartner] = useState(null);

  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 100);
  const openEditPartnerModal = (data) => {
    if (data) {
      setPartner(data.original);
      setOpen(true);
    }
  };

  return (
    <div className="flex flex-col">
      {/* <tr>
        <th
          colSpan={visibleColumns.length}
          style={{
            textAlign: "left",
          }}
        > */}

      {/* </th>
      </tr> */}
      <div className="w-full flex justify-between mb-2">
        <div className="flex mb-2 self-end"></div>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <table {...getTableProps()} className="w-full table-auto">
        <thead className="text-xs leading-5 whitespace-nowrap font-semibold text-gray-500 border-t border-b border-gray-200">
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  key={index}
                  id={`hdr${index}`}
                  {...column.getHeaderProps()}
                  className="text-left h-[40px]"
                  colSpan="1"
                >
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                  {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            // console.log(row.original.id);
            prepareRow(row);
            return (
              // <Link key={i} href={`/partners/${row.original.id}`} passHref>
              <tr
                key={i}
                onClick={() => openEditPartnerModal(row)}
                {...row.getRowProps()}
                className="font-normal text-xs leading-5 border-t border-b border-gray-200 text-gray-900 cursor-pointer hover:bg-gray-50"
              >
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      key={index}
                      {...cell.getCellProps()}
                      className="font-normal h-[40px]"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
              // </Link>
            );
          })}
        </tbody>
      </table>
      <div className="flex w-full justify-between text-xs text-gray-500 mt-14">
        <div>
          1 - {rows.length} із {rows.length} Партнерів
        </div>
        <div className="flex space-x-4">
          <div>1 із 1</div>
          <div className="flex space-x-4 items-center">
            <div className="text-gray-300">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.667 8H3.33366"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M8 3.33331L3.33333 7.99998L8 12.6666"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="text-gray-300">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33301 8H12.6663"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M8 3.33331L12.6667 7.99998L8 12.6666"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <EditPartnerModal open={open} onOpenChange={setOpen} partner={partner} />
    </div>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

function PartnersTable({ partners }) {
  const columns = useMemo(
    () => [
      // columns: [
      //   {
      //     Header: "First Name",
      //     accessor: "firstName",
      //   },
      //   {
      //     Header: "Last Name",
      //     accessor: "lastName",
      //     // Use our custom `fuzzyText` filter on this column
      //     filter: "fuzzyText",
      //   },
      // ],
      {
        Header: "Телефон",
        accessor: "phone",
      },
      {
        Header: "Ел. пошта",
        accessor: "email",
      },
      {
        Header: "ПІБ",
        accessor: (row) =>
          `${row.lastName} ${row.firstName} ${
            row.middleName ? row.middleName : ""
          }`,
      },
      {
        Header: "Організація",
        accessor: "organization.name",
        // Cell: ({ value }) => dayjs(value).format("DD.MM.YYYY"),
      },
      {
        id: "isActive",
        accessor: (row) =>
          row.isActive === "TRUE" ? (
            <div className="flex items-center">
              <div className="ml-1 flex">
                <EmojiHappyIcon size={20} color={"#16a34a"} />
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="ml-1 flex">
                <EmojiSadIcon size={20} color={"#dc2626"} />
              </div>
            </div>
          ),
      },
      // {
      //   id: "role",
      //   accessor: (row) =>
      //     row.role === "ADMIN" ? (
      //       <div className="flex items-center">
      //         <div className="ml-1 flex">
      //           <EmojiHappyIcon size={24} color={"green"}/>
      //         </div>
      //       </div>
      //     ) : null,
      // },
    ],
    []
  );

  const data = partners.map((p) => p);

  return (
    // <Styles>
    <Table columns={columns} data={data} />
    // </Styles>
  );
}

export default PartnersTable;
