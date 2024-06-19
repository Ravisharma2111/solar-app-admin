import { DragDrop, SelectBox, TextBox } from "@/components/form";
import { Status } from "@/utils/constant";
import { Grid } from "@mui/material";
import React from "react";

const SolarEnquiryFormSection = ({ formik }) => {
  console.log("formik",formik);

  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Name"
          name="name"
          value={formik?.values?.name}
          onChange={(e) => {
            formik.setFieldValue("name", e.target.value.trimStart());
          }}
          error={formik.touched.name && formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          type="number"
          label="Mobile"
          name="mobile"
          value={formik?.values?.mobile}
          onChange={formik.handleChange}
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
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
          required
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <DragDrop
          fullWidth={true}
          title="Image"
          name="file"
          url="api/upload/image"
          value={formik.values.file}
          onChange={(e) => {
            formik.setFieldValue("file", e);
          }}
          label="Upload Latest electricity bill"
        />
        {/* <TextBox
          fullWidth
          label="Latest electricity bill"
          name="latest_electricity_bill"
          value={formik?.values?.latest_electricity_bill}
          onChange={formik.handleChange}
          error={
            formik.touched.latest_electricity_bill &&
            formik.errors.latest_electricity_bill
          }
          helperText={
            formik.touched.latest_electricity_bill &&
            formik.errors.latest_electricity_bill
          }
          required
        /> */}
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="State"
          name="state"
          value={formik?.values?.state}
          onChange={formik.handleChange}
          error={formik.touched.state && formik.errors.state}
          helperText={formik.touched.state && formik.errors.state}
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="City"
          name="city"
          value={formik?.values?.city}
          onChange={formik.handleChange}
          error={formik.touched.city && formik.errors.city}
          helperText={formik.touched.city && formik.errors.city}
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
        />
      </Grid>
    </Grid>
  );
};

export default SolarEnquiryFormSection;
