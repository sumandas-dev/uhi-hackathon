import { Tags } from "./tags";

export class DiscoveryAgent {
  id: string;
  name: string;
  gender: string;
  image: string;
  tags: Tags;

  static fromJson(json: Record<string, any>) {
    const obj = new DiscoveryAgent();
    obj.id = json["id"];
    obj.name = json["name"];
    obj.gender = json["gender"];

    if (json["image"] != null) {
      obj.image = json["image"];
    }
    obj.tags = json["tags"] != null ? Tags.fromJson(json["tags"]) : null;
    return obj;
  }
  toJson() {
    const data: Record<string, any> = {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["gender"] = this.gender;
    data["image"] = this.image;
    if (this.image != null) {
      data["image"] = this.image;
    }
    if (this.tags != null) {
      data["tags"] = this.tags!.toJson();
    }
    return data;
  }
}
