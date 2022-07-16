import { DoctorNameIntent } from "./doctor-name-intent";

export class DoctorNameMessage {
  intent: DoctorNameIntent;

  static fromJson(json: Record<string, any>) {
    const obj = new DoctorNameMessage();
    obj.intent =
      json["intent"] != null ? DoctorNameIntent.fromJson(json["intent"]) : null;
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    if (this.intent != null) {
      data["intent"] = this.intent!.toJson();
    }
    return data;
  }
}
