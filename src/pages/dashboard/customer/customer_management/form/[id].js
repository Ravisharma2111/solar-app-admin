"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import { CustomerManagementFormSection } from "@/sections/dashboard/customer_management";
import axiosInstance from "@/utils/axios";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";

const CustomerManagementForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { query, push } = useRouter();
  const { id } = query;
  const title = "Customers";
  const DASHBOARD_TITLE = "Dashboard";
  const backUrl = `${PATH_DASHBOARD.customer.customer_management}`;
  const EditactionUrl = "customer/getData";
  const UpdateActionUrl = "customer/updateCustomerData";
  const addActionUrl = "customer/customerSignUp";

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      city: "",
      status: "",
      address: "",
      state: "",
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
        errors.mobile = "Phone is required";
      } else if (!/^[0-9]{10}$/.test(values.mobile)) {
        errors.mobile = "Please enter valid number";
      }
      if (!values.city) {
        errors.city = "City is required";
      }
      if (!values.state) {
        errors.state = "State is required";
      }
      if (!values.status) {
        errors.status = "Status is required";
      }
      if (!values.address) {
        errors.address = "Address is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors, resetForm }) => {
      let formData = new FormData();

      formData.append("name", values?.name);
      formData.append("email", values?.email);
      formData.append("mobile", values?.mobile);
      formData.append("city", values?.city);
      formData.append("state", values?.state);
      // formData.append("image", values?.image);
      formData.append("status", values?.status);
      formData.append("address", values?.address);

      const url = id === "new" ? addActionUrl : `${UpdateActionUrl}/${id}`;
      const method = id === "new" ? "POST" : "PATCH";

      await axiosInstance
        .request({
          method,
          url,
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
        console.log("response", response);
        const data = response?.data?.data;
        for (const [key] of Object.entries(formik.values)) {
          formik.setFieldValue([key], data[key]);
        }
      }
      console.log("response", response);
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
        <CustomerManagementFormSection formik={formik} />
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
CustomerManagementForm.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default CustomerManagementForm;
