"use client";

import { useAtom, useAtomValue } from "jotai";
import { myStore, orderAtom, otpAtom, phoneAtom } from "~/atoms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button, Input } from "./ui";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const OTPDialog = ({ open, setOpen }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [phone, setPhone] = useAtom(phoneAtom);
  const order = useAtomValue(orderAtom);
  const otp = useAtomValue(otpAtom);

  const onSubmit = (data: any) => {
    setPhone({ ...phone, verified: true });

    // router.push("/new-page?id=5");
    router.push(`${order}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure? {otp}</DialogTitle>
            <DialogDescription>
              З міркувань безпеки ми хочемо підтвердити вашу особу, тому
              відправили вам SMS на телефон {phone.phone} з кодом підтвердження.
            </DialogDescription>
            <Input
              placeholder="Введіть код підтвердження"
              {...register("otp")}
            />
            {/* <Button type="submit">Перевірити</Button> */}
          </DialogHeader>
          <DialogFooter>
            <Button>Перевірити</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
