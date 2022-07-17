import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { UHI } from "../../../../collection/services/uhi";
import { useAuthUser } from "../../../../collection/utility/AuthHooks";
import { euaSocketEndpoint } from "../../../../shared/constants/uhi-constants";
import { AppInput } from "../../components/AppInput";
import { BookingConfirmResponseModel } from "../../model/booking-confirm-response-model";
import { BookingInitResponseModel } from "../../model/booking-init-response-mode";
import { AppointmentConfirmPassedData } from "../appointment-confirmed";
import { IDoctorProfile } from "../interfaces/doctor-profile.interface";
import { LoadingButton } from "@mui/lab";
import { Params } from "../../model/classes/params";
import { firestore } from "../../../../collection/services/auth/firebase/firebase";

export interface PaymentPassedData {
  bookingInitResponseModel: Record<string, any>;
  doctorProfile: IDoctorProfile;
  finalQuote: string;
}

export const Payment = () => {
  const { user } = useAuthUser();
  const { state } = useLocation();
  const uhi = UHI.getInstance();
  const navigate = useNavigate();
  const socket = io(euaSocketEndpoint, { withCredentials: true });

  const [confirming, setConfirming] = useState<boolean>(false);
  const [upi, setUpi] = useState<string>(null);

  const passedData = state as PaymentPassedData;

  const postConfirmRequest = async () => {
    console.log("confirm request sent");
    const bookingInitResponseModel = BookingInitResponseModel.fromJson(
      passedData.bookingInitResponseModel
    );
    setConfirming(true);
    const _messageId = nanoid();
    const ttl = 30;
    bookingInitResponseModel.context.action = "confirm";
    bookingInitResponseModel.message.order.payment.params = new Params();
    bookingInitResponseModel.message.order.payment.params.transactionId =
      nanoid();
    bookingInitResponseModel.message.order.payment.type = "ON-ORDER";
    bookingInitResponseModel.message.order.payment.status = "PAID";
    bookingInitResponseModel.message.order.payment.tlMethod = "http/get";
    bookingInitResponseModel.context.messageId = _messageId;
    uhi.confirm(bookingInitResponseModel);
    socket.on(_messageId, (data) => {
      console.log(data);
      //save the appointment in firestore
      firestore
        .collection("appointments")
        .doc(user.uid)
        .collection("appointments")
        .doc()
        .set(data);
      const _bookingConfirmResponseModel =
        BookingConfirmResponseModel.fromJson(data);
      // console.log(_bookingConfirmResponseModel);
      setConfirming(false);
      navigate("/uhi/appointment-confirmed", {
        replace: true,
        state: {
          doctorProfile: passedData.doctorProfile,
          confirmResponseModel: _bookingConfirmResponseModel,
        } as AppointmentConfirmPassedData,
      });
    });

    setTimeout(() => {
      console.log("confirm ttl hit");
      socket.off(_messageId);
    }, ttl * 1000);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Paper elevation={0} sx={{ width: 500, padding: 8 }}>
        <Stack spacing={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: 300,
              }}
            >
              <Avatar src="/assets/images/logo.png" />
              <Stack>
                <Typography variant="h2">Mediqueue</Typography>
                <Typography variant="h4">UPI Intent</Typography>
                <Typography variant="h4">{`Rs. ${passedData.finalQuote}/-`}</Typography>
              </Stack>
            </Box>
          </Box>

          <Paper elevation={0} sx={{ border: "1px solid #A2B5BB", padding: 4 }}>
            <Box sx={{ display: "flex" }}>
              <Avatar />
              <Stack sx={{ paddingLeft: 4 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {user.displayName}
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Stack>
            </Box>
          </Paper>

          <Typography variant="h5">{`Payment Method > UPI`}</Typography>

          <AppInput
            fullWidth
            label="Enter UPI address"
            onChange={(e) => setUpi(e.currentTarget.value)}
          />

          <LoadingButton
            loading={confirming}
            variant="contained"
            disabled={upi === null}
            onClick={postConfirmRequest}
          >{`Pay ${passedData.finalQuote}`}</LoadingButton>
        </Stack>
      </Paper>
    </Box>
  );
};
