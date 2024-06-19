"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import { CustomerManagementFormSection } from "@/sections/dashboard/customer_management";
import { OperationFormSection } from "@/sections/dashboard/operation_maintain_ace_solar";
import { SolarEnquiryFormSection } from "@/sections/dashboard/solar_enquiry";
import axiosInstance from "@/utils/axios";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";

const OperationMaintainForm = ({ params }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { query, push } = useRouter();
  const { id } = query;
  const title = "Maintaintenance Enquiries";
  const DASHBOARD_TITLE = "Dashboard";
  const backUrl = `${PATH_DASHBOARD.operation.operation_maintain_ace_solar}`;
  const EditactionUrl = "maintenanceEnquiry/getData";
  const UpdateActionUrl = 'maintenanceEnquiry/updateMaintenanceEnquiryData'
  const addActionUrl = 'maintenanceEnquiry/addMaintenanceEnquiry'
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      city: "",
      address: "",
      state: "",
      // image: "",
      solarCapacity: "",
      maintenanceReason: "",
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
      // if (!values.image) {
      //   errors.image = "Latest Electricity Bill is required";
      // }
      if (!values.solarCapacity) {
        errors.solarCapacity = "Solar Capacity is required";
      }
      if (!values.address) {
        errors.address = "Address is required";
      }
      return errors;
    },
    onSubmit: async (values , { setErrors }) => {
      let formData = new FormData(); //formdata object

      formData.append("name", values?.name);
      formData.append("email", values?.email);
      formData.append("mobile", values?.mobile);
      formData.append("city", values?.city);
      formData.append("state", values?.state);
      formData.append("address", values?.address);
      // formData.append("image", values?.image);
      formData.append("solarCapacity", values?.solarCapacity);
      formData.append("maintenanceReason", values?.maintenanceReason);
      console.log("formData", formData);

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

  const bindData = async (id) => {
    await axiosInstance.get(`${EditactionUrl}/${id}`).then((response) => {
      if (response.status === 200) {
        console.log("response", response);
        const  data  = response?.data?.data;;
        // bind form data from server
        for (const [key] of Object.entries(formik.values)) {
          formik.setFieldValue([key], data[key]);
        }
        formik.setFieldValue(
          "latest_electricity_bill",
          `${data.electricityBillImage}${data?.electricityBillImage}`
        );
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
        <OperationFormSection formik={formik} />
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
OperationMaintainForm.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default OperationMaintainForm;
