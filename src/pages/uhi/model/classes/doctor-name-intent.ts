import { DiscoveryProviders } from "./discovery-providers";
import { DoctorNameFulfillment } from "./doctor-name-fulfillmaent";

export class DoctorNameIntent {
  fulfillment: DoctorNameFulfillment;
  provider: DiscoveryProviders;

  static fromJson(json: Record<string, any>) {
    const obj = new DoctorNameIntent();
    obj.fulfillment =
      json["fulfillment"] != null
        ? DoctorNameFulfillment.fromJson(json["fulfillment"])
        : null;

    obj.provider =
      json["provider"] != null
        ? DiscoveryProviders.fromJson(json["provider"])
        : null;
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    if (this.fulfillment != null) {
      data["fulfillment"] = this.fulfillment;
    }
    if (this.provider != null) {
      data["provider"] = this.provider;
    }
    return data;
  }
}
