import { Box, Grid, alpha } from "@mui/material";
import React from "react";
import { ImageComponent } from ".";

const TwiceImage = ({
  img1 = "/assets/images/team/1.jpg",
  img2 = "/assets/images/team/1.jpg",
  bgColor = "primary",
  borderWidth = "25px",
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: { md: "400px", sm: "300px", xs: "300px" },
      }}
    >
      <Grid
        container
        sx={{
          height: "100%",
          position: "relative",

          "&:before": {
            position: "absolute",
            content: '""',
            width: "60%",
            height: "80%",
            top: "10%",
            left: "20%",
            background: (theme) => theme?.palette[bgColor]?.main,
            border: (theme) => `${borderWidth} solid`,
            borderColor: (theme) =>
              `${theme?.palette.primary?.lighter} !important`,
            zIndex: -1,
            borderRadius: "5px",
          },
        }}
        spacing={4}
      >
        <Grid item md={6} lg={6}>
          <ImageComponent
            sx={{
              borderRadius: "4px",
              width: { md: "100%", sm: "120px", xs: "120px" },
              height: "auto",
              backgroundSize: "cover",
              objectFit: "cover",
            }}
            src={img1}
          />
        </Grid>
        <Grid item md={6} lg={6} sx={{ alignSelf: "end" }}>
          <ImageComponent
            sx={{
              borderRadius: "4px",
              width: { md: "100%", sm: "120px", xs: "120px" },
              height: "auto",
              backgroundSize: "cover",
              objectFit: "cover",
            }}
            src={img2}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TwiceImage;
