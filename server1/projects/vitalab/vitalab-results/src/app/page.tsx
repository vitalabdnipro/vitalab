import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { UserAuthForm } from "~/components/user-auth-form";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <UserAuthForm />
    </div>
  );
}
