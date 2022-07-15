export class DiscoveryAddress {
  full: string;

  static fromJson(json: Record<string, any>) {
    const obj = new DiscoveryAddress();
    obj.full = json["full"];
    return obj;
  }
  toJson() {
    const data: Record<string, any> = {};
    data["full"] = this.full;
    return data;
  }
}
