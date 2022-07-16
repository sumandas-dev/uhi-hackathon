import { Grid } from "@mui/material";
import React from "react";
import { IDoctorProfile } from "../interfaces/doctor-profile.interface";
import DoctorCard from "./DoctorCard";

export const DoctorGrid = ({
  doctors,
  transactionId,
}: {
  doctors: IDoctorProfile[];
  transactionId: string;
}) => {
  return (
    <Grid container spacing={3}>
      {doctors.map((doctor) => {
        return (
          <Grid item xs={12} md={6}>
            <DoctorCard doctor={doctor} transactionId={transactionId} />
          </Grid>
        );
      })}
    </Grid>
  );
};
