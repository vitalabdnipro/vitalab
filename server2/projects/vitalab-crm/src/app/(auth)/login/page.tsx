import { Login } from "@/components/login";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth.api
    .getSession({
      headers: await headers(),
    })
    .catch((e) => {
      redirect("/");
    });

  console.log(session);

  if (session) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Login />
    </div>
  );
}
