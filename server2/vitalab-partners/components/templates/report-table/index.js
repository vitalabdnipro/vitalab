import { useMemo, useState } from "react";
import { useTable } from "react-table";
import useSWR from "swr";
import fetcher from "../../../lib/fetcher";
import dayjs from "dayjs";
import { getInitials } from "../../../lib/get-initials";

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <table className="w-full table-auto" {...getTableProps()}>
      <thead className="whitespace-nowrap font-semibold text-xs leading-5 text-gray-500 border-t border-b border-gray-200 print:border-gray-700">
        {headerGroups.map((headerGroup, i) => (
          <tr key={i} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, i) => (
              <th
                className="text-left h-[40px]"
                key={i}
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              className="font-normal text-xs leading-5 border-t border-b border-gray-200 text-gray-900 group cursor-pointer print:border-gray-700"
              key={i}
              {...row.getRowProps()}
            >
              {row.cells.map((cell, i) => {
                // console.dir(cell);
                return (
                  <td
                    className="h-[40px] leading-5"
                    key={i}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((group, index) => (
          <tr
            className="font-semibold text-xs leading-5 border-t border-b border-gray-200 text-gray-900 group cursor-pointer print:border-gray-700"
            key={index}
            {...group.getFooterGroupProps()}
          >
            {group.headers.map((column, index) => (
              <td id={`f${index}`} key={index} {...column.getFooterProps()}>
                {column.render("Footer")}
              </td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}

const ReportTable = ({ period }) => {
  const { data: org, error } = useSWR(
    `/api/organizations?${new URLSearchParams({
      start: period[0],
      end: period[1] !== null ? period[1] : dayjs().toDate(),
    })}`,
    fetcher
  );

  const columns = useMemo(
    () => [
      {
        Header: "ПІБ паціента",
        // accessor: "users[0].orders[0].patient.firstName",
        accessor: "firstName",
        Cell: ({ row }) => {
          // console.log(row.original.patient.firstName);
          return (
            <div>
              {row.original.patient.lastName} {row.original.patient.firstName} {row.original.patient.middleName}
            </div>
          );
        },
        // Cell: ({ row }) => {
        //   // const { sampleTable } = props.original;

        //   const orders = row.original.users;
        //   // console.log("users", orders);
        //   // console.log(o[0].orders[2].patient.firstName);
        //   // const x = o.forEach((element) => element.orders);

        //   const x = orders.map((x) => x.orders);
        //   // console.log(x);
        //   // return x.map((g, index) => <div key={index}>{g.firstName}</div>);
        //   return ["test", "test2"];

        //   // console.log(
        //   //   "props",
        //   //   typeof row.original.users.foreach((item) => {
        //   //     return item;
        //   //   })
        //   // );
        //   // { sampleTable.users.map( (book) =>(<h4>{book.title}</h4>)) }
        // },
      },
      {
        Header: (
          <>
            Дата <br /> народж.
          </>
        ),
        accessor: "patient.birthday",
        Cell: ({ value }) => dayjs(value).format("DD.MM.YYYY"),
      },
      {
        Header: "# Замовлення",
        accessor: "number",
      },
      {
        Header: "Код",
        // accessor: "analysisCode",
        accessor: (row) => row.analyzes.map((i, index) => i.analysisCode),
        Cell: ({ value }) => {
          if (value.length > 1) {
            return value.map((v) => (
              <div className="" colSpan={2} key={v}>
                {v}
              </div>
            ));
          }
          return value;
        },
      },
      {
        Header: "Назва дослідження",
        accessor: (row) => row.analyzes.map((i, index) => i.analysisName),
        Cell: ({ value }) => {
          if (value.length > 1) {
            return value.map((v) => (
              <div className="truncate" colSpan={2} key={v}>
                {v}
              </div>
            ));
          }
          return value;
        },
        Footer: <div className="text-right">Всього за період:</div>,
      },
      {
        Header: (
          <>
            Ціна <br /> грн.
          </>
        ),
        id: "price",
        accessor: (row) =>
          row.analyzes.map((i, index) => i.analysisPrice / 100),
        Cell: ({ value }) => {
          if (value.length > 1) {
            return value.map((v) => (
              <div className="" key={v}>
                {v}
              </div>
            ));
          }
          return value;
        },
      },
      {
        Header: (
          <>
            Сума <br />
            грн.
          </>
        ),
        accessor: "total",
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce((sum, row) => Number(row.values.total) + sum, 0),
            [info.rows]
          );
          return <>{total > 0 ? `${total}` : ""}</>;
        },
      },
      {
        Header: "Відповідальна особа",
        // accessor: (row) => ({row.original.patient.lastName, row.original.patient.firstName}),
        accessor: (row) => {
          // return `${row.partner.lastName} ${row.partner.firstName} ${row.partner.phone}`;
          const abbr = getInitials(
            `${row.partner.lastName} ${row.partner.firstName}`
          );
          return `${abbr} ${row.partner.phone}`;
        },
        // Cell: ({ value }) => console.log(value),
      },
    ],
    []
  );

  if (error) return "An error has occurred.";
  if (!org) return "Loading...";

  // console.log("data!", org[0].users[0].orders[0].patient.firstName);

  // console.log("orig", org.email);
  // console.log(org.name);

  // const orders = org.forEach((item) => {
  //   item.users.forEach((i) => {
  //     i.orders.map((o) => {return [o]});
  //   });
  // });

  // const result = [...new Set(array.flat())];

  // const nd = org.forEach((element) => {
  //   console.log(element.users);
  //   return element.users.map((item) => item.orders).flat();
  // });

  // const m = org.flatMap((item) => item.users.flatMap((item) => item.orders));

  // m.forEach((n) => console.log("gggggggggg", n));
  //TODO ASK for better way
  const test = org[0].users.map((o) => o.orders).flat();
  // console.log("test", test);
  // for (let users of data) {
  //   for (let orders of users) {
  //     console.log(orders);
  //   }
  // }

  // console.log("org", data[0].users[0].orders[0].patient.firstName);
  console.log(test);
  return <Table columns={columns} data={test} />;
};

export default ReportTable;
