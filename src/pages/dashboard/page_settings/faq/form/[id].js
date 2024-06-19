"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import { AboutFormSection } from "@/sections/dashboard/page_settings/about_us";
import { FaqFormSection } from "@/sections/dashboard/page_settings/faq";
import axiosInstance from "@/utils/axios";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";

const FaqForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { query,push } = useRouter();
  const { id } = query;
  const title = "Add FAQ";
  const DASHBOARD_TITLE = "Dashboard";
  const backUrl = `${PATH_DASHBOARD.page_settings.faq}`;
  const EditactionUrl = "FAQ/getData";
  const UpdateActionUrl = 'FAQ/updateFAQData'
  const addActionUrl = 'FAQ/addFAQ'

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = "Title is required";
      }
      if (!values.description) {
        errors.description = "Description is required";
      }
      return errors;
    },
    onSubmit: async (values) => {

      let formData = new FormData(); //formdata object

      formData.append("title", values?.title);
      formData.append("description", values?.description);

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
            // resetForm();
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
        const  data  = response?.data?.data;;
        
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
        <FaqFormSection formik={formik} />
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
FaqForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default FaqForm;
