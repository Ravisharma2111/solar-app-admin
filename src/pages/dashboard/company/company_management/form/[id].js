"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import { CompanyManagementFormSection } from "@/sections/dashboard/company_management";
import axiosInstance from "@/utils/axios";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";

const CompanyManagementForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { query, push } = useRouter();  const { id } = query;
  const title = "Solar Companies";
  const DASHBOARD_TITLE = "Dashboard";
  const backUrl = `${PATH_DASHBOARD.company.company_management}`;
  const EditactionUrl = "company/getData";
  const UpdateActionUrl = 'company/updateCompanyData'
  const addActionUrl = 'company/registerCompany'

  const formik = useFormik({
    initialValues: {
      name: "",
      ownerName: "",
      mobile: "",
      city: "",
      state: "",
      status: "",
      address: "",
      OandM_Required: "",
      GSTNumber: "",
      installationRequired: "",
      address: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "User name is required";
      }

      if (!values.ownerName) {
        errors.ownerName = "Owner Name is required";
      }

      if (!values.installationRequired) {
        errors.installationRequired = "Required installation is required";
      }

      if (!values.OandM_Required) {
        errors.OandM_Required = "Required O&M is required";
      }

      if (!values.GSTNumber) {
        errors.GSTNumber = "GST is required";
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
      if (!values.status) {
        errors.status = "Status is required";
      }
      if (!values.address) {
        errors.address = "Address is required";
      }
      return errors;
    },
    onSubmit: async (values) => {

      let formData = new FormData(); //formdata object

      formData.append("name", values?.name);
      formData.append("email", values?.email);
      formData.append("mobile", values?.mobile);
      formData.append("city", values?.city);

      formData.append("ownerName", values?.ownerName);
      formData.append("state", values?.state);
      formData.append("address", values?.address);
      formData.append("OandM_Required", values?.OandM_Required);
      formData.append("GSTNumber", values?.GSTNumber);
      formData.append("status", values?.status);
      console.log("formData", formData);

      const url = id === "new" ? addActionUrl : `${UpdateActionUrl}/${id}`;
      const method = id === "new" ? "POST" : "PATCH";

      
debugger
      await axiosInstance
        .request({
          method: method,
          url: url,
          data: values,
        })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {            push(backUrl);
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
        const  data  = response?.data?.data;;        // bind form data from server
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
        <CompanyManagementFormSection formik={formik} />
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
CompanyManagementForm.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default CompanyManagementForm;
