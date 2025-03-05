import useSWR from "swr";
import { useState, useEffect } from "react";
import fetcher from "../lib/fetcher";
import PriceTable from "../components/organisms/price-table";

const Price = () => {
  const [selectedMedicalTestByCategory, setSelectedMedicalTestByCategory] =
    useState(null);

  const { data, error } = useSWR("/api/analyzes", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  // console.log(data.data.items);
  // const handleSelectTestsByCategory = (id) => {
  //   setSelectedMedicalTestByCategory(id);
  // };

  // console.log(data);
  // if (data) return <div>failed to load</div>;
  // console.log(data)

  // console.dir(array);
  // console.log(selectedMedicalTestByCategory);

  // const arrayUniqueByKey = [
  //   ...new Map(array.map((item) => [item[key], item])).values(),
  // ];

  // console.log(arrayUniqueByKey.forEach(({category_name}) => console.log(category_name)));

  //   const { data, error } = useSWR(
  //     "/public/data.json",
  //     fetcher
  //   ); //https://jsonplaceholder.typicode.com/users

  // if (arr) return <div>failed to load</div>;
  // if (!arr) return <div>loading...</div>;

  //   const arr = data.map((item) => <div key={item.id}>{item.name}</div>);

  // Object.entries(fido).map(([key,value])=>{
  //   return (
  //       <div>{key} : {value.toString()}</div>
  //   );
  // })
  // const getValue = (v) => {
  //   console.log(v);
  //   // console.log(v.forEach((item) => console.log(item.id)));
  // };

  return (
    <div className="flex flex-col grow h-full">
      <div className="rounded-lg border bg-gray-0 border-gray-200 h-full overflow-hidden flex flex-col min-h-[350px] w-full relative">
        <div className="pt-medium px-8 flex flex-col grow overflow-y-auto">
          <div className="flex items-center justify-between mt-6 h-8">
            <div>
              <div className="flex leading-6 font-semibold gap-x-4 text-gray-400">
                <div className="cursor-pointer text-gray-900">Аналізи</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div>
                {/* <Link href="/patients/add">
                      <a className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-500 transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Додати пацієнта
                      </a>
                    </Link> */}
                {/* <AddPatientSlidePanel /> */}
                {/* <AddPatientModal /> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col grow my-8">
            <div className="w-full h-full overflow-y-auto flex flex-col justify-between">
              <PriceTable analyzes={data.data.items} />
              {/* <table className="w-full table-auto">
                      <thead className="text-xs leading-5 whitespace-nowrap font-semibold text-gray-500 border-t border-b border-gray-200">
                        <tr className="">
                          <th
                            className="text-left h-[40px] w-[100px]"
                            colSpan="1"
                          >
                            Телефон
                          </th>
                          <th
                            className="text-left h-[40px] w-[200px]"
                            colSpan="1"
                          >
                            ФИО
                          </th>
                          <th
                            className="text-left h-[40px] w-[100px]"
                            colSpan="1"
                          >
                            Дата рождения
                          </th>
                          <th
                            className="text-left h-[40px] w-[50px]"
                            colSpan="1"
                          >
                            Пол
                          </th>
                          <th
                            className="text-left h-[40px] w-[100px]"
                            colSpan="1"
                          >
                            E-mail
                          </th>
                          <th
                            className="text-left h-[40px] w-[100px]"
                            colSpan="1"
                          >
                            Последний заказ
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {patients.patients.map((patient) => (
                          <PatientItem key={patient.id} {...patient} />
                        ))}
                      </tbody>
                    </table> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
