import { Button } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useState } from "react";
import { TimeSlotModel } from "../../model/time-slot-model";

export const Slots = ({
  slots,
  onSelect,
}: {
  slots: TimeSlotModel[];
  onSelect: (slot: TimeSlotModel) => void;
}) => {
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number>(null);
  return (
    <>
      {slots.map((slot, index) => {
        return (
          <Button
            variant={index === selectedSlotIndex ? "contained" : "outlined"}
            onClick={() => {
              setSelectedSlotIndex(index);
              onSelect(slot);
            }}
            sx={{ border: "1px solid blue" }}
          >
            <p>{moment(slot.start.time.timestamp).format("hh:mm a")}</p>
            <p>{moment(slot.end.time.timestamp).format("hh:mm a")}</p>
          </Button>
        );
      })}
    </>
  );
};
