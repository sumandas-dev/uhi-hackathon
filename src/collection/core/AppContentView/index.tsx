import React from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import AppSuspense from "collection/core/AppSuspense";
import AppFooter from "../AppLayout/components/AppFooter";
import AppErrorBoundary from "../AppErrorBoundary";
import Box from "@mui/material/Box";
import AppContentViewWrapper from "./AppContentViewWrapper";
import { SxProps } from "@mui/system";
import { useAuthUser } from "../../utility/AuthHooks";
import {
  anonymousStructure,
  authorizedStructure,
  unAuthorizedStructure,
} from "../../../pages";
import generateRoutes from "../../utility/RouteGenerator";
import { initialUrl } from "../../../shared/constants/AppConst";

interface AppContentViewProps {
  sxStyle?: SxProps;
}

const AppContentView: React.FC<AppContentViewProps> = ({ sxStyle }) => {
  const { user, isAuthenticated } = useAuthUser();
  const routes = useRoutes(
    generateRoutes({
      isAuthenticated: isAuthenticated,
      userRole: user?.role,
      unAuthorizedStructure,
      authorizedStructure,
      anonymousStructure,
    })
  );
  return (
    <AppContentViewWrapper>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          p: { xs: 5, md: 7.5, xl: 12.5 },
          ...sxStyle,
        }}
        className="app-content"
      >
        <AppSuspense>
          <AppErrorBoundary>
            {routes}
            <Routes>
              <Route path="/" element={<Navigate to={initialUrl} />} />
            </Routes>
          </AppErrorBoundary>
        </AppSuspense>
      </Box>
      <AppFooter />
    </AppContentViewWrapper>
  );
};

export default AppContentView;
