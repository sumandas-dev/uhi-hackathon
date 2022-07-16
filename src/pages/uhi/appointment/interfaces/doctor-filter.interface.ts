export type SystemOfMedicine = "Allopathy" | "Homeopathy";

export enum SearchWith {
  Name = "name",
  Hpid = "hpid",
}

export const listOfSpecialties = [
  "Physician",
  "Dermatologist",
  "Orthopedist",
  "Psychiatrist",
  "Oncologist",
  "Gynecologist",
];

export const listOfSystemOfMedicines = ["Allopathy", "Homeopathy"];

export const listOfCities = {
  Pune: "020",
  Mumbai: "022",
  Delhi: "011",
  Kolkata: "033",
  Bangalore: "080",
};

export const listOfConsultationTypes = [
  // "Teleconsultation",
  "Physicalconsultation",
];

export const listOfLanguages = [
  "English",
  "Hindi",
  "Assamese",
  "Bengali",
  "Gujarati",
  "Kannada",
  "Kashmiri",
  "Konkani",
  "Malayalam",
  "Manipuri",
  "Marathi",
  "Nepali",
  "Oriya",
  "Punjabi",
  "Sanskrit",
  "Sindhi",
  "Tamil",
  "Telugu",
  "Urdu",
  "Urdu",
  "Santhali",
  "Maithili",
  "Dogri",
];
export interface IDoctorFilter {
  searchWith?: SearchWith;
  doctorName?: string;
  doctorAbhaId?: string;
  specialty?: string;
  systemOfMedicine?: SystemOfMedicine;
  cityCode?: string;
  providerName?: string;
  typeOfConsultation: string;
  language?: string;
  startTime: Date;
  endTime: Date;
}
