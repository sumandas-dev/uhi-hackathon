export type SystemOfMedicine = "Allopathy" | "Homeopathy";
export type TypeOfConsultation = "PHYSICAL-CONSULT" | "DIGITAL-CONSULT";

export interface IDoctorFilter {
  doctorName?: string;
  speciality?: string;
  systemOfMedicine?: SystemOfMedicine;
  city?: string;
  providerName?: string;
  typeOfConsultation?: TypeOfConsultation;
  languages?: string[];
  availability?: {
    startTime: Date;
    endTime: Date;
  };
}
