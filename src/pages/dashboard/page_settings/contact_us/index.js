"use client";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import Iconify from "@/components/iconify/Iconify";
import {
  Avatar,
  Button,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import axiosInstance from "@/utils/axios";
import NextLink from "next/link";
import { ContainerComponent } from "@/components/container";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { PATH_DASHBOARD } from "@/routes/paths";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { ContactUsFormSection } from "@/sections/dashboard/page_settings/contact_us";
import { useFormik } from "formik";

const ContactUS = () => {
  const { push } = useRouter();
  const title = "Contact Us";
  const DASHBOARD_TITLE = "Dashboard";
  const detailUrl = `${PATH_DASHBOARD.page_settings.contact_us}/detail`;
  const addActionUrl = "contactUs/createContactUs";

  const rows = [
    {
      id: 1,
      name: "Snow Jon",
      email: "sor@gmail.com",
      subject: "asdf",
      message: "Hello World",
      createOn: "03/08/23",
    },
    {
      id: 2,
      name: "Lannister Cersei",
      email: "sor@gmail.com",
      subject: "asdf",
      message: "Hello World",
      createOn: "03/08/23",
    },
    {
      id: 3,
      name: "Lannister Jaime",
      email: "sor@gmail.com",
      subject: "asdf",
      message: "Hello World",
      createOn: "03/08/23",
    },
    {
      id: 4,
      name: "Stark Arya",
      email: "sor@gmail.com",
      subject: "asdf",
      message: "Hello World",
      createOn: "03/08/23",
    },
    {
      id: 5,
      name: "Targaryen Daenerys",
      email: "sor@gmail.com",
      subject: "asdf",
      message: "Hello World",
      createOn: "03/08/23",
    },
    {
      id: 6,
      name: "Clifford Ferrara",
      email: "sor@gmail.com",
      subject: "asdf",
      message: "Hello World",
      createOn: "03/08/23",
    },
    {
      id: 7,
      name: "Frances Rossini",
      email: "sor@gmail.com",
      subject: "asdf",
      message: "Hello World",
      createOn: "03/08/23",
    },
    {
      id: 8,
      name: "Roxie Harvey",
      email: "sor@gmail.com",
      subject: "asdf",
      message: "Hello World",
      createOn: "03/08/23",
    },
  ];

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: "120",
      getActions: (params) => [
        <GridActionsCellItem
          key="viewAction"
          icon={
            <Tooltip title="Detail">
              <Iconify icon="bx:detail" width={25} />
            </Tooltip>
          }
          label="Detail"
          onClick={() => push(`${detailUrl}/${params.id}`)}
        />,
      ],
    },
    {
      field: "name",
      headerName: "Name",
      width: "200",
    },
    {
      field: "email",
      headerName: "Email",
      width: "200",
    },
    {
      field: "subject",
      headerName: "Subject",
      width: "200",
    },
    {
      field: "message",
      headerName: "Message",
      width: "300",
    },
  ];

  const formik = useFormik({
    initialValues: {
      mobile: "",
      email: "",
      address: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.mobile) {
        errors.mobile = "mobile is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      }
      if (!values.address) {
        errors.address = "Address is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      let formData = new FormData(); //formdata object

      formData.append("email", values?.email);
      formData.append("mobile", values?.mobile);
      formData.append("address", values?.address);
      
      console.log("formData", formData);

      let method = "POST";
      let url = addActionUrl;  
      await axiosInstance
        .request({
          method: method,
          url: url,
          data: values,
        })
        .then((response) => {
          if (response.status === 200) {
            enqueueSnackbar(response.data.message, {
              variant: "success",
            });
          }
        })
        .catch((error) => {
          const { response } = error;
          // show error message
          enqueueSnackbar(response?.data?.message, {
            variant: "error",
          });

          // set server error
          if (response.status === 422) {
            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(values)) {
              if (response.data.errors[key]) {
                setErrors({ [key]: response.data.errors[key][0] });
              }
            }
          }
        });
    },
  });

  return (
    <>
      <Head>
        <title>{title} List</title>
      </Head>
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
              // href: "#",
            },
            {
              name: "List",
            },
          ]}
        />
        <Stack spacing={4}>
          <ContactUsFormSection formik={formik} />
        </Stack>
      </ContainerComponent>
    </>
  );
};
ContactUS.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default ContactUS;
