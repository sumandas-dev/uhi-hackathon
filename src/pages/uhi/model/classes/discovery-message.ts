import { DiscoveryCatalog } from "./discovery-catalog";

export class DiscoveryMessage {
  catalog: DiscoveryCatalog;
  static fromJson(json: Record<string, any>) {
    const obj = new DiscoveryMessage();
    obj.catalog =
      json["catalog"] != null
        ? DiscoveryCatalog.fromJson(json["catalog"])
        : null;
    return obj;
  }
  toJson() {
    const data: Record<string, any> = {};
    if (this.catalog != null) {
      data["catalog"] = this.catalog!.toJson();
    }
    return data;
  }
}
