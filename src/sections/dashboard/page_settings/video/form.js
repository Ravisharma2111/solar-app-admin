import { DragDrop, SelectBox, TextBox } from "@/components/form";
import { Status } from "@/utils/constant";
import { Grid } from "@mui/material";
import React from "react";

const VideoFormSection = ({ formik }) => {
  console.log('sssssssss',formik)
  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Url"
          name="videoUrl"
          value={formik?.values?.videoUrl}
          onChange={(e) => {
            formik.setFieldValue("videoUrl", e.target.value.trimStart());
          }}
          error={formik.touched.videoUrl && formik.errors.videoUrl}
          helperText={formik.touched.videoUrl && formik.errors.videoUrl}
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
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
        />
      </Grid>
    </Grid>
  );
};

export default VideoFormSection;
