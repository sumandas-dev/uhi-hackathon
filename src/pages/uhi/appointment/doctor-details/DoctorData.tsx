import {
  Avatar,
  Button,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { IDoctorProfile } from "../interfaces/doctor-profile.interface";

export const DoctorData = ({
  doctorProfile,
}: {
  doctorProfile: IDoctorProfile;
}) => {
  const small = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3} sm={5}>
          <Avatar
            sx={{
              height: "100%",
              width: "100%",
            }}
            variant="square"
            src={doctorProfile.imageUrl ?? "/assets/images/placeholder.jpg"}
          />
        </Grid>
        <Grid item xs={9} sm={7}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: small ? null : 300,
            }}
          >
            <Stack spacing={1}>
              <Typography variant="h1">{doctorProfile.name}</Typography>
              <Typography variant="h3">{doctorProfile.specialty}</Typography>
              <Typography variant="h5">{doctorProfile.degree}</Typography>
              <Typography variant="h5">{`${doctorProfile.exp} year of exp`}</Typography>
              <Typography
                variant="h5"
                sx={{ pb: 6 }}
              >{`Languages: ${doctorProfile.languages}`}</Typography>

              <Button variant="outlined">{`Fees: ${doctorProfile.provider.price}`}</Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
