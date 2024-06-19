import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import { Card, CardHeader, Box } from "@mui/material";
// components
import { CustomSmallSelect } from "@/components/custom-input";
import Chart, { useChart } from "@/components/chart";

// ----------------------------------------------------------------------

BarGraph.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function BarGraph({
  title,
  subheader,
  chart,
  seriesData,
  setSeriesData,
  ...other
}) {
  const { colors, categories, series, options } = chart;

  const chartOptions = useChart({
    colors,
    xaxis: {
      categories,
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <CustomSmallSelect
            value={seriesData}
            onChange={(event) => setSeriesData(event.target.value)}
          >
            {series.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </CustomSmallSelect>
        }
      />

      {series.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <Chart
              type="bar"
              series={item.data}
              options={chartOptions}
              height={364}
            />
          )}
        </Box>
      ))}
    </Card>
  );
}
