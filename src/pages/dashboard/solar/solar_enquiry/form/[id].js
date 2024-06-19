"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import { CustomerManagementFormSection } from "@/sections/dashboard/customer_management";
import { SolarEnquiryFormSection } from "@/sections/dashboard/solar_enquiry";
import axiosInstance from "@/utils/axios";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";

const SolarEnquiryForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { query, push } = useRouter();
  const { id } = query;
  const title = "Solar Enquiries";
  const DASHBOARD_TITLE = "Dashboard";
  const backUrl = `${PATH_DASHBOARD.solar.solar_enquiry}`;
  const EditactionUrl = "solarEnquiry/getData";
  const UpdateActionUrl = 'solarEnquiry/updateSolarEnquiryData'
  const addActionUrl = 'solarEnquiry/addSolarEnquiry'

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      city: "",
      address: "",
      state: "",
      // latest_electricity_bill: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "User name is required";
      }
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
      if (!values.city) {
        errors.city = "City is required";
      }
      if (!values.state) {
        errors.state = "State is required";
      }
      // if (!values.latest_electricity_bill) {
      //   errors.latest_electricity_bill = "Latest Electricity Bill is required";
      // }
      if (!values.address) {
        errors.address = "Address is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      let formData = new FormData(); //formdata object

      formData.append("name", values?.name);
      formData.append("email", values?.email);
      formData.append("city", values?.city);
      formData.append("state", values?.state);
      formData.append("address", values?.address);
      // formData.append("image", values?.image);
      formData.append("mobile", values?.mobile);
      console.log("formData", formData);

      const url = id === "new" ? addActionUrl : `${UpdateActionUrl}/${id}`;
      const method = id === "new" ? "POST" : "PATCH";

      await axiosInstance
        .request({
          method: method,
          url: url,
          data: values,
        })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            push(backUrl);
            enqueueSnackbar(response.data.message, {
              variant: "success",
            });
            resetForm();
          } else {
            enqueueSnackbar({
              message: response.data.message,
              severity: "error",
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

  const bindData = async (id) => {
    await axiosInstance.get(`${EditactionUrl}/${id}`).then((response) => {
      if (response.status === 200) {
        const  data  = response?.data?.data;;
        // bind form data from server
        for (const [key] of Object.entries(formik.values)) {
          formik.setFieldValue([key], data[key]);
        }
      }
    });
  };

  React.useEffect(() => {
    if (id && id !== "new") {
      bindData(id);
    }
  }, [id]);

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
          { name: `${title} Form` },
        ]}
      />
      <form noValidate onSubmit={formik.handleSubmit}>
        <SolarEnquiryFormSection formik={formik} />
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={formik?.isSubmitting}
          >
            {id === "new" ? "Submit" : "Update"}
          </LoadingButton>
        </Stack>
      </form>
    </ContainerComponent>
  );
};
SolarEnquiryForm.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default SolarEnquiryForm;
