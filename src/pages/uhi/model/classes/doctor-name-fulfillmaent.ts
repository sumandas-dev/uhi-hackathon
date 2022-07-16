import { DoctorNameAgent } from "./doctor-name-agent";
import { Time } from "./fulfillment";

export class DoctorNameFulfillment {
  agent: DoctorNameAgent;
  startTime: Time;
  endTime: Time;
  type: string;

  static fromJson(json: Record<string, any>) {
    const obj = new DoctorNameFulfillment();
    obj.agent =
      json["agent"] != null ? DoctorNameAgent.fromJson(json["agent"]) : null;

    obj.startTime = json["start"] != null ? Time.fromJson(json["start"]) : null;
    obj.endTime = json["end"] != null ? Time.fromJson(json["end"]) : null;
    obj.type = json["type"];
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    if (this.agent != null) {
      data["agent"] = this.agent;
    }
    if (this.startTime != null) {
      data["start"] = this.startTime;
    }
    if (this.endTime != null) {
      data["end"] = this.endTime;
    }
    data["type"] = this.type;

    return data;
  }
}
