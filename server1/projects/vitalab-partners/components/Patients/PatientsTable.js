// import { useTable } from "react-table";
// import { useMemo, useState } from "react";

// function GlobalFilter({
//   preGlobalFilteredRows,
//   globalFilter,
//   setGlobalFilter,
// }) {
//   const count = preGlobalFilteredRows.length;
//   const [value, setValue] = useState(globalFilter);
//   const onChange = useAsyncDebounce((value) => {
//     setGlobalFilter(value || undefined);
//   }, 200);

//   return (
//     <span>
//       Search:{" "}
//       <input
//         value={value || ""}
//         onChange={(e) => {
//           setValue(e.target.value);
//           onChange(e.target.value);
//         }}
//         placeholder={`${count} records...`}
//         style={{
//           fontSize: "1.1rem",
//           border: "0",
//         }}
//       />
//     </span>
//   );
// }

// const PatientsTable = ({ data: test }) => {
//   console.log(test.patients);
//   const data = useMemo(() => test.patients, [test]);

//   const columns = useMemo(
//     () => [
//       {
//         Header: "ID",
//         accessor: "id", // accessor is the "key" in the data
//       },
//       {
//         Header: "Name",
//         accessor: "firstName",
//       },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     state,
//     visibleColumns,
//     preGlobalFilteredRows,
//     setGlobalFilter,
//   } = useTable({ columns, data, filterTypes });

//   return (
//     <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
//       <thead>
//         {headerGroups.map((headerGroup) => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column) => (
//               <th
//                 {...column.getHeaderProps()}
//                 style={{
//                   borderBottom: "solid 3px red",
//                   background: "aliceblue",
//                   color: "black",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {column.render("Header")}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map((row) => {
//           prepareRow(row);
//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map((cell) => {
//                 return (
//                   <td
//                     {...cell.getCellProps()}
//                     style={{
//                       padding: "10px",
//                       border: "solid 1px gray",
//                       background: "papayawhip",
//                     }}
//                   >
//                     {cell.render("Cell")}
//                   </td>
//                 );
//               })}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// };

// export default PatientsTable;

// import styled from 'styled-components'
import { useMemo, useState } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
} from "react-table";
// A great library for fuzzy filtering/sorting items
import { matchSorter } from "match-sorter";
import Link from "next/link";
import IconTooltip from "../atoms/icon-tooltip";
import dayjs from "dayjs";
import clsx from "clsx";

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
    page,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageSize: 25 },
      autoResetPage: false,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    usePagination
  );

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  // const firstPageRows = rows.slice(0, 100);

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
          {page.map((row, i) => {
            // console.log(row.original.id);
            prepareRow(row);
            return (
              <Link key={i} href={`/patients/${row.original.id}`} passHref>
                <tr
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
              </Link>
            );
          })}
        </tbody>
      </table>
      <div className="flex w-full justify-between text-xs text-gray-500 mt-14">
        <div>
          {`${pageIndex == 0 ? 1 : pageIndex * 25} - ${
            (pageIndex + 1) * 25 <= rows.length
              ? (pageIndex + 1) * 25
              : rows.length
          } із ${rows.length} Пацієнтів`}
        </div>
        <div className="flex space-x-4">
          <div>
            {pageIndex + 1} із {pageCount}
          </div>
          <div className="flex space-x-4 items-center">
            <button
              className={clsx("text-gray-300", {
                ["text-gray-900"]: canPreviousPage,
              })}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
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
            </button>
            <button
              className={clsx("text-gray-300", {
                ["text-gray-900"]: canNextPage,
              })}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
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
            </button>
          </div>
        </div>
      </div>
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

function PatientsTable({ patients: { patients: p } }) {
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
        Header: "ПІБ",
        accessor: (row) =>
          `${row.lastName} ${row.firstName} ${
            row.middleName ? row.middleName : ""
          }`,
      },
      {
        Header: "Дата народження",
        accessor: "birthday",
        Cell: ({ value }) => dayjs(value).format("DD.MM.YYYY"),
      },
      {
        Header: "Стать",
        accessor: "gender",
      },
      {
        Header: "Ел. пошта",
        accessor: "email",
      },
      {
        Header: "Останнє замовлення",
        accessor: (row) =>
          row.lastOrder && row.lastOrderCreated ? (
            <div className="flex items-center">
              {row.lastOrder}
              <div className="ml-1 flex">
                <IconTooltip
                  content={dayjs(row.lastOrderCreated).format("DD.MM.YYYY HH:mm")}
                />
              </div>
            </div>
          ) : (
            "-"
          ),
      },
    ],
    []
  );

  const data = p.map((a) => a);

  return (
    // <Styles>
    <Table columns={columns} data={data} />
    // </Styles>
  );
}

export default PatientsTable;
