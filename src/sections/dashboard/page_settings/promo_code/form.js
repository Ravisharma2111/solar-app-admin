import { DragDrop, SelectBox, TextBox } from "@/components/form";
import { PromoStatus } from "@/utils/constant";
import { Grid } from "@mui/material";
import React from "react";

const PromoCodeFormSection = ({ formik }) => {
  console.log('PromoCodeFormSection',formik);
  return (
    <Grid container spacing={2}>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Promo Code"
          name="promoCode"
          value={formik?.values?.promoCode}
          onChange={(e) => {
            formik.setFieldValue("promoCode", e.target.value.trimStart());
          }}
          error={formik.touched.promoCode && formik.errors.promoCode}
          helperText={formik.touched.promoCode && formik.errors.promoCode}
          required
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <SelectBox
          fullWidth
          label="Status"
          name="status "
          value={formik?.values?.status}
          onChange={formik.handleChange}
          error={formik.touched.status && formik.errors.status}
          helperText={formik.touched.status && formik.errors.status}
          required
          options={PromoStatus}
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
          required
        />
      </Grid>
    </Grid>
  );
};

export default PromoCodeFormSection;
