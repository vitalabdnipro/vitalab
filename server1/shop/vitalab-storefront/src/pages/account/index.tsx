import { Layout } from "@components/common";
import AccountLayout from "@modules/account/templates/account-layout";
import ProfileTemplate from "@modules/account/templates/profile-template";
import Head from "@modules/common/components/head";
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
