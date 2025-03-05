import { auth } from "@/lib/auth";
import "@/styles/globals.css";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api
    .getSession({
      headers: await headers(),
    })
    .catch((e) => {
      redirect("/login");
    });

  if (!session) {
    redirect("/login");
  }

  return <div>{children}</div>;
}
