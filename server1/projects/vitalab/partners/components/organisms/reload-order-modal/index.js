import { useState, useCallback, useEffect } from "react";
import useNotification from "../../../hooks/useNotification";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled, keyframes } from "@stitches/react";
import { useForm } from "react-hook-form";
import InputField from "../../atoms/text-input/input";
import RefreshIcon from "../../fundamentals/icons/refresh-icon";
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

const ReloadOrderModal = () => {
  const [open, setOpen] = useState(false);
  const notification = useNotification();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset();
  }, [open, reset]);

  const onSubmit = async ({ order }) => {
    await fetch(`/api/orders/reload`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number: order }),
    });

    // const result = await response.json();
    // console.log(result);
    notification("Замовлення додано до черги на оновлення", "success");

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
          className="py-1.5 px-3 my-0.5 rounded-base flex items-center"
        >
          <RefreshIcon />
          <span className="ml-3">Оновити замовлення</span>
        </button>
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6">
            <DialogTitle>Оновити замовлення</DialogTitle>
          </div>
          <div className="p-6 border-t bg-[#fafafa]">
            <div>
              <div className="flex flex-col mb-2 flex-wrap w-full justify-center items-stretch basis-auto">
                <div className="flex flex-col flex-1">
                  <InputField
                    label={"Номер замовлення"}
                    name={"order"}
                    {...register("order", {
                      required: true,
                      pattern: {
                        value: /^[0-9]{12}$/,
                        message: "Номер замовлення складається із 12 цифр.",
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="order"
                    render={({ message }) => (
                      <div className="mt-2 -mb-5 text-sm">{message}</div>
                    )}
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
              Оновити
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReloadOrderModal;
