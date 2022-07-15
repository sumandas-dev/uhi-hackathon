import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Stack } from "@mui/material";
import { Filter } from "./filter";
import { SocketTest } from "./socket";
import { IDoctorFilter } from "./interfaces/doctor-filter.interface";
import { UHI } from "../../../collection/services/uhi";
import { io } from "socket.io-client";
import { nanoid } from "nanoid";
import { DiscoveryResponseModel } from "../model/discovery-response-model";

const Appointment = () => {
  const uhi = UHI.getInstance();
  const [filterValues, setFilterValues] = useState<IDoctorFilter>(null);
  const [discoveryResponses, setDiscoveryResponses] = useState<
    DiscoveryResponseModel[]
  >([]);
  const [messageId, setMessageId] = useState<string>(null);
  const [transactionId, setTransactionId] = useState<string>(null);
  const onApply = (data: IDoctorFilter) => {
    setFilterValues(data);
    const _messageId = messageId ?? nanoid(24);
    setMessageId(_messageId);
    const _transactionId = transactionId ?? nanoid(24);
    setTransactionId(_transactionId);
    const ttl = "5";

    uhi.searchDoctor(data, _messageId, _transactionId, ttl);

    socket.on(_messageId, (data) => {
      console.log(data);
      discoveryResponses.push(data);
    });
    setTimeout(() => {
      console.log("ttl hit");
      socket.off(_messageId);
    }, parseInt(ttl) * 1000);
  };
  const socket = io("localhost:3001", {
    withCredentials: true,
  });
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Filter onApply={onApply} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              height: 300,
              backgroundColor: "primary.light",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          ></Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Appointment;
