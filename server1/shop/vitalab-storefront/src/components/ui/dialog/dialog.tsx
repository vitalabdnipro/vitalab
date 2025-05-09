import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const DialogContent = React.forwardRef(
  ({ children, title, ...props }, forwardedRef) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 h-full w-full bg-black opacity-30 transition-opacity" />
      <div className="fixed top-0 left-0 z-[60] flex h-screen w-screen flex-col content-center items-center justify-center overflow-auto">
        <DialogPrimitive.Content
          {...props}
          className="drop-shadow-3xl relative flex min-w-[360px] max-w-full flex-col rounded-lg bg-white text-black sm:min-w-[500px]"
          ref={forwardedRef}
        >
          <DialogPrimitive.Close asChild>
            <button className="absolute top-2 right-2 inline-flex h-7 min-w-[28px] shrink-0 items-center justify-center rounded outline-none transition ease-hover hover:border-[#3c3d53] hover:bg-gray-200 hover:text-[#eeeffc]">
              <svg width="16" height="16" viewBox="-7 -7 38 38" fill="#858699">
                <path d="M0.439127 21.44C0.157865 21.7214 -9.37008e-05 22.103 7.33302e-08 22.5008C9.38474e-05 22.8987 0.158232 23.2802 0.439627 23.5615C0.721022 23.8427 1.10262 24.0007 1.50048 24.0006C1.89834 24.0005 2.27987 23.8424 2.56113 23.561L11.8231 14.3C11.8463 14.2767 11.8739 14.2582 11.9043 14.2456C11.9347 14.233 11.9672 14.2265 12.0001 14.2265C12.033 14.2265 12.0656 14.233 12.0959 14.2456C12.1263 14.2582 12.1539 14.2767 12.1771 14.3L21.4391 23.563C21.5784 23.7023 21.7437 23.8128 21.9257 23.8883C22.1077 23.9637 22.3028 24.0025 22.4998 24.0026C22.6968 24.0026 22.8919 23.9639 23.0739 23.8885C23.2559 23.8132 23.4213 23.7027 23.5606 23.5635C23.7 23.4242 23.8105 23.2589 23.8859 23.0769C23.9614 22.8949 24.0002 22.6998 24.0003 22.5028C24.0003 22.3058 23.9615 22.1107 23.8862 21.9287C23.8109 21.7467 23.7004 21.5813 23.5611 21.442L14.3001 12.177C14.2768 12.1537 14.2584 12.1262 14.2458 12.0958C14.2332 12.0654 14.2267 12.0329 14.2267 12C14.2267 11.9671 14.2332 11.9345 14.2458 11.9042C14.2584 11.8738 14.2768 11.8462 14.3001 11.823L23.5631 2.56097C23.8444 2.27931 24.0022 1.89745 24.002 1.49941C24.0017 1.10136 23.8433 0.71973 23.5616 0.438468C23.28 0.157206 22.8981 -0.000647135 22.5001 -0.000365836C22.102 -8.45362e-05 21.7204 0.158308 21.4391 0.439968L12.1771 9.69997C12.1539 9.72325 12.1263 9.74172 12.0959 9.75432C12.0656 9.76693 12.033 9.77342 12.0001 9.77342C11.9672 9.77342 11.9347 9.76693 11.9043 9.75432C11.8739 9.74172 11.8463 9.72325 11.8231 9.69997L2.56113 0.439968C2.42186 0.300636 2.25651 0.190098 2.07453 0.114667C1.89254 0.0392356 1.69748 0.000387673 1.50048 0.000341244C1.10262 0.000247476 0.721022 0.158206 0.439627 0.439468C0.158232 0.72073 9.38099e-05 1.10226 4.17235e-08 1.50011C-9.37265e-05 1.89797 0.157865 2.27957 0.439127 2.56097L9.70013 11.823C9.72341 11.8462 9.74188 11.8738 9.75448 11.9042C9.76709 11.9345 9.77357 11.9671 9.77357 12C9.77357 12.0329 9.76709 12.0654 9.75448 12.0958C9.74188 12.1262 9.72341 12.1537 9.70013 12.177L0.439127 21.44Z"></path>
              </svg>
            </button>
          </DialogPrimitive.Close>
          <div className="p-8">
            {title && <DialogHeader title={title} />}
            {props.description && (
              <p className="pb-5 text-sm text-gray-500">{props.description}</p>
            )}
            {children}
          </div>
        </DialogPrimitive.Content>
      </div>
    </DialogPrimitive.Portal>
  )
);

const DialogHeader = (props) => {
  return (
    <h3 className="pb-1 text-xl font-semibold text-gray-900" id="modal-title">
      {props.title}
    </h3>
  );
};

DialogContent.displayName = "DialogContent";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
