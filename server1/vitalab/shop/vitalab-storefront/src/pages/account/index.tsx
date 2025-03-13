// import { Layout } from "@components/common";
// import AccountLayout from "@modules/account/templates/account-layout";
// import OverviewTemplate from "@modules/account/templates/overview-template";
// import Head from "@modules/common/components/head";
// // import Layout from "@modules/layout/templates"
// import type { ReactElement } from "react";
// import type { NextPageWithLayout } from "types/global";

// const Account: NextPageWithLayout = () => {
//   return (
//     <>
//       <Head title="Account" description="Overview of your account activity." />
//       <OverviewTemplate />
//     </>
//   );
// };

// Account.getLayout = (page: ReactElement) => {
//   return (
//     <Layout>
//       <AccountLayout>{page}</AccountLayout>
//     </Layout>
//   );
// };

// export default Account;

import { Layout } from "@components/common";
import AccountLayout from "@modules/account/templates/account-layout";
import ProfileTemplate from "@modules/account/templates/profile-template";
import Head from "@modules/common/components/head";
// import Layout from "@modules/layout/templates"
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "types/global";

const Profile: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Profile" description="View and edit your ACME profile." />
      <ProfileTemplate />
    </>
  );
};

Profile.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  );
};

export default Profile;
