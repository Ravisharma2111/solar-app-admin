"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import { AboutDetailSection } from "@/sections/dashboard/page_settings/about_us";
import { FaqDetailSection } from "@/sections/dashboard/page_settings/faq";
import axiosInstance from "@/utils/axios";
import { LoadingButton } from "@mui/lab";
import { Container, Stack } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";

const PromoCodeDetail = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { query } = useRouter();
  const { id } = query;
  const title = "Promo Code";
  const DASHBOARD_TITLE = "Dashboard";
  const backUrl = `${PATH_DASHBOARD.page_settings.promo_code}`;
  const actionUrl = "#";
  const [data, setDate] = React.useState({});

  //   const getData = async (id) => {
  //     await axiosInstance.get(`${actionUrl}/${id}`).then((response) => {
  //       if (response.status === 200) {
  //         const { data } = response;
  //         // bind form data from server
  //         for (const [key] of Object.entries(formik.values)) {
  //           formik.setFieldValue([key], data[key]);
  //         }
  //       }
  //     });
  //   };

  //   React.useEffect(() => {
  //     if (id && id !== "new") {
  //       getData(id);
  //     }
  //   }, [id]);

  return (
    <ContainerComponent>
      <CustomBreadcrumbs
        heading={title}
        links={[
          {
            name: DASHBOARD_TITLE,
            href: PATH_DASHBOARD.general.app,
          },
          {
            name: title,
            href: backUrl,
          },
          { name: `${title} Detail` },
        ]}
      />
      <FaqDetailSection data={data} />
    </ContainerComponent>
  );
};
PromoCodeDetail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default PromoCodeDetail;
