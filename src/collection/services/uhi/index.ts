import axios, { AxiosRequestConfig } from "axios";
import { IDoctorFilter } from "../../../pages/uhi/appointment/interfaces/doctor-filter.interface";
import { BookingInitRequestModel } from "../../../pages/uhi/model/booking-init-request-model";
import { BookingInitResponseModel } from "../../../pages/uhi/model/booking-init-response-mode";
import {
  euaEndpoint,
  uhiProxyEndpoint,
} from "../../../shared/constants/uhi-constants";

interface SessionData {
  accessToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refreshToken: string;
  tokenType: string;
}
export class UHI {
  private baseUrl = uhiProxyEndpoint;
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

  async searchDoctor({
    filter,
    messageId,
    transactionId,
    ttl,
    providerUri,
  }: {
    filter: IDoctorFilter;
    messageId: string;
    transactionId: string;
    ttl: string;
    providerUri?: string;
  }) {
    // const session = await this.getSession();
    const data = JSON.stringify({
      context: {
        domain: "nic2004:85111",
        country: "IND",
        city: `std:${filter.cityCode}`,
        action: "search",
        core_version: "0.7.1",
        consumer_id: "suman/EUA",
        consumer_uri: euaEndpoint,
        provider_uri: providerUri,
        message_id: messageId,
        transaction_id: transactionId,
        ttl: ttl,
        timestamp: new Date(),
      },
      message: {
        intent: {
          fulfillment: {
            agent: {
              name: filter.doctorName,
              id: filter.doctorAbhaId,
              tags: {
                "@abdm/gov/in/med_speciality": filter.specialty,
                "@abdm/gov/in/system_of_med": filter.systemOfMedicine,
                "@abdm/gov/in/spoken_langs": filter.language,
              },
            },
            type: filter.typeOfConsultation,
            start: {
              time: {
                timestamp: filter.startTime,
              },
            },
            end: {
              time: {
                timestamp: filter.endTime,
              },
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

  async init(data: BookingInitRequestModel) {
    const config: AxiosRequestConfig = {
      method: "POST",
      baseURL: this.baseUrl,
      url: "init",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer token`,
      },
      data: JSON.stringify(data.toJson()),
    };

    const response = await axios(config);
    return response;
  }
  async confirm(data: BookingInitResponseModel) {
    const config: AxiosRequestConfig = {
      method: "POST",
      baseURL: this.baseUrl,
      url: "confirm",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer token`,
      },
      data: JSON.stringify(data.toJson()),
    };

    const response = await axios(config);
    return response;
  }
}
