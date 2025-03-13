import { useState, useCallback, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled, keyframes } from "@stitches/react";
// import uk from "date-fns/locale/uk";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { createPatient } from "../../../lib/db";
import NumberFormat from "react-number-format";
import { ErrorMessage } from "@hookform/error-message";

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
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 30px 60px rgba(0,0,0,.12)", // "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  color: "#000",
  zIndex: 55,
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

const SetOrderNumberModal = ({ onSetOrderNumber }) => {
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => reset(), [open]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onSetOrderNumber(data.number);
    setOpen(false);
  };

  const validateOrderExist = async (value) => {
    const request = await fetch(`/api/orders/number?n=${value}`);

    const n = await request.json();

    return n.number ? false : true;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          // className="inline-flex items-center px-2.5 py-1.5 border border-gray-200 text-xs leading-4 font-semibold rounded shadow-sm text-gray-900 bg-white hover:border-gray-900 focus:outline-none transition ease-out duration-200"
          className="font-medium text-sm bg-white border-0 h-7 flex items-center py-1 px-2 rounded-md duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-[#3c4257] shadow-stripe hover:text-[#1a1f36] hover:shadow-stripeHover hover:fill-[#1a1f36] fill-[#4f566b] outline-none focus:ring focus:ring-[rgba(58,151,212,0.36)] focus:border-blue-500"
        >
          {/* inline-flex items-center px-2.5 py-1.5 border border-gray-200 shadow-sm text-xs font-semibold rounded text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 */}
          # Встановити номер замовлення
        </button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6">
            <DialogTitle>Встановити номер замовлення</DialogTitle>
          </div>
          <div className="p-6 border-t bg-[#fafafa]">
            <div>
              <div className="flex flex-col flex-wrap w-full justify-center items-stretch basis-auto">
                <div className="flex flex-col flex-1">
                  {/* <label
                    htmlFor="lastName"
                    className="block text-xs font-medium text-gray-800 uppercase mb-2"
                  >
                    Фамилия
                  </label> */}
                  <div className="mt-1">
                    <input
                      {...register("number", {
                        required: {
                          value: true,
                          message: `Потрібно ввести номер замовлення.`,
                        },
                        pattern: {
                          value: /^[0-9]{12}$/,
                          message: "Номер замовлення складається із 12 цифр.",
                        },
                        validate: {
                          checkOrderExist: async (v) =>
                            (await validateOrderExist(v)) ||
                            "Такий номер замовлення вже зареєстровано.",
                          checkOrderNumberRange: (v) =>
                            v.match(/^555\d{9}$/) && "Ви не можете встановити цей номер замовлення.",
                        },
                      })}
                      id="number"
                      className="px-4 py-2 text-sm w-full outline-none rounded-md transition-all border focus:border-gray-400 focus:shadow-[0_0_0_2px_rgba(62,207,142,.1)]"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="number"
                      render={({ message }) => (
                        <div className="text-center mt-2 text-sm">
                          {message}
                        </div>
                      )}
                    />

                    {/* use role="alert" to announce the error message
                    {errors.name && errors.name.type === "required" && (
                      <span role="alert">This is required</span>
                    )}
                    {errors.name && errors.name.type === "maxLength" && (
                      <span role="alert">Max length exceeded</span>
                    )} */}
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

export default SetOrderNumberModal;
