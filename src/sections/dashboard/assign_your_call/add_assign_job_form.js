import { DragDrop, SelectBox, TextBox } from "@/components/form";
import { Status, cityOption, userOption } from "@/utils/constant";
import { Grid } from "@mui/material";
import React from "react";

const AddAssignJobForm = ({ formik }) => {
  return (
    <Grid container spacing={2}>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <SelectBox
          fullWidth
          label="City"
          name="city "
          value={formik?.values?.city}
          onChange={(e) => {
            formik.setFieldValue("city ", e.target.value);
          }}
          error={formik.touched.city && formik.errors.city}
          helperText={formik.touched.city && formik.errors.city}
          required
          options={cityOption}
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <SelectBox
          fullWidth
          label="User"
          name="user "
          value={formik?.values?.user}
          onChange={(e) => {
            formik.setFieldValue("user ", e.target.value.trimStart());
          }}
          error={formik.touched.user && formik.errors.user}
          helperText={formik.touched.user && formik.errors.user}
          required
          options={userOption}
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Title"
          name="title"
          multiline={true}
          value={formik?.values?.title}
          onChange={formik.handleChange}
          error={formik.touched.title && formik.errors.title}
          helperText={formik.touched.title && formik.errors.title}
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Description"
          name="description"
          multiline={true}
          rows={3}
          value={formik?.values?.description}
          onChange={formik.handleChange}
          error={formik.touched.description && formik.errors.description}
          helperText={formik.touched.description && formik.errors.description}
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Notes"
          name="notes"
          multiline={true}
          rows={3}
          value={formik?.values?.notes}
          onChange={formik.handleChange}
          error={formik.touched.notes && formik.errors.notes}
          helperText={formik.touched.notes && formik.errors.notes}
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

export default AddAssignJobForm;
