import { DragDrop, TextBox } from "@/components/form";
import Label from "@/components/label";
import { Grid, Typography } from "@mui/material";
import React from "react";

const CompanyManagementDetailSection = ({ data }) => {
  return (
    <Grid container spacing={2}>
      <Grid item lg={4} md={4} sm={4} xs={6}>
        <Typography variant="h6" component="h6">
          Name
        </Typography>
      </Grid>
      <Grid item lg={8} md={8} sm={8} xs={6}>
        Snow Jon
      </Grid>
      <Grid item lg={4} md={4} sm={4} xs={6}>
        <Typography variant="h6" component="h6">
          Owner Name
        </Typography>
      </Grid>
      <Grid item lg={8} md={8} sm={8} xs={6}>
        Owner Snow Jon
      </Grid>
      <Grid item lg={4} md={4} sm={4} xs={6}>
        <Typography variant="h6" component="h6">
          Mobile
        </Typography>
      </Grid>
      <Grid item lg={8} md={8} sm={8} xs={6}>
        1234567890
      </Grid>
      <Grid item lg={4} md={4} sm={4} xs={6}>
        <Typography variant="h6" component="h6">
          City
        </Typography>
      </Grid>
      <Grid item lg={8} md={8} sm={8} xs={6}>
        XYZ,XYZ
      </Grid>
      <Grid item lg={4} md={4} sm={4} xs={6}>
        <Typography variant="h6" component="h6">
          GST Number
        </Typography>
      </Grid>
      <Grid item lg={8} md={8} sm={8} xs={6}>
        12XYZ324737XYZ
      </Grid>
      <Grid item lg={4} md={4} sm={4} xs={6}>
        <Typography variant="h6" component="h6">
          Required Installation
        </Typography>
      </Grid>
      <Grid item lg={8} md={8} sm={8} xs={6}>
        12345
      </Grid>
      <Grid item lg={4} md={4} sm={4} xs={6}>
        <Typography variant="h6" component="h6">
          Required O&M
        </Typography>
      </Grid>
      <Grid item lg={8} md={8} sm={8} xs={6}>
        12345
      </Grid>
      <Grid item lg={4} md={4} sm={4} xs={6}>
        <Typography variant="h6" component="h6">
          Status
        </Typography>
      </Grid>
      <Grid item lg={8} md={8} sm={8} xs={6}>
        <Label variant="soft" color={"error"}>
          Active
        </Label>
      </Grid>
      <Grid item lg={4} md={4} sm={4} xs={6}>
        <Typography variant="h6" component="h6">
          Address
        </Typography>
      </Grid>
      <Grid item lg={8} md={8} sm={8} xs={6}>
        XYZ Address.
      </Grid>
    </Grid>
  );
};

export default CompanyManagementDetailSection;
