// next
import NextLink from "next/link";
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from "@mui/material";
// auth
import { useAuthContext } from "@/auth/useAuthContext";
// layouts
// import LoginLayout from "@/layouts/login";
import { PATH_AUTH } from "@/routes/paths";
import LoginLayout from "@/layouts/login/LoginLayout";
import AuthLoginForm from "./AuthLoginForm";
// routes

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginLayout>
      <Box sx={{ width: "100%" }}>
        <Stack sx={{ mb: 5, position: "relative", textAlign: "center" }}>
          <Typography variant="h4">Sign In</Typography>
        </Stack>
        <AuthLoginForm />
      </Box>
    </LoginLayout>
  );
}
