import React from "react";
import { Box } from "@mui/material";

interface AppLogoProps {
  color?: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ color }) => {
  return (
    <Box
      sx={{
        height: { xs: 56, sm: 70 },
        padding: 2.5,
        display: "flex",
        flexDirection: "row",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="app-logo"
    >
      <img src="/assets/images/name-without-logo.jpg" alt="mediqueue-logo" />
    </Box>
  );
};

export default AppLogo;
