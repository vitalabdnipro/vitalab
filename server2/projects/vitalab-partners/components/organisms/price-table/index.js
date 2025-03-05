// import styled from 'styled-components'
import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useGroupBy,
  useExpanded,
} from "react-table";
// A great library for fuzzy filtering/sorting items
import { matchSorter } from "match-sorter";
import Link from "next/link";

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

const Styles = styled.div`
  table {
    th {
      :first-child {
        width: 350px;
      }
    }
    th + #pt1 {
      width: 50px;
    }
    th + #pt2 {
      width: 35%;
    }
  }
`;

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
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { groupBy, expanded },
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: {
        groupBy: ["category_name"],
      },
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useGroupBy,
    useExpanded
  );

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 1000);

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
                  id={`pt${index}`}
                  {...column.getHeaderProps()}
                  className="text-left h-[40px]"
                  colSpan="1"
                >
                  {/* {column.canGroupBy ? (
                    // If the column can be grouped, let's add a toggle
                    <span {...column.getGroupByToggleProps()}>
                      {column.isGrouped ? "🛑 " : "👊 "}
                    </span>
                  ) : null} */}
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
            prepareRow(row);
            return (
              <tr
                key={i}
                {...row.getRowProps()}
                className="font-normal text-xs leading-5 border-t border-b border-gray-200 text-gray-900 cursor-pointer hover:bg-gray-50"
              >
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      key={index}
                      {...cell.getCellProps()}
                      className="font-normal h-[40px] overflow-hidden"
                    >
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <div
                            {...row.getToggleRowExpandedProps()}
                            className=" truncate w-[350px]"
                          >
                            {row.isExpanded ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 inline-block"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 inline-block"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                            <span className="ml-3 w-5">
                              {cell.render("Cell")} ({row.subRows.length})
                            </span>
                          </div>
                        </>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render("Aggregated")
                      ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex w-full justify-between text-xs text-gray-500 mt-14">
        <div>{data.length} аналізів</div>
        {/* <div className="flex space-x-4">
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
        </div> */}
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

function PriceTable(analyzes) {
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
        // Header: "Категорія",
        accessor: "category_name",
        // groupedIndex: 1
      },
      {
        Header: "Код",
        accessor: "code",
        canGroupBy: false,
      },
      {
        Header: "Назва",
        accessor: "name",
        canGroupBy: false,
      },
      {
        Header: "Термін виконання",
        accessor: "",
        canGroupBy: false,
      },
      {
        Header: "Базова ціна (грн)",
        accessor: "price",
        canGroupBy: false,
      },
      {
        Header: "Цена партнера",
        accessor: "",
        canGroupBy: false,
      },

      //   {
      //     Header: "Info",
      //     columns: [
      //       {
      //         Header: "Age",
      //         accessor: "age",
      //         // Filter: SliderColumnFilter,
      //         // filter: "equals",
      //       },
      //       {
      //         Header: "Visits",
      //         accessor: "visits",
      //         // Filter: NumberRangeColumnFilter,
      //         // filter: "between",
      //       },
      //       {
      //         Header: "Status",
      //         accessor: "status",
      //         // Filter: SelectColumnFilter,
      //         // filter: "includes",
      //       },
      //       {
      //         Header: "Profile Progress",
      //         accessor: "progress",
      //         // Filter: SliderColumnFilter,
      //         // filter: filterGreaterThan,
      //       },
      //     ],
      //   },
    ],
    []
  );

  // const data = analyzes.map((a) => a);

  console.log("test", analyzes.analyzes);
  const filteredData = analyzes.analyzes
    .filter((item) => item.is_active && item.price > 0)
    .map((item) => ({ ...item, price: item.price / 100 }));

  return (
    <Styles>
      <Table columns={columns} data={filteredData} />
    </Styles>
  );
}

export default PriceTable;
