"use client"

import { useRouter } from "next/navigation"
import { useAtom, useAtomValue } from "jotai"
import { useForm } from "react-hook-form"
import { myStore, orderAtom, otpAtom, phoneAtom } from "~/atoms"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Button, Error, Input } from "./ui"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

export const OtpDialog = ({ open, setOpen }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const router = useRouter()

  const [phone, setPhone] = useAtom(phoneAtom)
  const order = useAtomValue(orderAtom)
  const otp = useAtomValue(otpAtom)

  const onSubmit = (data: any) => {
    console.log(order)

    setPhone({ ...phone, verified: true })

    router.push(order)
  }

  console.log(errors)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Підтвердження особистості</DialogTitle>
            <DialogDescription>
              З міркувань безпеки ми хочемо підтвердити вашу особу, тому
              відправили вам <b>SMS</b> на телефон {phone.phone} з кодом
              підтвердження.
            </DialogDescription>
            <div className="geist-container flex-1">
              <Input
                placeholder="Введіть код підтвердження"
                {...register("otp", {
                  required: "Введіть код підтвердження",
                  validate: (value) => value === otp || "Невірний код",
                })}
              />
              {errors?.otp && (
                <Error className="mt-2">{errors?.otp?.message}</Error>
              )}
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button className="hover:bg-white">Перевірити</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
