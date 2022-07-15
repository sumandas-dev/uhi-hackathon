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

export const listOfCities = ["Pune", "Mumbai", "Delhi", "Kolkata", "Bangalore"];

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
  searchWith: SearchWith;
  doctorName?: string;
  doctorHpid?: string;
  specialty?: string;
  systemOfMedicine?: SystemOfMedicine;
  city?: string;
  providerName?: string;
  typeOfConsultation: string;
  language?: string;
  startTime: Date;
  endTime: Date;
}
