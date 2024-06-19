// routes
import { PATH_AUTH } from "../routes/paths";
// utils
import axios from "../utils/axios";

// ----------------------------------------------------------------------

function jwtDecode(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/") ;
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  return true;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert("Token expired");

    localStorage.removeItem("accessToken");

    window.location.href = PATH_AUTH.login;
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (accessToken) => {
  if (accessToken) {

    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWZhYzBiNzAxODQwM2VhYjc2ZWExMyIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzA3MTY1NzAzLCJleHAiOjE3MDcyNTIxMDN9.lm_GURU8xbv4rc6OLagch8yP6lNYIyGydjmvx-OAU-s'

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken); // ~3 days by Sor Connect server
    // tokenExpired(exp);
  } else {
    localStorage.removeItem("accessToken");

    delete axios.defaults.headers.common.Authorization;
  }
};
