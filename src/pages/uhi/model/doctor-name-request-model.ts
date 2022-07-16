import { DiscoveryContext } from "./classes/discover-context";
import { DoctorNameMessage } from "./classes/doctor-name-message";

export class DoctorNameRequestModel {
  context: DiscoveryContext;
  message: DoctorNameMessage;

  static fromJson(json: Record<string, any>) {
    const obj = new DoctorNameRequestModel();
    obj.context =
      json["context"] != null
        ? DiscoveryContext.fromJson(json["context"])
        : null;
    obj.message =
      json["message"] != null
        ? DoctorNameMessage.fromJson(json["message"])
        : null;
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    if (this.context != null) {
      data["context"] = this.context!.toJson();
    }
    if (this.message != null) {
      data["message"] = this.message!.toJson();
    }
    return data;
  }
}
