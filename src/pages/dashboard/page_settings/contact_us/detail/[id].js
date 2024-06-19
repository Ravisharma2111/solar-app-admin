"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import { AboutDetailSection } from "@/sections/dashboard/page_settings/about_us";
import { ContactUsDetailSection } from "@/sections/dashboard/page_settings/contact_us";
import { FaqDetailSection } from "@/sections/dashboard/page_settings/faq";
import axiosInstance from "@/utils/axios";
import { LoadingButton } from "@mui/lab";
import { Container, Stack } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";

const ContactUsDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { query } = useRouter();
  const { id } = query;
  const title = "Contact Us";
  const DASHBOARD_TITLE = "Dashboard";
  const backUrl = `${PATH_DASHBOARD.page_settings.contact_us}`;
  const addActionUrl = "contactUs/createContactUs";
  const [data, setDate] = React.useState({});



  const formik = useFormik({
    initialValues: {
      mobile: "",
      email: "",
      address: "",
     
    },
    validate: (values) => {
      const errors = {};
    
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.mobile) {
        errors.mobile = "Mobile no. is required";
      }
      if (!values.address) {
        errors.address = "Address is required";
      }
      return errors;
    },
    onSubmit: async (values , { setErrors }) => {
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

            navigate(-1);
            formik.resetForm();

          }
        })
        .catch((error) => {
          const { response } = error;
          // show error message
          enqueueSnackbar(response?.data?.message, {
            variant: "error",
          });

          // set server er  ror
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
      <ContactUsDetailSection data={data} />
    </ContainerComponent>
  );
};
ContactUsDetails.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default ContactUsDetails;
