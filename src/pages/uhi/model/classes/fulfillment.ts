import { DiscoveryAgent } from "./discovery-agent";
import { Tags } from "./tags";

export class Fulfillment {
  id: String;
  type: String;
  agent: DiscoveryAgent;
  start: Time;
  end: Time;
  initTimeSlotTags: InitTimeSlotTags;
  tags: Tags;

  static fromJson(json: Record<string, any>) {
    const obj = new Fulfillment();
    obj.id = json["id"];
    obj.type = json["type"];
    obj.agent =
      json["agent"] != null ? DiscoveryAgent.fromJson(json["agent"]) : null;
    obj.start = json["start"] != null ? Time.fromJson(json["start"]) : null;
    obj.end = json["end"] != null ? Time.fromJson(json["end"]) : null;
    obj.initTimeSlotTags =
      json["tags"] != null ? InitTimeSlotTags.fromJson(json["tags"]) : null;
    obj.tags = json["tags"] != null ? Tags.fromJson(json["tags"]) : null;
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    data["id"] = this.id;
    data["type"] = this.type;
    if (this.agent != null) {
      data["agent"] = this.agent.toJson();
    }
    if (this.start != null) {
      data["start"] = this.start.toJson();
    }
    if (this.end != null) {
      data["end"] = this.end.toJson();
    }
    if (this.initTimeSlotTags != null) {
      data["tags"] = this.initTimeSlotTags.toJson();
    }
    if (this.tags != null) {
      data["tags"] = this.tags!.toJson();
    }
    return data;
  }
}

export class Time {
  time: {
    timestamp: string;
  };
  static fromJson(json: Record<string, any>) {
    const obj = new Time();
    obj.time = json["time"];
    return obj;
  }
  toJson() {
    const data: Record<string, any> = {};
    data["time"] = this.time;
    return data;
  }
}

export class InitTimeSlotTags {
  abdmGovInSlotId: string;

  static fromJson(json: Record<string, any>) {
    const obj = new InitTimeSlotTags();
    obj.abdmGovInSlotId = json["@abdm/gov.in/slot_id"];
    return obj;
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};
    data["@abdm/gov.in/slot_id"] = this.abdmGovInSlotId;
    return data;
  }
}
