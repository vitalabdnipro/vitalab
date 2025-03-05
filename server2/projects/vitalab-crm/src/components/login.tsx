"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "./ui/card";

export const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Card className="mx-auto flex w-[400px] flex-col items-center justify-center">
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Пароль</Label>
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="password"
            placeholder="Пароль"
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          onClick={async () => {
            if (email.includes("@")) {
              await signIn.email(
                {
                  email: email,
                  password: password,
                },
                {
                  onRequest: () => {
                    setLoading(true);
                  },
                  onResponse: () => {
                    setLoading(false);
                  },
                  onError: (ctx) => {
                    console.log(ctx.error.message);
                  },
                  onSuccess: () => {
                    void router.push("/");
                  },
                },
              );
            }
          }}
        >
          {loading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-spin"
            >
              <path d="M12 2v4" />
              <path d="m16.2 7.8 2.9-2.9" />
              <path d="M18 12h4" />
              <path d="m16.2 16.2 2.9 2.9" />
              <path d="M12 18v4" />
              <path d="m4.9 19.1 2.9-2.9" />
              <path d="M2 12h4" />
              <path d="m4.9 4.9 2.9 2.9" />
            </svg>
          ) : (
            "Увійти"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
