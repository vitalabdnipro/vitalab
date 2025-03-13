import { InputField } from "../components/molecules/input";

export default function addOrder() {
  return (
    // <div className="xl:px-8 py-8 bg-gray-50 min-h-[calc(100vh-56px)] overflow-y-auto">
      <div className="mx-4 sm:mx-8 md:mx-14 xl:mx-auto xl:max-w-7xl xl:w-full h-full">
        <form onSubmit={"submitData"}>
          <div className="h-full" style={{ outline: 0 }}>
            <div className="w-full flex items-center text-xs font-semibold text-gray-500 mb-4">
              <span className="text-violet-600 cursor-pointer">Заказы</span>
              <span className="mx-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              <span>Add Order</span>
            </div>
            <div>
              <div className="rounded-lg border bg-gray-0 border-gray-200 h-full overflow-hidden flex flex-col min-h-[350px] w-full relative">
                <div className="pt-medium px-8 flex flex-col grow overflow-y-auto">
                  <div className="flex items-center justify-between mt-6 h-8">
                    <h1 className="font-semibold text-gray-900 text-2xl">
                      Новый заказ
                      {true ? (
                        <span className="font-semibold">{` № 777`}</span>
                      ) : (
                        ""
                      )}
                    </h1>
                    <div className="flex items-center space-x-2"></div>
                  </div>
                  <h3 className="text-xs pt-1.5 text-gray-500">
                    Гловацкий Роман Артурович (ID: 31232132132)
                  </h3>

                  <div className="flex flex-col grow my-6">
                    <div className="mt-6">
                      <div>
                        <h3 className="font-semibold text-sm mb-2">
                          General information
                        </h3>
                        <div className="grid gap-x-8 gap-y-4 mt-4 grid-rows-3 grid-cols-2">
                          <InputField
                            label={"Прізвище"}
                            placeholder={"..."}
                            // value={surname}
                            name="surname"
                            // onChange={(e) => setSurname(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* 
                        <InputField
                          label={"Имя"}
                          placeholder={"..."}
                          value={name}
                          name="name"
                          // onChange={(e) => setName(e.target.value)}
                        />
                        <InputField
                          label={"Отчество"}
                          placeholder={"..."}
                          value={middlename}
                          name="middlename"
                          // onChange={(e) => setMiddlename(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-8 gap-y-4 mt-4 grid-rows-3 grid-cols-2">
                        <div>
                          <InputField
                            label={"Телефон"}
                            placeholder={"..."}
                            value={phone}
                            name="phone"
                            // onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                        <div className="bg-gray-50 text-sm w-full p-3 flex h-20 flex-col cursor-text border border-gray-200 focus-within:shadow-md focus-within:border-violet-600 rounded row-span-3">
                          <div className="w-full flex inter-small-semibold text-gray-500 items-center">
                            <label>Description</label>
                            <div className="text-rose-50 "> *</div>
                          </div>
                          <div className="w-full flex mt-1"></div>
                          <textarea
                            name=""
                            id=""
                            rows="8"
                            className="relative text-justify overflow-hidden focus:overflow-auto resize-none bg-inherit outline-none outline-0 w-full remove-number-spinner leading-base text-grey-90 font-normal caret-violet-60 placeholder-grey-40 line-clamp-[8] focus:line-clamp-none"
                          ></textarea>
                        </div>
                        <div>
                          <InputField
                            label={"Отчество"}
                            placeholder={"..."}
                            value={middlename}
                            name="middlename"
                            // onChange={(e) => setMiddlename(e.target.value)}
                          />
                        </div>
                        <div>
                          <InputField
                            label={"Отчество"}
                            placeholder={"..."}
                            value={middlename}
                            name="middlename"
                            // onChange={(e) => setMiddlename(e.target.value)}
                          />
                        </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6"></div>
            <div className="mt-4 pb-8 flex justify-end items-center gap-x-2">
              {/* <Button type="primary">Primary Button</Button> */}
            </div>
          </div>
        </form>
      </div>
    // </div>
  );
}
