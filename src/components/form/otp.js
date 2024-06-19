import { Box, FormControl, FormHelperText } from "@mui/material";
import * as React from "react";
import OTPInput from "react-otp-input";

const OTPBox = ({ formik, numInputs }) => {
  return (
    <React.Fragment>
      <Box sx={{ width: "100%", textAlign: "center", mb: 2 }}>
        <FormControl error={formik.errors.otp ? true : false}>
          <OTPInput
            name={`otp`}
            containerStyle={{ justifyContent: "center" }}
            inputStyle={{
              width: "50px",
              height: "50px",
              borderRadius: "10px",
            }}
            value={formik?.values?.otp}
            onChange={(e) => formik.setFieldValue("otp", e)}
            error={formik.touched.otp && formik.errors.otp}
            helperText={formik.touched.otp && formik.errors.otp}
            numInputs={numInputs}
            renderSeparator={<span style={{ marginRight: "5px" }}></span>}
            renderInput={(props) => <input {...props} />}
          />
          {formik.errors.otp && (
            <FormHelperText>{formik.errors.otp}</FormHelperText>
          )}
        </FormControl>
      </Box>
    </React.Fragment>
  );
};
export default OTPBox;
