"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { env } from "env.mjs"
import { useForm } from "react-hook-form"
import Turnstile from "react-turnstile"
import useSWRMutation from "swr/mutation"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

const schema = z.object({
  // order: z.coerce.number().min(1),
  order: z.string().min(1),
})

type FormData = z.infer<typeof schema>

const fetcher = async (url: string, { arg }: { arg: FormData }) => {
  const params = new URLSearchParams({
    id: arg.order,
  })

  const res = await fetch(`${url}?${params.toString()}`)
  const data = await res.json()

  if (data.status === "failed") {
    throw new Error("Не знайдено замовлення за вказаним номером")
  }

  return data
}

export const SearchOrderForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { trigger, data } = useSWRMutation("/api/orders", fetcher)
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)

  const onSubmit = async (data: FormData) => {
    if (!token) {
      console.log("token", token)
      return
    }
    const responseTurnstile = await fetch("/api/turnstile", {
      body: JSON.stringify({
        token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })

    const turnstile = await responseTurnstile.json()

    trigger(
      { order: data.order },
      {
        onSuccess: (o) => router.push(`/${o.id}`),
        onError: () =>
          setError("order", {
            type: "custom",
            message: "Не знайдено замовлення за вказаним номером",
          }),
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div>
          <Input
            id="order"
            placeholder="Номер замовлення"
            // type="number"
            autoCapitalize="none"
            autoCorrect="off"
            // disabled={isLoading || isGitHubLoading}
            {...register("order")}
          />
          {errors?.order && (
            <p className="mt-2 px-1 text-sm text-red-600">
              {errors.order.message}
            </p>
          )}
        </div>
        <Button className="w-full">Пошук замовлення</Button>
      </div>
      <div className="mt-8 w-full">
        <Turnstile
          id="cf-turnstile"
          className="mx-auto md:mx-0"
          sitekey={env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
          onVerify={(token) => setToken(token)}
        />
      </div>
    </form>
  )
}
