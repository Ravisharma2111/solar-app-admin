import { DragDrop, SelectBox, TextBox } from "@/components/form";
import { Grid } from "@mui/material";
import React from "react";

const ListAssignJobForm = ({ formik }) => {
  return (
    <Grid container spacing={2}>
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

export default ListAssignJobForm;
