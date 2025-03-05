import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Layout from "../components/templates/layout";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
