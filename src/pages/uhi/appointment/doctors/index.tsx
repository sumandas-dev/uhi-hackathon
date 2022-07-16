import { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { Filter } from "./filter";
import { IDoctorFilter } from "../interfaces/doctor-filter.interface";
import { UHI } from "../../../../collection/services/uhi";
import { io } from "socket.io-client";
import { nanoid } from "nanoid";
import { DiscoveryResponseModel } from "../../model/discovery-response-model";
import { DoctorGrid } from "./DoctorGrid";
import { IDoctorProfile } from "../interfaces/doctor-profile.interface";
import { euaSocketEndpoint } from "../../../../shared/constants/uhi-constants";
import SearchIcon from "@mui/icons-material/Search";

const Doctors = () => {
  const uhi = UHI.getInstance();
  const socket = io(euaSocketEndpoint, {
    withCredentials: true,
  });
  const [filterValues, setFilterValues] = useState<IDoctorFilter>(null);
  const [firstVisit, setFirstVisit] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [discoveryResponses, setDiscoveryResponses] = useState<
    DiscoveryResponseModel[]
  >([]);
  const [doctors, setDoctors] = useState<IDoctorProfile[]>([]);
  const [transactionId, setTransactionId] = useState<string>(null);

  const onApply = (filter: IDoctorFilter) => {
    setFilterValues(filter);
    setIsLoading(true);
    setFirstVisit(false);
    const _messageId = nanoid(24);
    const _transactionId = transactionId ?? nanoid(24);
    setTransactionId(_transactionId);
    const ttl = "3";

    uhi.searchDoctor({
      filter: filter,
      messageId: _messageId,
      transactionId: _transactionId,
      ttl: ttl,
    });

    console.log(_messageId);

    socket.on(_messageId, (data) => {
      console.log(data);
      setDiscoveryResponses([
        ...discoveryResponses,
        DiscoveryResponseModel.fromJson(data),
      ]);
      setDoctors([
        ...doctors,
        ...getDoctors(DiscoveryResponseModel.fromJson(data), filter),
      ]);
    });
    setTimeout(() => {
      console.log("ttl hit");
      setIsLoading(false);
      socket.off(_messageId);
    }, parseInt(ttl) * 1000);
  };

  const getDoctors = (
    discoveryResponse: DiscoveryResponseModel,
    filter: IDoctorFilter
  ): IDoctorProfile[] => {
    const fulfillMents = discoveryResponse.message.catalog.fulfillments;
    const doctors = fulfillMents.map((fulfillment) => {
      const doctor: IDoctorProfile = {
        abhaId: fulfillment.agent.id,
        name: fulfillment.agent.name,
        gender: fulfillment.agent.gender,
        imageUrl: fulfillment.agent.image,
        exp: fulfillment.agent.tags.experience,
        degree: fulfillment.agent.tags.education,
        languages: fulfillment.agent.tags.languageSpokenTag,
        specialty: fulfillment.agent.tags.specialtyTag,
        cityCode: filter.cityCode,
        provider: {
          price: fulfillment.agent.tags.firstConsultation,
          url: discoveryResponse.context.providerUrl,
          name: discoveryResponse.message.catalog.descriptor.name,
        },
      };
      return doctor;
    });
    return doctors;
  };

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
          <Paper elevation={0} sx={{ minHeight: 670, padding: 2 }}>
            {firstVisit ? (
              <EmptyMessage message="Search Doctors" />
            ) : isLoading ? (
              <PageLoading />
            ) : doctors.length === 0 ? (
              <EmptyMessage message="No Doctor Found" />
            ) : (
              <DoctorGrid doctors={doctors} transactionId={transactionId} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

const PageLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 650,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

const EmptyMessage = ({ message }: { message: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 650,
      }}
    >
      <SearchIcon sx={{ height: 200, width: 200 }} />
      <Typography variant="h4">{message}</Typography>
    </Box>
  );
};

export default Doctors;
