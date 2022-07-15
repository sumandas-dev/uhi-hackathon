import { DiscoveryAddress } from "./discovery-address";

export class DiscoveryLocations {
  id: string;
  gps: string;
  address: DiscoveryAddress;

  static fromJson(json: Record<string, any>) {
    const obj = new DiscoveryLocations();
    obj.id = json["id"];
    obj.gps = json["gps"];
    obj.address =
      json["address"] != null
        ? DiscoveryAddress.fromJson(json["address"])
        : null;
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    data["id"] = this.id;
    data["gps"] = this.gps;
    if (this.address != null) {
      data["address"] = this.address!.toJson();
    }
    return data;
  }
}
