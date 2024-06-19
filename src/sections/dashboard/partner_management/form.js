import { DragDrop, SelectBox, TextBox } from "@/components/form";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Grid,
  IconButton,
} from "@mui/material";
import React from "react";

const PartnerFormSection = ({ formik }) => {
  const [open, setOpen] = React.useState(false);
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
          label="DOB"
          name="dateOfBirth"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formik?.values?.dateOfBirth}
          onChange={formik.handleChange}
          error={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Qualification"
          name="qualification"
          value={formik?.values?.qualification}
          onChange={formik.handleChange}
          error={formik.touched.qualification && formik.errors.qualification}
          helperText={
            formik.touched.qualification && formik.errors.qualification
          }
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Experience"
          name="experience"
          value={formik?.values?.experience}
          onChange={formik.handleChange}
          error={formik.touched.experience && formik.errors.experience}
          helperText={formik.touched.experience && formik.errors.experience}
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <DragDrop
          fullWidth={true}
          title="Image"
          name="file"
          label="Upload or drop a Qualification Certificate"
          url="api/upload/image"
          value={formik.values.file}
          onChange={(e) => {
            formik.setFieldValue("file", e);
          }}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <DragDrop
          fullWidth={true}
          title="Image"
          name="file"
          label="Upload or drop a Redential Certificate"
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
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Reference
        </Button>

        <Collapse in={open} sx={{ mt: 2 }}>
          <Card>
            <CardContent>
              <Box sx={{ textAlign: "right", mb: 2 }}>
                <IconButton size="small">
                  <Close fontSize="small" onClick={() => setOpen(false)} />
                </IconButton>
              </Box>
              <Box>
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextBox
                      fullWidth
                      label="Name"
                      name="name"
                      value={formik?.values?.name}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "name",
                          e.target.value.trimStart()
                        );
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
                      label="Address"
                      name="address"
                      multiline={true}
                      rows={3}
                      value={formik?.values?.address}
                      onChange={formik.handleChange}
                      error={formik.touched.address && formik.errors.address}
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default PartnerFormSection;
