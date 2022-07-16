import { DoctorDetails } from "./appointment/doctor-details";
import Doctors from "./appointment/doctors";

export const samplePagesConfigs = [
  {
    path: "/uhi/doctors",
    element: <Doctors />,
  },
  {
    path: "/uhi/doctor-details",
    element: <DoctorDetails />,
  },
];
