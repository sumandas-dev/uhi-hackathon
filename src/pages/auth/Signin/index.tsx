import React from "react";
import Box from "@mui/material/Box";
import AuthWrapper from "../AuthWrapper";
import AppLogo from "collection/core/AppLayout/components/AppLogo";
import SigninFirebase from "./SigninFirebase";

const Signin = () => {
  return (
    <AuthWrapper>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ mb: { xs: 6, xl: 8 } }}>
          <Box
            sx={{
              mb: 5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ paddingX: { xs: 20, sm: 10 } }}>
              <AppLogo />
            </Box>
          </Box>
        </Box>

        <SigninFirebase />
      </Box>
    </AuthWrapper>
  );
};

export default Signin;
