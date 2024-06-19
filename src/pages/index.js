import Head from "next/head";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import DashboardSection from "@/sections/dashboard/app";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { useRouter } from "next/router";
import { PATH_DASHBOARD } from "@/routes/paths";
import React from "react";

DashboardPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function DashboardPage() {
  const router = useRouter();
  React.useEffect(() => {
    router.push(PATH_DASHBOARD.general.app);
  }, []);
  return (
    <>
      <Head>
        <title>Sor Connect</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LoadingScreen />
    </>
  );
}
