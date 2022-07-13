import React from "react";

const Page1 = React.lazy(() => import("./Page1"));
const Page2 = React.lazy(() => import("./Page2"));
export const samplePagesConfigs = [
  {
    path: "/sample/page-1",
    element: <Page1 />,
  },
  {
    path: "/sample/page-2",
    element: <Page2 />,
  },
];
