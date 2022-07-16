import React from "react";
import { IDoctorFilter } from "../interfaces/doctor-filter.interface";
import { IDoctorProfile } from "../interfaces/doctor-profile.interface";

export const DoctorData = ({
  doctorProfile,
}: {
  doctorProfile: IDoctorProfile;
}) => {
  return (
    <>
      <div>DoctorData</div>
      <h1>{doctorProfile.name}</h1>
      <p>{doctorProfile.abhaId}</p>
    </>
  );
};
