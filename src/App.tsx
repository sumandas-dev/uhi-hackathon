import React from "react";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import AuthRoutes from "collection/utility/AuthRoutes";
import AppContextProvider from "collection/utility/AppContextProvider";
import AppThemeProvider from "collection/utility/AppThemeProvider";
import AppStyleProvider from "collection/utility/AppStyleProvider";
import AppLocaleProvider from "collection/utility/AppLocaleProvider";
import AppLayout from "collection/core/AppLayout";
import configureStore from "redux/store";
import FirebaseAuthProvider from "./collection/services/auth/firebase/FirebaseAuthProvider";
import { BrowserRouter } from "react-router-dom";

const store = configureStore();

const App = () => (
  <AppContextProvider>
    <Provider store={store}>
      <AppThemeProvider>
        <AppStyleProvider>
          <AppLocaleProvider>
            <BrowserRouter>
              <FirebaseAuthProvider>
                <AuthRoutes>
                  <CssBaseline />
                  <AppLayout />
                </AuthRoutes>
              </FirebaseAuthProvider>
            </BrowserRouter>
          </AppLocaleProvider>
        </AppStyleProvider>
      </AppThemeProvider>
    </Provider>
  </AppContextProvider>
);

export default App;
