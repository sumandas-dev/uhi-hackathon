import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import IntlMessages from "collection/utility/IntlMessages";
import { BiUser } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import AccountTabsWrapper from "./AccountTabsWrapper";
import PersonalInfo from "./PersonalInfo";
import ChangePassword from "./ChangePassword";
import AppAnimate from "collection/core/AppAnimate";
import { Fonts } from "../../../shared/constants/AppEnums";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabs = [
  { id: 1, icon: <BiUser />, name: <IntlMessages id="common.personalInfo" /> },
  {
    id: 2,
    icon: <AiOutlineLock />,
    name: <IntlMessages id="common.changePassword" />,
  },
];

const Account = () => {
  const [value, setValue] = React.useState<number>(0);

  const onTabsChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(+newValue);
  };

  return (
    <>
      <Box
        component="h2"
        sx={{
          fontSize: 16,
          color: "text.primary",
          fontWeight: Fonts.SEMI_BOLD,
          mb: {
            xs: 2,
            lg: 4,
          },
        }}
      >
        My Account
      </Box>
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <AccountTabsWrapper>
          <Tabs
            className="account-tabs"
            value={value}
            onChange={onTabsChange}
            aria-label="basic tabs example"
            orientation="vertical"
          >
            {tabs.map((tab, index) => (
              <Tab
                className="account-tab"
                label={tab.name}
                icon={tab.icon}
                key={index}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
          <Box className="account-tabs-content">
            {value === 0 && <PersonalInfo />}
            {value === 1 && <ChangePassword />}
          </Box>
        </AccountTabsWrapper>
      </AppAnimate>
    </>
  );
};

export default Account;
