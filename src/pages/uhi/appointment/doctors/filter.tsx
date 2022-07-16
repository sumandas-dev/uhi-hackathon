import { Button, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";

import { capitalCase } from "change-case";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { DateRangePicker } from "react-date-range";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { Box } from "@mui/system";
import { AppInput } from "../../components/AppInput";
import { AppSelect } from "../../components/AppSelect";
import {
  IDoctorFilter,
  SearchWith,
  listOfConsultationTypes,
  listOfCities,
  listOfSpecialties,
  listOfSystemOfMedicines,
  listOfLanguages,
} from "../interfaces/doctor-filter.interface";
import moment from "moment";
export const Filter = ({
  onApply,
}: {
  onApply: (data: IDoctorFilter) => void;
}) => {
  const filterInitialValue = {
    searchWith: SearchWith.Name,
    typeOfConsultation: listOfConsultationTypes[0],
    cityCode: listOfCities.Bangalore,
    startTime: moment().startOf("day").toISOString(),
    endTime: moment().endOf("day").toISOString(),
  };
  const formik = useFormik<IDoctorFilter>({
    initialValues: filterInitialValue,
    onSubmit: (values) => {
      onApply(values);
    },
  });
  return (
    <Paper elevation={0} sx={{ padding: 5, paddingTop: 10 }}>
      <Stack spacing={2}>
        <AppSelect
          fullWidth
          id="searchWith"
          label="Search With"
          name="searchWith"
          error={formik.touched.searchWith ? formik.errors.searchWith : null}
          value={formik.values.searchWith}
          onChange={(e) => {
            const newValue = e.target.value;
            formik.setFieldValue("searchWith", newValue);
          }}
        >
          {Object.values(SearchWith).map((searchWith) => (
            <MenuItem key={searchWith} value={searchWith}>
              {capitalCase(searchWith)}
            </MenuItem>
          ))}
        </AppSelect>
        {formik.values.searchWith === SearchWith.Name && (
          <>
            <AppInput
              fullWidth
              id="doctorName"
              label="Doctor Name"
              error={
                formik.touched.doctorName ? formik.errors.doctorName : null
              }
              {...formik.getFieldProps("doctorName")}
            />
            <AppSelect
              fullWidth
              id="specialty"
              label="Specialty"
              name="specialty"
              error={formik.touched.specialty ? formik.errors.specialty : null}
              value={formik.values.specialty}
              onChange={(e) => {
                const newValue = e.target.value;
                formik.setFieldValue("specialty", newValue);
              }}
            >
              {listOfSpecialties.map((specialty) => (
                <MenuItem key={specialty} value={specialty}>
                  {capitalCase(specialty)}
                </MenuItem>
              ))}
            </AppSelect>
            <AppSelect
              fullWidth
              id="systemOfMedicine"
              label="System Of Medicine"
              name="systemOfMedicine"
              error={
                formik.touched.systemOfMedicine
                  ? formik.errors.systemOfMedicine
                  : null
              }
              value={formik.values.systemOfMedicine}
              onChange={(e) => {
                const newValue = e.target.value;
                formik.setFieldValue("systemOfMedicine", newValue);
              }}
            >
              {listOfSystemOfMedicines.map((systemOfMedicine) => (
                <MenuItem key={systemOfMedicine} value={systemOfMedicine}>
                  {capitalCase(systemOfMedicine)}
                </MenuItem>
              ))}
            </AppSelect>
            <AppSelect
              fullWidth
              id="city"
              label="City"
              name="city"
              error={formik.touched.cityCode ? formik.errors.cityCode : null}
              value={formik.values.cityCode}
              onChange={(e) => {
                const newValue = e.target.value;
                formik.setFieldValue("cityCode", newValue);
              }}
            >
              {Object.entries(listOfCities).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {capitalCase(key)}
                </MenuItem>
              ))}
            </AppSelect>
            <AppInput
              fullWidth
              id="providerName"
              label="Provider Name"
              error={
                formik.touched.providerName ? formik.errors.providerName : null
              }
              {...formik.getFieldProps("providerName")}
            />
          </>
        )}
        {formik.values.searchWith === SearchWith.Hpid && (
          <>
            <AppInput
              fullWidth
              id="doctorHpid"
              label="Doctor HPID"
              error={
                formik.touched.doctorAbhaId ? formik.errors.doctorAbhaId : null
              }
              {...formik.getFieldProps("doctorHpid")}
            />
          </>
        )}
        <AppSelect
          fullWidth
          id="typeOfConsultation"
          label="Type of Consultation"
          name="Type of Consultation"
          error={
            formik.touched.typeOfConsultation
              ? formik.errors.typeOfConsultation
              : null
          }
          value={formik.values.typeOfConsultation}
          onChange={(e) => {
            const newValue = e.target.value;
            formik.setFieldValue("typeOfConsultation", newValue);
          }}
        >
          {listOfConsultationTypes.map((consultationType) => (
            <MenuItem key={consultationType} value={consultationType}>
              {capitalCase(consultationType)}
            </MenuItem>
          ))}
        </AppSelect>
        <AppSelect
          fullWidth
          id="language"
          label="Language"
          name="language"
          error={formik.touched.language ? formik.errors.language : null}
          value={formik.values.language}
          onChange={(e) => {
            const newValue = e.target.value;
            formik.setFieldValue("language", newValue);
          }}
        >
          {listOfLanguages.map((language) => (
            <MenuItem key={language} value={language}>
              {capitalCase(language)}
            </MenuItem>
          ))}
        </AppSelect>
        <Typography variant="h5">Availability</Typography>
        <DateRangePicker
          onChange={(value) => {
            formik.setFieldValue(
              "startTime",
              moment(value[0]).startOf("day").toISOString()
            );
            formik.setFieldValue(
              "endTime",
              moment(value[1]).endOf("day").toISOString()
            );
          }}
          value={[formik.values.startTime, formik.values.endTime]}
        />
        <Box sx={{ paddingTop: 5 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => formik.submitForm()}
          >
            Apply
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};
