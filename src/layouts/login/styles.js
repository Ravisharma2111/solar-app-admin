// @mui
import { styled, alpha } from "@mui/material/styles";
// utils
import { bgGradient } from "../../utils/cssStyles";

// ----------------------------------------------------------------------

export const StyledRoot = styled("main")(() => ({
  height: "100%",
  display: "flex",
  position: "relative",
}));

export const StyledSection = styled("div")(({ theme }) => ({
  display: "none",
  position: "relative",
  [theme.breakpoints.up("md")]: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flexGrow: 1,
  },
}));

export const StyledSectionBg = styled("div")(({ theme }) => ({
  ...bgGradient({
    color: alpha(
      theme.palette.background.default,
      theme.palette.mode === "light" ? 0.9 : 0.94
    ),
    imgUrl: "/assets/login/auth-bg.png",
  }),
  top: 0,
  left: 0,
  zIndex: -1,
  width: "100%",
  height: "100%",
  position: "absolute",
  transform: "scaleX(-1)",
}));

export const StyledContent = styled("div")(({ theme }) => ({
  width: "100%",
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  height: "100%",
  justifyContent: "center",
  padding: theme.spacing(2),
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),
  },
}));
