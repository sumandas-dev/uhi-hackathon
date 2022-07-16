import { Button, Grid } from "@mui/material";
import moment from "moment";
import { useState } from "react";
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
      <Grid container spacing={3}>
        {slots.map((slot, index) => {
          return (
            <Grid item xs={4}>
              <Button
                variant={index === selectedSlotIndex ? "contained" : "outlined"}
                onClick={() => {
                  setSelectedSlotIndex(index);
                  onSelect(slot);
                }}
                sx={{ border: "1px solid blue" }}
              >
                <p>{`${moment(slot.start.time.timestamp).format(
                  "hh:mm a"
                )} - ${moment(slot.end.time.timestamp).format("hh:mm a")}`}</p>
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
