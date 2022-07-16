export interface IDoctorProfile {
  name: string;
  degree: string;
  imageUrl: string;
  abhaId: string;
  gender: string;
  languages: string;
  exp: string;
  specialty: string;
  numberOfTeleconsults?: number;
  onTimePercentage?: number;
  cityCode: string;
  provider: {
    price: string;
    url: string;
    address?: string;
    name: string;
    location?: {
      latitude: number;
      longitude: number;
    };
  };
}
