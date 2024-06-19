import { Box, styled } from "@mui/material";
import React from "react";

export const Image = styled(Box)(({ theme }) => ({
  objectFit: "contain",
  width: "100%",
  backgroundSize: "cover",
}));
export const ImageComponent = ({ alt, src, sx, onClick }) => {
  return (
    <Image onClick={onClick} component="img" sx={sx} src={src} alt={alt} />
  );
};