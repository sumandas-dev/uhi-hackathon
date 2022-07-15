import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import AppCard from "../../../../collection/core/AppCard";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { IDoctorProfile } from "../interfaces/doctor-profile.interface";
import { Chip } from "@mui/material";

const UserInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  marginBottom: 20,
  [theme.breakpoints.up("xl")]: {
    marginBottom: 30,
  },
}));
const UserWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  "& .MuiAvatar-root": {
    border: `solid 5px ${theme.palette.background.paper}`,
    marginBottom: 10,
    width: 84,
    height: 84,
    marginTop: -42,
  },
}));

const UserStatus = styled("div")(({ theme }) => ({
  position: "absolute",
  right: 2,
  bottom: 12,
  zIndex: 1,
  width: 30,
  height: 30,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: "50%",
  border: `solid 3px ${theme.palette.primary.contrastText}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .MuiSvgIcon-root": {
    fontSize: 14,
  },
}));
const UserAvatar = styled(Avatar)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.contrastText}`,
  marginRight: -4,
  width: 28,
  height: 28,
}));
const AvatarCount = styled("div")(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.contrastText}`,
  width: 28,
  height: 28,
  backgroundColor: theme.palette.success.main,
  color: theme.palette.common.white,
  borderRadius: "50%",
  marginRight: -4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  fontSize: 12,
  fontWeight: Fonts.BOLD,
}));

interface DoctorCardProps {
  doctor: IDoctorProfile;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <AppCard
      sxStyle={{ mb: 8 }}
      contentStyle={{
        p: 0,
        "&:last-of-type": {
          pb: 0,
        },
      }}
    >
      <CardMedia
        sx={{
          height: 140,
          width: "100%",
        }}
        image="/assets/images/wall/v-card.jpg"
      />
      <Box px={5} pb={4}>
        <UserInfo>
          <UserWrapper>
            <Avatar src={doctor.imageUrl} alt="Doctor" />
            {doctor.abhaId && (
              <UserStatus>
                <CheckCircleIcon />
              </UserStatus>
            )}
          </UserWrapper>
          <Typography component="h3">{doctor.name}</Typography>
          <Box component="p" color="text.secondary" mt={1}>
            {doctor.specialty}
          </Box>
          <Box component="p" color="text.secondary" mt={1}>
            {doctor.degree}
          </Box>
        </UserInfo>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            marginTop: -5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Typography component="h3">
              <Chip label={`${doctor.exp} year of exp`} variant="outlined" />
            </Typography>
          </Box>
          <Typography component="h3" sx={{ mb: 2 }}>
            {doctor.languages}
          </Typography>
          <Box mb={3.5} component="h4">
            {doctor.abhaId}
          </Box>
          {/* <Box display="flex" alignItems="center" mb={{ xs: 5, xl: 7.5 }}>
            {users.slice(0, 4).map((user) => (
              <UserAvatar key={user.hprAddress} src={user.imageUrl} />
            ))}
            {users.length > 4 ? (
              <AvatarCount>+{users.length - 4}</AvatarCount>
            ) : null}
          </Box> */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
          >
            <Box mx={2} mb={2}>
              <Button
                // startIcon={<VideocamOutlinedIcon />}
                color="primary"
                variant="outlined"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {`₹${doctor.provider.price}`}&nbsp;&nbsp;&nbsp;
                {`${doctor.provider.name}`}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default DoctorCard;
