import Head from "next/head";
// import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
// import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    router.push("/patients");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>VitaLab Партнеры</title>
        <meta name="description" content="VitaLab Партнеры" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="xl:px-8 py-8 bg-grey-5 min-h-content overflow-y-auto">
        <main className="sm:mx-base sm:mx-xlarge md:mx-4xlarge xl:mx-auto xl:max-w-7xl xl:w-full h-full">
          <div>hi index</div>
        </main>
      </div>
    </>
  );
}
