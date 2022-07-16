import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { BookingConfirmResponseModel } from "../../model/booking-confirm-response-model";
import { DoctorData } from "../doctor-details/DoctorData";
import { IDoctorProfile } from "../interfaces/doctor-profile.interface";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import moment from "moment";

export interface AppointmentConfirmPassedData {
  doctorProfile: IDoctorProfile;
  confirmResponseModel: BookingConfirmResponseModel;
}

export const AppointmentConfirmed = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const passedData = state as AppointmentConfirmPassedData;
  const appointmentDate = moment(
    passedData.confirmResponseModel.message.order.fulfillment.start.time
      .timestamp
  ).format("MMMM Do, YYYY");

  const time = `${moment(
    passedData.confirmResponseModel.message.order.fulfillment.start.time
      .timestamp
  ).format("hh:mm a")} - ${moment(
    passedData.confirmResponseModel.message.order.fulfillment.end.time.timestamp
  ).format("hh:mm a")}`;

  return (
    <Paper elevation={0} sx={{ padding: 8 }}>
      <Grid container spacing={{ xs: 10, sm: 0 }}>
        <Grid item xs={12} md={7}>
          <DoctorData doctorProfile={passedData.doctorProfile} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack spacing={5} alignItems="center">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 300,
              }}
            >
              <ConfirmationNumberIcon
                color="success"
                sx={{ height: 200, width: 200 }}
              />
              <Stack spacing={1}>
                <Typography variant="h4">Appointment Confirm</Typography>
                <Typography variant="h2">{appointmentDate}</Typography>
                <Typography variant="h3">{time}</Typography>
              </Stack>
            </Box>
            <Typography variant="caption">Transaction Id</Typography>
            <Typography variant="h1">
              {
                passedData.confirmResponseModel.message.order.payment.params
                  .transactionId
              }
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 100,
            }}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/uhi/doctors", { replace: true })}
            >
              Book Another
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
