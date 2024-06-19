import { DragDrop, TextBox } from "@/components/form";
import { Grid } from "@mui/material";
import React from "react";

const AboutFormSection = ({ formik }) => {
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
          label="Title"
          name="title"
          value={formik?.values?.title}
          onChange={(e) => {
            formik.setFieldValue("title", e.target.value.trimStart());
          }}
          error={formik.touched.title && formik.errors.title}
          helperText={formik.touched.title && formik.errors.title}
          required
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
          // required
        />
      </Grid>
    </Grid>
  );
};

export default AboutFormSection;
