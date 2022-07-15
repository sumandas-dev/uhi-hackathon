import React, { ReactNode } from "react";
import { BiAlignLeft } from "react-icons/bi";
import { RoutePermittedRole } from "../shared/constants/AppConst";

export interface RouterConfigData {
  id: string;
  title: string;
  messageId: string;
  icon?: string | ReactNode;
  type: "item" | "group" | "collapse" | "divider";
  children?: RouterConfigData[];
  permittedRole?: RoutePermittedRole;
  color?: string;
  url?: string;
  exact?: boolean;
  count?: number;
}

const routesConfig: RouterConfigData[] = [
  {
    id: "app",
    title: "UHI",
    messageId: "sidebar.uhi",
    type: "group",
    children: [
      {
        id: "doctors",
        title: "Doctors",
        messageId: "sidebar.uhi.doctors",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/uhi/doctors",
      },
    ],
  },
];
export default routesConfig;
