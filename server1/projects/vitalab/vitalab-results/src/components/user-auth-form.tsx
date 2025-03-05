"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAtom, useSetAtom } from "jotai";
import { orderAtom, otpAtom, phoneAtom } from "~/atoms";
import { Button, Input } from "./ui";
import { OTPDialog } from "./otp-dialog";
import { generateOTP } from "~/utils/generate-otp";

export function UserAuthForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [phone, setPhone] = useAtom(phoneAtom);
  const [order, setOrder] = useAtom(orderAtom);
  const setOtp = useSetAtom(otpAtom);
  const [open, setOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = async (data: any) => {
    setPhone({ phone: data.phone, verified: false });
    setOrder(data.order);
    // setIsFetching(true);

    // const res = await fetch("/api/guestbook", {
    //   body: JSON.stringify({
    //     body: input.value,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    // });

    const otp = generateOTP();
    setOtp(otp);

    const response = await fetch("/api/otp", {
      body: JSON.stringify({
        phone: data.phone,
        otp,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await response.json();
    console.log(result);

    if (result.state.value === "Accepted") {
      setIsFetching(false);
      setOpen(true);
    } else {
      console.log("error");
      setIsFetching(false);
    }
    //{
    //   "state": {
    //       "value": "Accepted"
    //   },
    //   "id": 6617169475603,
    //   "date": "Sun, 19 Mar 2023 11:31:59 +0200",
    //   "execTime": 293
    // }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-64 gap-4"
      >
        <Input
          className="h-10 bg-white"
          type="phone"
          placeholder="Телефон"
          {...register("phone")}
        />
        <Input
          className="h-10 bg-white"
          type="order"
          placeholder="Номер замовлення"
          {...register("order")}
        />
        <Button disabled={isFetching}>Увійти</Button>
      </form>

      <OTPDialog open={open} setOpen={setOpen} />
    </>
  );
}
