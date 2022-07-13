import React from "react";

const UserProfile = React.lazy(() => import("./UserProfile"));

export const profilePage = [
  {
    path: "/my-account",
    element: <UserProfile />,
  },
];
