import { useState, useCallback, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled, keyframes } from "@stitches/react";
// import uk from "date-fns/locale/uk";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { createPatient } from "../../../lib/db";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";
import dayjs from "dayjs";

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

const EditPatientModal = (props) => {
  const { firstName, lastName, middleName, birthday, gender, phone, email } =
    props.patient;

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => reset(), [open]);
  useEffect(() => {
    if (props.patient) {
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("middleName", middleName);
      setValue("birthday", dayjs(birthday).format("DD.MM.YYYY"));
      setValue("gender", gender);
      setValue("phone", phone);
      setValue("email", email);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const { register, control, handleSubmit, reset, watch, setValue } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    const res = await fetch(`/api/patients/${id}`, {
      body: JSON.stringify({
        data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    // const { error } = await res.json();
    // if (error) {
    //   console.log(error);
    //   // setForm({
    //   //   state: Form.Error,
    //   //   message: error,
    //   // });
    //   // return;
    // }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6">
            <DialogTitle>Редагувати пацієнта</DialogTitle>
          </div>
          <div className="p-6 border-t bg-[#fafafa]">
            <div>
              <div className="flex flex-col mb-2 flex-wrap w-full justify-center items-stretch basis-auto">
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor="lastName"
                    className="block text-xs font-medium text-gray-800 uppercase mb-2"
                  >
                    Прізвище
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("lastName", {
                        required: true,
                        pattern: /^\S*$/,
                      })}
                      id="lastName"
                      className="px-4 py-2 text-sm w-full outline-none rounded-md transition-all border focus:border-gray-400 focus:shadow-[0_0_0_2px_rgba(62,207,142,.1)]"
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1 mt-5">
                  <label
                    htmlFor="firstName"
                    className="block text-xs font-medium text-gray-800 uppercase mb-2"
                  >
                    Ім&apos;я
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("firstName", {
                        required: true,
                        pattern: /^\S*$/,
                      })}
                      id="firstName"
                      className="px-4 py-2 text-sm w-full outline-none rounded-md transition-all border focus:border-gray-400 focus:shadow-[0_0_0_2px_rgba(62,207,142,.1)]"
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1 mt-5">
                  <label
                    htmlFor="middleName"
                    className="block text-xs font-medium text-gray-800 uppercase mb-2"
                  >
                    По батькові
                  </label>
                  <div className="mt-1">
                    <input
                      id="middleName"
                      className="px-4 py-2 text-sm w-full outline-none rounded-md transition-all border focus:border-gray-400 focus:shadow-[0_0_0_2px_rgba(62,207,142,.1)]"
                      {...register("middleName", {
                        required: false,
                        pattern: /^\S*$/,
                      })}
                    />
                  </div>
                </div>
                <div className="grid gap-3 items-center grid-cols-2 mt-5">
                  <div className="col-span-1">
                    <label
                      htmlFor="birthday"
                      className="block text-xs font-medium text-gray-800 uppercase mb-2"
                    >
                      Дата народження
                    </label>
                    <div className="mt-1">
                      <Controller
                        control={control}
                        name="birthday"
                        render={({ field: { onChange, name, value } }) => (
                          <NumberFormat
                            id="birthday"
                            className="px-4 py-2 text-sm w-full outline-none rounded-md transition-all border focus:border-gray-400 focus:shadow-[0_0_0_2px_rgba(62,207,142,.1)]"
                            placeholder="ДД.ММ.ГГГГ"
                            format="##.##.####"
                            name={name}
                            value={value}
                            onValueChange={(values, sourceInfo) => {
                              const { formattedValue, value } = values;
                              const { event, source } = sourceInfo;
                            }}
                            // allowEmptyFormatting
                            mask="_"
                            onChange={onChange}
                          />
                        )}
                      />
                      {/* <Controller
                        control={control}
                        name="birthday"
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <ReactDatePicker
                            locale="uk"
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            placeholderText="день/месяц/год"
                            dateFormat="dd/MM/yyyy"
                          />
                        )}
                      /> */}
                      {/* <input
                        id="birthday"
                        type="date"
                        pattern="\d{4}\\d{2}\\d{2}"
                        className="px-4 py-2 text-sm w-full outline-none rounded-md transition-all border focus:border-gray-400 focus:shadow-[0_0_0_2px_rgba(62,207,142,.1)]"
                        {...register("birthday", {
                          required: true,
                          valueAsDate: true,
                        })}
                      /> */}
                      {/* <input
                        id="birthday"
                        type="date"
                        className="px-4 py-2 text-sm w-full outline-none rounded-md transition-all border focus:border-gray-400 focus:shadow-[0_0_0_2px_rgba(62,207,142,.1)]"
                        {...register("birthday", {
                          required: true,
                          valueAsDate: true,
                        })}
                      /> */}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="gender"
                      className="block text-xs font-medium text-gray-800 uppercase mb-2"
                    >
                      Стать
                    </label>
                    <div className="mt-1">
                      <select
                        {...register("gender")}
                        id="gender"
                        className="block w-full px-4 py-2 text-sm border outline-none h-[38px] focus:outline-none sm:text-sm rounded-md transition-all"
                      >
                        <option value="Не вказано">Не указано</option>
                        <option value="Жінка">Жінка</option>
                        <option value="Чоловік">Чоловік</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 items-center grid-cols-2 mt-5">
                  <div className="col-span-1">
                    <label
                      htmlFor="phone"
                      className="block text-xs font-medium text-gray-800 uppercase mb-2"
                    >
                      Телефон
                    </label>
                    <div className="mt-1">
                      <input
                        id="phone"
                        placeholder="+380123456789"
                        className="px-4 py-2 text-sm w-full outline-none rounded-md transition-all border focus:border-gray-400 focus:shadow-[0_0_0_2px_rgba(62,207,142,.1)]"
                        {...register("phone", {
                          required: true,
                          pattern: /^\+[1-9]\d{1,11}$/,
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-gray-800 uppercase mb-2"
                    >
                      Електронна пошта
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        className="px-4 py-2 text-sm w-full outline-none rounded-md transition-all border focus:border-gray-400 focus:shadow-[0_0_0_2px_rgba(62,207,142,.1)]"
                        {...register("email", {
                          required: false,
                          pattern:
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                      />
                    </div>
                  </div>
                </div>
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

export default EditPatientModal;
