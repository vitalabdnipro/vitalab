import { SignUp } from "@/components/signup";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  redirect("/login");
  // return <SignUp />;
}
