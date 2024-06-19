import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppWidget from "./widget";
import BarGraph from "./barGraph";

const DashboardSection = () => {
  const theme = useTheme();
  const [seriesData, setSeriesData] = useState("Daily");
  const [categories, setCategories] = useState("");

  const Daily = ["19 Sept", "20 Sept", "21 Sept", "22 Sept"];
  const Weekly = ["Monday", "Tuesday", "Wednesday", "Friday"];
  const Monthly = ["January", "Febuary", "March", "April"];
  const Yearly = ["2020", "2021", "2022", "2023"];

  useEffect(()=>{
    if(seriesData === "Yearly"){
      setCategories(Yearly)
    }else if(seriesData==="Weekly"){
      setCategories(Weekly)
    }else if(seriesData==="Monthly"){
      setCategories(Monthly)
    }else {
      setCategories(Daily)
    }
  },[seriesData])

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={6} sm={6} xs={12}>
          <AppWidget
            title="Total Customers"
            total={38566}
            icon="ph:users-three"
            chart={{
              series: 48,
            }}
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <AppWidget
            title="New Solar Enquiries"
            total={55566}
            icon="material-symbols:solar-power"
            color="info"
            chart={{
              series: 75,
            }}
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <AppWidget
            title="Operation and Maintenance Enquiries"
            total={55566}
            icon="wpf:maintenance"
            color="warning"
            chart={{
              series: 75,
            }}
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <AppWidget
            title="Total Solar Companies"
            total={55566}
            icon="mdi:company"
            color="secondary"
            chart={{
              series: 75,
            }}
          />
        </Grid>
      </Grid>
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item md={12} sm={12} xs={12}>
            <BarGraph
              title={
                <Stack direction="column" spacing={0.1} alignItems="center">
                  <Typography component="p" color="inherit" variant="h6">
                    Sor Connect
                  </Typography>
                  <Typography component="p" color="grey" variant="body2">
                    (A step towards free electricity)
                  </Typography>
                </Stack>
              }
              subheader="Sales Report"
              setSeriesData={setSeriesData}
              seriesData={seriesData}
              chart={{
                categories: categories,
                series: [
                  {
                    year: "Daily",
                    data: [
                      {
                        name: "New Solar",
                        data: [10, 41, 35, 51],
                      },
                      {
                        name: "Operation and Maintenance",
                        data: [10, 30, 45, 60],
                      },
                    ],
                  },
                  {
                    year: "Weekly",
                    data: [
                      {
                        name: "New Solar",
                        data: [148, 91, 69, 62],
                      },
                      {
                        name: "Operation and Maintenance",
                        data: [148, 91, 69, 62],
                      },
                    ],
                  },
                  {
                    year: "Monthly",
                    data: [
                      {
                        name: "New Solar",
                        data: [148, 91, 69, 62],
                      },
                      {
                        name: "Operation and Maintenance",
                        data: [148, 91, 69, 62],
                      },
                    ],
                  },
                  {
                    year: "Yearly",
                    data: [
                      {
                        name: "New Solar",
                        data: [148, 91, 69, 62],
                      },
                      {
                        name: "Operation and Maintenance",
                        data: [148, 91, 69, 62],
                      },
                    ],
                  },
                ],
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default DashboardSection;
