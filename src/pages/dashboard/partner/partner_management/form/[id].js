"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import { CustomerManagementFormSection } from "@/sections/dashboard/customer_management";
import { PartnerFormSection } from "@/sections/dashboard/partner_management";
import axiosInstance from "@/utils/axios";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";

const PartnerManagementForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { query, push } = useRouter();
  const { id } = query;
  const title = "Partner";
  const DASHBOARD_TITLE = "Dashboard";
  const backUrl = `${PATH_DASHBOARD.partner.partner_management}`;
  const EditactionUrl = "partner/getData";
  const UpdateActionUrl = 'partner/updatePartnerData'
  const addActionUrl = 'partner/addPartner'

  const formik = useFormik({
    initialValues: {
      name: "",
      dateOfBirth: "",
      qualification: "",
      experience: "",
      qualificationCertificate: "",
      residentialCertificate: "",
      address: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "User name is required";
      }
      if (!values.dateOfBirth) {
        errors.dateOfBirth = "DOB no. is required";
      }
      if (!values.qualification) {
        errors.qualification = "Qualification is required";
      }
      if (!values.experience) {
        errors.experience = "Experience is required";
      }
      // if (!values.qualificationCertificate) {
      //   errors.qualificationCertificate =
      //     "Qualification Certificate is required";
      // }
      // if (!values.residentialCertificate) {
      //   errors.residentialCertificate = "Redential Certificate is required";
      // }
      if (!values.address) {
        errors.address = "Address is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      let formData = new FormData(); 

      formData.append("name", values?.name);
      formData.append("dateOfBirth", values?.dateOfBirth);
      formData.append("qualification", values?.qualification);
      formData.append("experience", values?.experience);
      formData.append("address", values?.address);
      formData.append("qualificationCertificate", values?.qualificationCertificate);
      formData.append("residentialCertificate", values?.residentialCertificate);

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
          const  data  = response?.data?.data;        // bind form data from server
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
        <PartnerFormSection formik={formik} />
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
PartnerManagementForm.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default PartnerManagementForm;
