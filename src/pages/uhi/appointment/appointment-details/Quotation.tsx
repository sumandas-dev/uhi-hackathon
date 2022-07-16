import { Divider, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export const Quotation = ({
  quote,
  breakups,
}: {
  quote: string;
  breakups: { title: string; value: string }[];
}) => {
  return (
    <Stack spacing={3}>
      {breakups.map((breakup) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">{breakup.title}</Typography>
            <Typography variant="h4">{breakup.value}</Typography>
          </Box>
        );
      })}
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "space-between", pb: 10 }}>
        <Typography variant="h4">Total Amount To Pay</Typography>
        <Typography variant="h4">{quote}</Typography>
      </Box>
    </Stack>
  );
};
