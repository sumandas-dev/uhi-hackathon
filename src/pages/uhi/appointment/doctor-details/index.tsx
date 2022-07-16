import moment from "moment";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { UHI } from "../../../../collection/services/uhi";
import { euaSocketEndpoint } from "../../../../shared/constants/uhi-constants";
import { Fulfillment } from "../../model/classes/fulfillment";
import { DiscoveryResponseModel } from "../../model/discovery-response-model";
import {
  IDoctorFilter,
  listOfConsultationTypes,
} from "../interfaces/doctor-filter.interface";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { Slots } from "./Slots";
import { Button, Grid } from "@mui/material";
import { DoctorData } from "./DoctorData";
import { IDoctorProfile } from "../interfaces/doctor-profile.interface";
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
  const { state } = useLocation();
  const [date, setDate] = useState<Date>(moment().startOf("day").toDate());
  const [slots, setSlots] = useState<{ start: Date; end: Date }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [discoveryResponses, setDiscoveryResponses] = useState<
    DiscoveryResponseModel[]
  >([]);
  const uhi = UHI.getInstance();
  const passedData = state as DoctorDetailsPagePassedData;

  useEffect(() => {
    postRequest();
  }, [date]);

  useEffect(() => {
    postRequest();
  }, []);

  const postRequest = () => {
    console.log("sending request");
    //clear slots for new request
    let newRequest = true;
    setLoading(true);
    const filter: IDoctorFilter = {
      doctorAbhaId: passedData.doctorAbhaId,
      cityCode: passedData.cityCode,
      startTime: date,
      endTime: moment(date).endOf("day").toDate(),
      typeOfConsultation: listOfConsultationTypes[0],
    };
    const messageId = nanoid(24);
    const ttl = 2;
    uhi.searchDoctor({
      filter: filter,
      messageId: messageId,
      transactionId: passedData.transactionId,
      ttl: ttl.toString(),
      providerUri: passedData.doctorProviderUri,
    });
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
    });
    setTimeout(() => {
      socket.off(messageId);
      setLoading(false);
    }, ttl * 1000);
  };

  const generateSlots = (fulfillments: Fulfillment[]) => {
    const datePart = moment(date).format("YYYY-MM-DD");
    const slots = fulfillments.map((fulfillment) => ({
      start: moment(`${datePart}${fulfillment.start.time.timestamp}`).toDate(),
      end: moment(`${datePart}${fulfillment.end.time.timestamp}`).toDate(),
    }));
    console.log(slots);
    return slots;
  };
  return (
    <>
      <DesktopDatePicker
        label="For desktop"
        value={date}
        minDate={new Date()}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />

      <Grid container>
        <Grid item sm={12} md={6}>
          <DoctorData doctorProfile={passedData.doctorProfile} />
        </Grid>
        <Grid item sm={12} md={6}>
          <Slots slots={slots} />
          <Button variant="contained">Book Appointment</Button>
        </Grid>
      </Grid>
    </>
  );
};
