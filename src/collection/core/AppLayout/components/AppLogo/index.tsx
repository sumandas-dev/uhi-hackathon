import React from "react";
import { useThemeContext } from "../../../../utility/AppContextProvider/ThemeContextProvider";
import { alpha, Box } from "@mui/material";
import { ReactComponent as Logo } from "../../../../../assets/icon/logo.svg";
import { ReactComponent as LogoText } from "../../../../../assets/icon/logo_text.svg";
import { Padding } from "@mui/icons-material";

interface AppLogoProps {
  color?: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ color }) => {
  const { theme } = useThemeContext();

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
      <Box sx={{ paddingX: 5 }}>
        <img src="/assets/images/name-without-logo.jpg" alt="mediqueue-logo" />
      </Box>
    </Box>
  );
};

export default AppLogo;
