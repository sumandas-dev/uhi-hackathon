import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  List,
  Divider,
} from "@mui/material";
import { capitalCase } from "change-case";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { firestore } from "../../../../collection/services/auth/firebase/firebase";
import { PageLoading } from "../../../uhi/appointment/doctors";
import { BookingConfirmResponseModel } from "../../../uhi/model/booking-confirm-response-model";

export const MyAppointments = () => {
  const [appointments, setAppointments] =
    useState<BookingConfirmResponseModel[]>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const getAppointments = async () => {
    const appointments = await (
      await firestore.collection("appointments").get()
    ).docs.map((doc) => doc.data());

    const convertedData = appointments.map((appointment) =>
      BookingConfirmResponseModel.fromJson(appointment)
    );
    setAppointments(convertedData);
    setLoading(false);
    console.log(convertedData);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return loading ? (
    <PageLoading minHeight={200} />
  ) : (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {appointments.map((appointment) => {
        return (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={capitalCase(
                    appointment.message.order.fulfillment.agent.id
                  )}
                  src={
                    appointment.message.order.fulfillment.agent.image ??
                    "/image"
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={appointment.message.order.fulfillment.agent.id}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {appointment.message.order.fulfillment.type}
                    </Typography>
                    {` - ${moment(
                      appointment.message.order.fulfillment.start.time.timestamp
                    ).format("MMMM Do, YYYY")} | ${moment(
                      appointment.message.order.fulfillment.start.time.timestamp
                    ).format("hh:mm a")} - ${moment(
                      appointment.message.order.fulfillment.end.time.timestamp
                    ).format("hh:mm a")}`}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
      })}

      <Divider variant="inset" component="li" />
    </List>
  );
};
