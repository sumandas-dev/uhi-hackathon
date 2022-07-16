import { Box } from "@mui/system";
import moment from "moment";
import React from "react";

export const Slots = ({ slots }: { slots: { start: Date; end: Date }[] }) => {
  return (
    <>
      {slots.map((slot) => {
        return (
          <Box sx={{ border: "1px solid blue" }}>
            <p>{moment(slot.start).format("hh:mm a")}</p>
            <p>{moment(slot.end).format("hh:mm a")}</p>
          </Box>
        );
      })}
    </>
  );
};
