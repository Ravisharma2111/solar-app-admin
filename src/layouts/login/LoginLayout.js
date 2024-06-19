import PropTypes from "prop-types";
// @mui
import { Typography, Stack } from "@mui/material";
// components
import Logo from "@/components/logo";
// import Image from "@/components/image";
//
import {
  StyledRoot,
  StyledSectionBg,
  StyledSection,
  StyledContent,
} from "./styles";
import { ImageComponent } from "@/components/image";

// ----------------------------------------------------------------------

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default function LoginLayout({ children, illustration, title }) {
  return (
    <StyledRoot>
      <StyledContent>
        <Stack sx={{ width: "100%" }}> {children} </Stack>
      </StyledContent>

      <StyledSection>
        <Stack
          spacing={6}
          width="100%"
          textAlign="center"
          alignContent="center"
          sx={{
            placeItems: "center",
          }}
        >
          <Typography component="h2" variant="h2" color="common.white">
            Sor Connect
          </Typography>
          <ImageComponent
            disabledEffect
            visibleByDefault
            alt="auth"
            src={illustration || "/assets/login/auth-screens.png"}
            sx={{ maxWidth: "50%" }}
          />
        </Stack>
        <StyledSectionBg />
      </StyledSection>
    </StyledRoot>
  );
}
