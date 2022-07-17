import { Grid } from "@mui/material";
import React from "react";
import { IDoctorFilter } from "../interfaces/doctor-filter.interface";
import { IDoctorProfile } from "../interfaces/doctor-profile.interface";
import DoctorCard from "./DoctorCard";

export const DoctorGrid = ({
  doctors,
  transactionId,
  filter,
}: {
  doctors: IDoctorProfile[];
  transactionId: string;
  filter: IDoctorFilter;
}) => {
  return (
    <Grid container spacing={3}>
      {doctors.map((doctor) => {
        return (
          <Grid item xs={12} md={6}>
            <DoctorCard
              doctor={doctor}
              transactionId={transactionId}
              filter={filter}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
