import PropTypes from "prop-types";
import { useEffect } from "react";
// next
import { useRouter } from "next/router";
// @mui
import { Box, Stack, Drawer, Divider, Typography } from "@mui/material";
// hooks
import useResponsive from "@/hooks/useResponsive";
// config
import { NAV } from "@/config-global";
// components
import Scrollbar from "@/components/scrollbar";
import { NavSectionVertical } from "@/components/nav-section";
//
import navConfig from "./config-navigation";
import NavToggleButton from "./NavToggleButton";

// ----------------------------------------------------------------------

NavVertical.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function NavVertical({ openNav, onCloseNav }) {
  const { pathname } = useRouter();

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
        }}
      >
        <Box>
          <Stack
            direction="column"
            textAlign="center"
            alignItems="center"
            spacing={0.2}
          >
            <Box
              component="img"
              src="/assets/header/favicon.jpeg"
              width={120}
              sx={{
                objectFit: "contain",
              }}
            />
            {/* <Typography component="h6" variant="h6">
              Sor Connect
            </Typography> */}
          </Stack>
        </Box>
        {/* <NavAccount /> */}
      </Stack>
      <Divider sx={{ borderStyle: "dashed" }} />
      <Box sx={{ mb: 2 }} />
      <NavSectionVertical data={navConfig} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD },
      }}
    >
      {/* <NavToggleButton /> */}

      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              zIndex: 0,
              width: NAV.W_DASHBOARD,
              bgcolor: (theme) => theme.palette.grey[100],
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
