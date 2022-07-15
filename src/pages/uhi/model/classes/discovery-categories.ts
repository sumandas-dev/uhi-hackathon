import { DiscoveryDescriptor } from "./discovery-descriptor";

export class DiscoveryCategories {
  id: string;
  descriptor: DiscoveryDescriptor;

  static fromJson(json: Record<string, any>) {
    const obj = new DiscoveryCategories();
    obj.id = json["id"];
    obj.descriptor =
      json["descriptor"] != null
        ? DiscoveryDescriptor.fromJson(json["descriptor"])
        : null;

    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    data["id"] = this.id;
    if (this.descriptor != null) {
      data["descriptor"] = this.descriptor!.toJson();
    }
    return data;
  }
}
