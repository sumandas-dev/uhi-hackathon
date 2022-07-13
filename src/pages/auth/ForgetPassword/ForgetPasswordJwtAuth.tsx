import React from "react";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import AppInfoView from "collection/core/AppInfoView";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IntlMessages from "collection/utility/IntlMessages";
import AppTextField from "collection/core/AppFormComponents/AppTextField";
import { Fonts } from "../../../shared/constants/AppEnums";
import AuthWrapper from "../AuthWrapper";
import AppLogo from "collection/core/AppLayout/components/AppLogo";
import { useIntl } from "react-intl";

const ForgetPasswordJwtAuth = () => {
  const { messages } = useIntl();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(String(messages["validation.emailFormat"]))
      .required(String(messages["validation.emailRequired"])),
  });

  return (
    <AuthWrapper>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ mb: { xs: 8, xl: 10 } }}>
          <Box
            sx={{
              mb: 5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <AppLogo />
          </Box>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 1.5,
              color: (theme) => theme.palette.text.primary,
              fontWeight: Fonts.SEMI_BOLD,
              fontSize: { xs: 14, xl: 16 },
            }}
          >
            <IntlMessages id="common.forgetPassword" />
          </Typography>

          <Typography
            sx={{
              pt: 3,
              fontSize: 15,
              color: "grey.500",
            }}
          >
            <span style={{ marginRight: 4 }}>
              <IntlMessages id="common.alreadyHavePassword" />
            </span>
            <Box
              component="span"
              sx={{
                fontWeight: Fonts.MEDIUM,
                "& a": {
                  color: (theme) => theme.palette.primary.main,
                  textDecoration: "none",
                },
              }}
            >
              <Link to="/signin">
                <IntlMessages id="common.signIn" />
              </Link>
            </Box>
          </Typography>
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Formik
              validateOnChange={true}
              initialValues={{
                email: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                //reset password api goes here
                setSubmitting(false);
                resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <Form style={{ textAlign: "left" }}>
                  <Box sx={{ mb: { xs: 5, lg: 8 } }}>
                    <AppTextField
                      placeholder="Email"
                      name="email"
                      label={messages["common.emailAddress"] as string}
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          fontSize: 14,
                        },
                      }}
                      variant="outlined"
                    />
                  </Box>

                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      sx={{
                        fontWeight: Fonts.REGULAR,
                        textTransform: "capitalize",
                        fontSize: 16,
                        minWidth: 160,
                      }}
                      type="submit"
                    >
                      <IntlMessages id="common.sendNewPassword" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Box>

          <AppInfoView />
        </Box>
      </Box>
    </AuthWrapper>
  );
};

export default ForgetPasswordJwtAuth;
