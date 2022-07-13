export interface IDoctorProfile {
  name: string;
  degree: string;
  hprAddress: string;
  languages: string;
  exp: string;
  numberOfTeleconsults: number;
  onTimePercentage: number;
  provider: {
    price: number;
    url: string;
    address?: string;
    location?: {
      latitude: number;
      longitude: number;
    };
  };
}
