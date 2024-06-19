import { AuthProvider } from "@/auth/JwtContext";
import ProgressBar from "@/components/progress-bar/ProgressBar";
import { MotionLazyContainer } from "@/components/animate";
import { SettingsProvider, ThemeSettings } from "@/components/settings";
import SnackbarProvider from "@/components/snackbar";
import ThemeProvider from "@/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Head from "next/head";
import React from "react";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <React.Fragment>
      <Head>
        <title>Sor Connect</title>
        <link rel="icon" href="/assets/header/favicon.jpeg" type="image/x-icon" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SettingsProvider>
          <MotionLazyContainer>
            <AuthProvider>
              <ThemeProvider>
                <ThemeSettings>
                  <SnackbarProvider>
                    <ProgressBar />
                    {getLayout(<Component {...pageProps} />)}
                  </SnackbarProvider>
                </ThemeSettings>
              </ThemeProvider>
            </AuthProvider>
          </MotionLazyContainer>
        </SettingsProvider>
      </LocalizationProvider>
    </React.Fragment>
  );
}
