import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getSession } from "next-auth/react";
import useSWR from "swr";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import fetcher from "../../../lib/fetcher";
import { createStitches, styled, keyframes } from "@stitches/react";
import * as Dialog from "@radix-ui/react-dialog";
// import { InputField } from "../../molecules/input";

const Fieldset = styled("fieldset", {
  all: "unset",
  display: "flex",
  gap: 20,
  alignItems: "center",
  marginBottom: 15,
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 0.75 },
});

const fadeout = keyframes({
  from: { opacity: 0.75 },
  to: { opacity: 0 },
});

const scaleUp = keyframes({
  "0%": { transform: "translateX(100%)", opacity: 0 },
  "100%": { transform: "translate-x-0", opacity: 1 },
});

const scaleDown = keyframes({
  "0%": { transform: "translate-x-0", opacity: 1 },
  "100%": { transform: "translateX(100%)", opacity: 0 },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  '&[data-state="open"]': {
    animation: `${fadeIn} 300ms ease-out`,
  },

  '&[data-state="closed"]': {
    animation: `${fadeout} 200ms ease-out`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  '&[data-state="open"]': {
    animation: `${scaleUp} 400ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },

  '&[data-state="closed"]': {
    animation: `${scaleDown} 400ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});

function AddPatientSlidePanel() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  // const submitData = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const body = { name };
  //     const res = await fetch("/api/patient", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body),
  //     }).then((x) => x.json());

  //     // const temp = await res.json();
  //     console.log(res);

  //     await Router.push("/");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const submitData = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const body = { name, surname, middlename };
  //     // console.log(body);
  //     await fetch("/api/patient", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body),
  //     });
  //     await Router.push("/patients");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition ease-out duration-200"
        >
          Новий пацієнт
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <StyledOverlay className="fixed bg-[#f1f3f5] dark:bg-scale-100 h-full w-full left-0 top-0 opacity-75 data-closed:animate-fade-out-overlay-bg data-open:animate-fade-in-overlay-bg" />
        <StyledContent className="bg-[#fbfcfd] dark:bg-scale-300 flex flex-col fixed inset-y-0 border-l border-overlay-border shadow-xl w-screen max-w-2xl h-full right-0 data-open:animate-panel-slide-right-out data-closed:animate-panel-slide-right-in  transition-all duration-100 ease-in ">
          <Dialog.Title className="space-y-1 py-4 px-4 sm:px-6 border-b">
            {`Новий пацієнт`}
          </Dialog.Title>
          <Dialog.Description />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <div className="relative flex-1 overflow-y-auto">
              <div className="px-4 sm:px-6">
                <div className="space-y-10 py-6">
                  <div className="grid gap-6 md:grid md:grid-cols-6 md:gap-x-4 items-center">
                    <div className="col-span-2">Имя</div>
                    <div className="col-span-4">
                      {/* <input
                        type="text"
                        className="px-4 py-2 text-sm w-full outline-none rounded-md shadow-sm transition-all border focus:shadow-md focus:border-gray-500"
                      /> */}
                      {/* <input defaultValue="test" {...register("example")} /> */}
                      <input
                        className="px-4 py-2 text-sm w-full outline-none rounded-md shadow-sm transition-all border focus:border-gray-400 focus:shadow-[0_0_0_2px_rgba(62,207,142,.1)]"
                        {...register("firstName", {
                          required: true,
                          maxLength: 20,
                        })}
                      />
                    </div>
                    <div className="col-span-2">Прізвище</div>
                    <div className="col-span-4">
                      {/* <input
                        type="text"
                        className="px-4 py-2 text-sm w-full outline-none rounded-md shadow-sm transition-all border focus:shadow-md focus:border-gray-500"
                      /> */}
                      {/* <input defaultValue="test" {...register("example")} /> */}
                      <input
                        className="px-4 py-2 text-sm w-full outline-none rounded-md shadow-sm transition-all border focus:border-gray-400 focus:shadow-[0_0_0_2px_rgba(62,207,142,.1)]"
                        {...register("lastName", {
                          required: true,
                          maxLength: 20,
                        })}
                      />
                    </div>
                    <label className="col-span-2">Прізвище</label>
                    <div className="col-span-4">
                      {/* <input
                        type="text"
                        className="px-4 py-2 text-sm w-full outline-none rounded-md shadow-sm transition-all border focus:shadow-md focus:border-gray-500"
                      /> */}
                      {/* <input defaultValue="test" {...register("example")} /> */}
                      <input
                        className="px-4 py-2 text-sm w-full outline-none rounded-md shadow-sm transition-all border focus:border-gray-400 focus:shadow-[0_0_0_2px_rgba(62,207,142,.1)]"
                        {...register("lastName", {
                          required: true,
                          maxLength: 20,
                        })}
                      />
                    </div>
                    <div className="col-span-2 border border-gray-300 rounded-md px-3 py-2 shadow-sm transition-all focus-within:border-gray-400 focus:shadow-[0_0_0_2px_rgba(62,207,142,.1)]">
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-gray-900"
                      >
                        Прізвище
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full border-0 p-0 mt-1 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="col-span-2 border border-gray-300 rounded-md px-3 py-2 shadow-sm transition-all focus-within:border-gray-400 focus:shadow-[0_0_0_2px_rgba(62,207,142,.1)]">
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-gray-900"
                      >
                        Имя
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full border-0 p-0 mt-1 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="col-span-2 border border-gray-300 rounded-md px-3 py-2 shadow-sm transition-all focus-within:border-gray-400 focus:shadow-[0_0_0_2px_rgba(62,207,142,.1)]">
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-gray-900"
                      >
                        Отчество
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full border-0 p-0 mt-1 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                        placeholder="Jane Doe"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-gray-200 flex w-full justify-between space-x-3 border-t px-3 py-4">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border outline-none outline-0 border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 focus:ring-indigo-500 focus-visible:outline-4 focus-visible:outline-offset-1 focus-visible:ring-blue-200"
                onClick={() => setOpen(false)}
              >
                Скасувати
              </button>
              <input
                type="submit"
                value="Зберегти"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-out duration-200"
              ></input>
            </div>
          </form>
          {/* <Dialog.Close /> */}
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AddPatientSlidePanel;
