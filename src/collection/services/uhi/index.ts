import axios, { AxiosRequestConfig } from "axios";
import { IDoctorFilter } from "../../../pages/uhi/appointment/interfaces/doctor-filter.interface";

interface SessionData {
  accessToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refreshToken: string;
  tokenType: string;
}
export class UHI {
  private baseUrl = "http://0.tcp.in.ngrok.io:12168/api/v1";
  private uhiClientId = "";
  private uhiSecret = "";
  private sessionData: SessionData;
  private tokenFetchedAt: number = null;
  private static instance: UHI;
  private constructor() {}

  static getInstance() {
    if (!UHI.instance) {
      UHI.instance = new UHI();
    }
    return UHI.instance;
  }

  async getSession() {
    if (this.sessionData) {
      const currentTime = Date.now();
      if (currentTime < this.tokenFetchedAt + this.sessionData.expiresIn) {
        return this.sessionData;
      }
    }
    const data = JSON.stringify({
      clientId: this.uhiClientId,
      clientSecret: this.uhiSecret,
    });

    const config: AxiosRequestConfig = {
      method: "post",
      baseURL: this.baseUrl,
      url: "sessions",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const sessionData: SessionData = (await axios(config)).data;
    this.sessionData = sessionData;
    this.tokenFetchedAt = Date.now();
    return sessionData;
  }

  async searchDoctor(
    filter: IDoctorFilter,
    messageId: string,
    transactionId: string,
    ttl: string
  ) {
    // const session = await this.getSession();
    const data = JSON.stringify({
      context: {
        domain: "uhi:consultation",
        country: "IND",
        city: filter.city,
        action: "search",
        core_version: "0.7.1",
        consumer_uri: "http://localhost:3001",
        message_id: messageId,
        transaction_id: transactionId,
        ttl: ttl,
      },
      message: {
        intent: {
          fulfillment: {
            agent: {
              name: filter.doctorName,
              tags: {
                "@abdm/gov/in/med_speciality": filter.specialty,
                "@abdm/gov/in/system_of_med": filter.systemOfMedicine,
                "@abdm/gov/in/spoken_langs": filter.language,
              },
            },
            type: filter.typeOfConsultation,
            start: {
              time: filter.startTime,
            },
            end: {
              time: filter.endTime,
            },
          },
          provider: {
            descriptor: {
              name: filter.providerName,
            },
          },
        },
      },
    });

    const config: AxiosRequestConfig = {
      method: "POST",
      baseURL: this.baseUrl,
      url: "search",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer token`,
      },
      data: data,
    };

    const response = await axios(config);
    return response;
  }
}
