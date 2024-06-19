import { DragDrop, TextBox } from "@/components/form";
import { LoadingButton } from "@mui/lab";
import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const ContactUsFormSection = ({ formik }) => {
  console.log("formikformik",formik)
  return (
    <Card>
      <CardContent>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextBox
                fullWidth
                type="number"
                label="Mobile Number"
                name="mobile"
                value={formik?.values?.mobile}
                onChange={(e) => {
                  formik.setFieldValue("mobile", e.target.value.trimStart());
                }}
                error={formik.touched.mobile && formik.errors.mobile}
                helperText={formik.touched.mobile && formik.errors.mobile}
                required
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextBox
                fullWidth
                label="Email"
                name="email"
                value={formik?.values?.email}
                onChange={(e) => {
                  formik.setFieldValue("email", e.target.value.trimStart());
                }}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                required
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextBox
                fullWidth
                label="Address"
                name="address"
                multiline={true}
                rows={3}
                value={formik?.values?.address}
                onChange={formik.handleChange}
                error={formik.touched.address && formik.errors.address}
                helperText={formik.touched.address && formik.errors.address}
                // required
              />
            </Grid>
            {/* <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextBox
                fullWidth
                label="Receiver Recover Email"
                name="recovery_email"
                value={formik?.values?.recovery_email}
                onChange={(e) => {
                  formik.setFieldValue(
                    "recovery_email",
                    e.target.value.trimStart()
                  );
                }}
                error={
                  formik.touched.recovery_email && formik.errors.recovery_email
                }
                helperText={
                  formik.touched.recovery_email && formik.errors.recovery_email
                }
                // required
              />
            </Grid> */}
          </Grid>
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={formik?.isSubmitting}
            >
              Submit
            </LoadingButton>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactUsFormSection;
