import moment from "moment";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { UHI } from "../../../../collection/services/uhi";
import { euaSocketEndpoint } from "../../../../shared/constants/uhi-constants";
import { Fulfillment, Time } from "../../model/classes/fulfillment";
import { DiscoveryResponseModel } from "../../model/discovery-response-model";
import {
  IDoctorFilter,
  listOfConsultationTypes,
} from "../interfaces/doctor-filter.interface";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { Slots } from "./Slots";
import { Button, Grid, Paper, Stack } from "@mui/material";
import { DoctorData } from "./DoctorData";
import { IDoctorProfile } from "../interfaces/doctor-profile.interface";
import { AppointmentDetailsPagePassedData } from "../appointment-details";
import { TimeSlotModel } from "../../model/time-slot-model";
import { PageLoading } from "../doctors";
export interface DoctorDetailsPagePassedData {
  doctorAbhaId: string;
  doctorName: string;
  doctorProviderUri: string;
  consultationType: string;
  cityCode: string;
  transactionId: string;
  doctorProfile: IDoctorProfile;
}

export const DoctorDetails = () => {
  const socket = io(euaSocketEndpoint, { withCredentials: true });
  const navigate = useNavigate();
  const { state } = useLocation();
  const [date, setDate] = useState<Date>(moment().startOf("day").toDate());
  const [slots, setSlots] = useState<TimeSlotModel[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotModel>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [discoveryResponses, setDiscoveryResponses] = useState<
    DiscoveryResponseModel[]
  >([]);
  const uhi = UHI.getInstance();
  const passedData = state as DoctorDetailsPagePassedData;
  const consultationType = listOfConsultationTypes[0];

  useEffect(() => {
    postRequest();
  }, [date]);

  useEffect(() => {
    // postRequest();
    return () => {
      socket.disconnect();
    };
  }, []);

  const postRequest = () => {
    //clear slots for new request
    let newRequest = true;
    setLoading(true);
    const filter: IDoctorFilter = {
      doctorAbhaId: passedData.doctorAbhaId,
      doctorName: passedData.doctorAbhaId,
      cityCode: passedData.cityCode,
      startTime: date.toISOString(),
      endTime: moment(date).endOf("day").toDate().toISOString(),
      typeOfConsultation: consultationType,
    };
    const messageId = nanoid(24);
    const ttl = 30;

    socket.on(messageId, (data) => {
      console.log(data);
      const discoveryResponseModel = DiscoveryResponseModel.fromJson(data);
      setDiscoveryResponses([...discoveryResponses, discoveryResponseModel]);
      if (newRequest) {
        setSlots([
          ...generateSlots(discoveryResponseModel.message.catalog.fulfillments),
        ]);
      } else {
        setSlots([
          ...slots,
          ...generateSlots(discoveryResponseModel.message.catalog.fulfillments),
        ]);
      }
      newRequest = false;
      setLoading(false);
    });
    uhi.searchDoctor({
      filter: filter,
      messageId: messageId,
      transactionId: passedData.transactionId,
      ttl: ttl.toString(),
      providerUri: passedData.doctorProviderUri,
    });
    setTimeout(() => {
      socket.off(messageId);
    }, ttl * 1000);
  };

  const generateSlots = (fulfillments: Fulfillment[]) => {
    const datePart = moment(date).format("YYYY-MM-DD");
    const slots = fulfillments.map((fulfillment) => {
      const timeSlot = new TimeSlotModel();
      timeSlot.start = new Time();
      timeSlot.end = new Time();
      const startTimestamp = fulfillment.start.time.timestamp;
      const endTimestamp = fulfillment.end.time.timestamp;
      timeSlot.start.time = {
        //sometime timestamp format = 'THH:mm' then add the datePart otherwise don't add
        timestamp: moment(
          `${moment(startTimestamp).isValid() ? "" : datePart}${startTimestamp}`
        )
          .toDate()
          .toISOString(),
      };
      timeSlot.end.time = {
        timestamp: moment(
          `${moment(endTimestamp).isValid() ? "" : datePart}${
            fulfillment.end.time.timestamp
          }`
        )
          .toDate()
          .toISOString(),
      };
      return timeSlot;
    });
    return slots;
  };
  return (
    <>
      <Paper elevation={0} sx={{ padding: 8 }}>
        <Grid container spacing={{ xs: 10, sm: 0 }}>
          <Grid item sm={12} md={7}>
            <DoctorData doctorProfile={passedData.doctorProfile} />
          </Grid>
          <Grid item sm={12} md={5}>
            <Stack spacing={5}>
              {loading ? (
                <PageLoading minHeight={250} />
              ) : (
                <Slots
                  slots={slots}
                  onSelect={(slot) => {
                    setSelectedSlot(slot);
                  }}
                />
              )}

              <DesktopDatePicker
                label="Appointment Date"
                value={date}
                minDate={new Date()}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <Button
                variant="contained"
                disabled={selectedSlot == null}
                onClick={() => {
                  navigate("/uhi/appointment-details", {
                    replace: true,
                    state: {
                      consultationType: consultationType,
                      doctorProfile: passedData.doctorProfile,
                      providerUrl: passedData.doctorProviderUri,
                      transactionId: passedData.transactionId,
                      timeSlot: selectedSlot,
                    } as AppointmentDetailsPagePassedData,
                  });
                }}
              >
                Book Appointment
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
