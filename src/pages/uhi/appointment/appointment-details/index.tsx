import { Grid, Paper, Stack } from "@mui/material";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { UHI } from "../../../../collection/services/uhi";
import { useAuthUser } from "../../../../collection/utility/AuthHooks";
import {
  consumerId,
  euaEndpoint,
  euaSocketEndpoint,
} from "../../../../shared/constants/uhi-constants";
import { BookingConfirmResponseModel } from "../../model/booking-confirm-response-model";
import { BookingInitRequestModel } from "../../model/booking-init-request-model";
import { BookingInitResponseModel } from "../../model/booking-init-response-mode";
import { Address } from "../../model/classes/address";
import { Billing } from "../../model/classes/billing";
import { Context } from "../../model/classes/context";
import { Customer } from "../../model/classes/customer";
import { Descriptor } from "../../model/classes/descriptor";
import { DiscoveryAgent } from "../../model/classes/discovery-agent";
import { DiscoveryItem } from "../../model/classes/discovery-items";
import { DiscoveryPrice } from "../../model/classes/discovery-price";
import { Fulfillment, Time } from "../../model/classes/fulfillment";
import { InitMessage } from "../../model/classes/init-message";
import { Order } from "../../model/classes/order";
import { Params } from "../../model/classes/params";
import { TimeSlotModel } from "../../model/time-slot-model";
import { DoctorData } from "../doctor-details/DoctorData";
import { PageLoading } from "../doctors";
import { IDoctorProfile } from "../interfaces/doctor-profile.interface";
import { Quotation } from "./Quotation";
import { LoadingButton } from "@mui/lab";
import { AppointmentConfirmPassedData } from "../appointment-confirmed";

export interface AppointmentDetailsPagePassedData {
  doctorProfile: IDoctorProfile;
  timeSlot: TimeSlotModel;
  providerUrl: string;
  consultationType: string;
  transactionId: string;
}

export const AppointmentDetails = () => {
  const { state } = useLocation();
  const socket = io(euaSocketEndpoint, { withCredentials: true });
  const passedData = state as AppointmentDetailsPagePassedData;
  const { user } = useAuthUser();
  const uhi = UHI.getInstance();
  const navigate = useNavigate();

  const [bookingInitResponseModel, setBookingInitResponseModel] =
    useState<BookingInitResponseModel>(null);
  const [bookingConfirmResponseModel, setBookingConfirmResponseModel] =
    useState<BookingConfirmResponseModel>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirming, setConfirming] = useState<boolean>(false);
  const [finalQuote, setFinalQuote] = useState<string>(null);
  const [breakups, setBreakups] = useState<{ title: string; value: string }[]>(
    []
  );

  const postInitRequest = async () => {
    setLoading(true);
    const bookingInitRequestModel = new BookingInitRequestModel();
    const contextModel = new Context();
    const price = new DiscoveryPrice();
    const discoveryItem = new DiscoveryItem();
    const descriptor = new Descriptor();
    const billing = new Billing();
    const customer = new Customer();
    const order = new Order();
    const address = new Address();
    const message = new InitMessage();
    const ttl = 30;
    contextModel.domain = "nic2004:85111";
    contextModel.city = `std:${passedData.doctorProfile.cityCode}`;
    contextModel.country = "IND";
    contextModel.action = "init";
    contextModel.coreVersion = "0.7.1";
    contextModel.messageId = nanoid();
    contextModel.consumerId = consumerId;
    contextModel.consumerUri = euaEndpoint;
    contextModel.timestamp = new Date().toString();
    contextModel.transactionId = passedData.transactionId;
    contextModel.providerUrl = passedData.providerUrl;
    contextModel.ttl = ttl.toString();

    bookingInitRequestModel.context = contextModel;

    const fulfillment = new Fulfillment();
    const agent = new DiscoveryAgent();
    agent.id = passedData.doctorProfile.fulfillment.agent.id;
    // fulfillment.agent = passedData.doctorProfile.fulfillment.agent;
    fulfillment.agent = agent;
    fulfillment.id = passedData.doctorProfile.fulfillment.id;
    fulfillment.type = passedData.consultationType;

    price.currency = "INR";
    price.value = passedData.doctorProfile.provider.price;

    descriptor.name = "Consultation";

    discoveryItem.price = price;

    const startTime = new Time();
    startTime.time = passedData.timeSlot.start.time;
    fulfillment.start = startTime;
    const endTime = new Time();
    endTime.time = passedData.timeSlot.end.time;
    fulfillment.end = endTime;

    order.id = nanoid();
    order.fulfillment = fulfillment;
    order.item = discoveryItem;

    billing.name = user.displayName;
    billing.email = user.email;
    address.door = "21A";
    address.name = "ABC Apartments";
    address.locality = "Dwarka";
    address.city = "New Delhi";
    address.state = "New Delhi";
    address.country = "India";
    address.areaCode = "110011";

    billing.address = address;
    order.billing = billing;
    order.customer = customer;
    message.order = order;
    bookingInitRequestModel.message = message;

    // console.log(JSON.stringify(bookingInitRequestModel.toJson()));

    uhi.init(bookingInitRequestModel);

    socket.on(contextModel.messageId, (data) => {
      console.log(data);
      const _bookingInitRequestModel = BookingInitResponseModel.fromJson(data);
      setBookingInitResponseModel(_bookingInitRequestModel);
      calculateQuote(_bookingInitRequestModel);
      setLoading(false);
    });

    setTimeout(() => {
      console.log("ttl hit");
      socket.off(contextModel.messageId);
    }, ttl * 1000);
  };

  useEffect(() => {
    postInitRequest();
    return () => {
      socket.disconnect();
    };
  }, []);

  const calculateQuote = (
    _bookingInitResponseModel: BookingInitResponseModel
  ) => {
    if (!_bookingInitResponseModel) return;
    const quote = _bookingInitResponseModel.message.order.quote.price.value;
    if (!quote) {
      fallbackQuoteCalculate(_bookingInitResponseModel);
      return;
    }
    setFinalQuote(quote);
    const _breakups = _bookingInitResponseModel.message.order.quote.breakup;
    setBreakups(
      _breakups.map((breakup) => ({
        title: breakup.title,
        value: breakup.price.value ?? "0",
      }))
    );
  };
  const fallbackQuoteCalculate = (
    _bookingInitResponseModel: BookingInitResponseModel
  ) => {
    const quote =
      _bookingInitResponseModel.message.order.fulfillment.agent.tags
        .firstConsultation;
    setFinalQuote(quote);
    setBreakups([
      {
        title: "Consultation Fee",
        value: quote,
      },
    ]);
  };
  const postConfirmRequest = async () => {
    console.log("confirm request sent");
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
      const _bookingConfirmResponseModel =
        BookingConfirmResponseModel.fromJson(data);
      setBookingConfirmResponseModel(_bookingConfirmResponseModel);
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
    <>
      <Paper elevation={0} sx={{ padding: 8 }}>
        <Grid container spacing={{ xs: 10, sm: 0 }}>
          <Grid item xs={12} md={7}>
            <DoctorData doctorProfile={passedData.doctorProfile} />
          </Grid>
          <Grid item xs={12} md={5}>
            <Stack spacing={5}>
              {loading ? (
                <PageLoading minHeight={250} />
              ) : (
                <Quotation quote={finalQuote} breakups={breakups} />
              )}
              <LoadingButton
                loading={confirming}
                disabled={loading}
                variant="contained"
                onClick={postConfirmRequest}
              >
                Confirm
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
