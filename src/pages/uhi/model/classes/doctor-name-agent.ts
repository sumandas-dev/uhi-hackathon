import { Tags } from "./tags";

export class DoctorNameAgent {
  name: string;
  id: string;
  tags: Tags;

  static fromJson(json: Record<string, any>) {
    const obj = new DoctorNameAgent();
    if (json["name"] != null) {
      obj.name = json["name"];
    }
    if (json["id"] != null) {
      obj.id = json["id"];
    }
    if (json["tags"] != null) {
      obj.tags = json["tags"];
    }

    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    if (this.name != null) {
      data["name"] = this.name;
    }
    if (this.id != null) {
      data["id"] = this.id;
    }
    if (this.tags != null) {
      data["tags"] = this.tags;
    }

    return data;
  }
}
