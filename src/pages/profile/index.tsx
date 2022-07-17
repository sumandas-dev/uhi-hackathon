import React from "react";
import { MyAppointments } from "./UserProfile/my-appointments/MyAppointments";

const UserProfile = React.lazy(() => import("./UserProfile"));

export const profilePage = [
  {
    path: "/my-account",
    element: <UserProfile />,
  },
  {
    path: "/my-account/appointments",
    element: <MyAppointments />,
  },
];
