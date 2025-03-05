import { useState, useCallback, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled, keyframes } from "@stitches/react";
// import uk from "date-fns/locale/uk";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import InputField from "../../atoms/text-input/input";
import generator from "generate-password";
import ClipboardCopyIcon from "../../fundamentals/icons/clipboard-copy-icon";

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 0.25 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "#000",
  position: "fixed",
  opacity: 0.25,
  zIndex: 50,
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 350ms cubic-bezier(.4,0,.2,1) forwards`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: "#fff",
  zIndex: 55,
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 30px 60px rgba(0,0,0,.12)", // "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  color: "#000",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480, //"90vw",
  maxWidth: "100%",
  overflow: "hidden",
  overflowY: "auto",
  // minHeight: 200,
  // maxHeight: "85vh",
  // padding: "16px 25px",
  //   borderWidth: "1px",
  //   "@media (prefers-reduced-motion: no-preference)": {
  //     animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  //   },
  "&:focus": { outline: "none" },
});

function Content({ children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 400,
  color: "black",
  fontSize: "1.5rem",
  textAlign: "center",
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: "10px 0 20px",
  color: "green",
  fontSize: 15,
  lineHeight: 1.5,
});

// Exports
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;

const AddPartnerModal = (props) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");

  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    reset();
    let pw = generator.generate({
      length: 11,
      numbers: true,
    });

    setPassword(pw);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const { register, control, handleSubmit, reset, watch } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch(`/api/partners/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // const partner = await response.json();

    setOpen(false);

    // if (response.ok && patient) {
    //   router.push(
    //     {
    //       pathname: "/patients/[id]",
    //       query: { id: patient.id, order: true },
    //     },
    //     `/patients/${patient.id}`
    //   );
    // }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          // className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition ease-out duration-200"
          // className="inline-flex h-10 leading-10 items-center px-[14px] py-2 border border-transparent text-sm font-medium rounded-[4px] shadow-md text-white bg-blue-500 hover:bg-blue-400 hover:-translate-y-px focus:outline-none transition ease-linear duration-150"
          // className="font-medium text-sm bg-white border-0 h-7 flex items-center py-1 px-2 rounded duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-[#3c4257] shadow-stripe hover:text-[#1a1f36] hover:shadow-stripeHover hover:fill-[#1a1f36] fill-[#4f566b]"
          // className="font-medium text-sm bg-blue-500 border-0 h-7 flex items-center py-1 px-2 rounded-md duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-white shadow-stripe hover:text-[#1a1f36] hover:shadow-stripeHover hover:fill-[#1a1f36] fill-white"
          className="text-sm bg-blue-600 border-0 h-7 flex items-center py-1 px-2 rounded-md duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-white shadow-stripe fill-white outline-none focus:ring focus:ring-[rgba(58,151,212,0.36)]"
          // transition: background-color 0.24s, box-shadow 0.24s, color 0.24s;
        >
          <svg
            aria-hidden="true"
            height="12"
            width="12"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M9 7h6a1 1 0 0 1 0 2H9v6a1 1 0 0 1-2 0V9H1a1 1 0 1 1 0-2h6V1a1 1 0 1 1 2 0z"
              fillRule="evenodd"
            ></path>
          </svg>
          Додати партнера
        </button>
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6">
            <DialogTitle>Додати партнера</DialogTitle>
          </div>
          <div className="p-6 border-t bg-[#fafafa]">
            <div>
              <div className="flex flex-col mb-2 flex-wrap w-full justify-center items-stretch basis-auto">
                <div className="flex flex-col flex-1">
                  <InputField
                    label={"Організація"}
                    name={"organization"}
                    {...register("organization", {
                      required: true,
                    })}
                  />
                </div>
                <div className="flex flex-col flex-1 mt-4">
                  <InputField
                    label={"ID"}
                    name={"lisId"}
                    {...register("lisId", {
                      required: true,
                    })}
                  />
                </div>
                <div className="grid gap-2 items-center grid-cols-3 mt-12">
                  <div className="col-span-1">
                    <InputField
                      label={"Прізвище"}
                      name={"lastName"}
                      {...register("lastName", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="col-span-1">
                    <InputField
                      label={"Ім'я"}
                      name={"firstName"}
                      {...register("firstName", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="col-span-1">
                    <InputField
                      label={"По-батькові"}
                      name={"middleName"}
                      {...register("middleName", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <div className="grid gap-2 items-center grid-cols-2 mt-4">
                  <div className="col-span-1">
                    <InputField
                      label={"Телефон"}
                      name={"phone"}
                      {...register("phone", {
                        required: true,
                        pattern: /^\+[1-9]\d{1,11}$/,
                      })}
                    />
                  </div>
                  <div className="col-span-1">
                    <InputField
                      label={"Електронна пошта"}
                      name={"email"}
                      {...register("email", {
                        required: false,
                        pattern:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1 mt-4">
                  <InputField
                    label={"Пароль"}
                    name={"password"}
                    {...register("password", {
                      required: true,
                    })}
                    value={password}
                    actions={{
                      label: <ClipboardCopyIcon size={18} />,
                      onClick: () => navigator.clipboard.writeText(password),
                    }}
                    readOnly
                  />
                </div>
                {/* <div className="grid gap-3 items-center grid-cols-2 mt-5"></div> */}
              </div>
            </div>
          </div>
          {/* <DialogClose asChild>
            <IconButton>X</IconButton>
          </DialogClose> */}

          <div className="sticky bottom-0 border-t rounded-b-lg flex border-gray-200">
            <button
              type="button"
              className="cursor-pointer m-0 flex-auto flex text-black outline-none py-6 items-center justify-center border-r basis-1/2"
              onClick={() => setOpen(false)}
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="cursor-pointer m-0 flex-auto flex text-black outline-none py-6 items-center justify-center basis-1/2"
            >
              Зберегти
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPartnerModal;
