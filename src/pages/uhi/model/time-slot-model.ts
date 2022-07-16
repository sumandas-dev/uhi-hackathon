import { object } from "prop-types";
import { Time } from "./classes/fulfillment";

export class TimeSlotModel {
  start: Time;
  end: Time;

  static fromJson(json: Record<string, any>) {
    const obj = new TimeSlotModel();
    obj.start = json["start"] != null ? Time.fromJson(json["start"]) : null;
    obj.end = json["end"] != null ? Time.fromJson(json["end"]) : null;
    return object;
  }
  toJson() {
    const data: Record<string, any> = {};
    if (this.start != null) {
      data["start"] = this.start!.toJson();
    }
    if (this.end != null) {
      data["end"] = this.end!.toJson();
    }
    return data;
  }
}
