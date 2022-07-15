export class DiscoveryPrice {
  currency: string;
  value: string;

  static fromJson(json: Record<string, any>) {
    const obj = new DiscoveryPrice();
    obj.currency = json["currency"];
    obj.value = json["value"];
    return obj;
  }
  toJson() {
    const data: Record<string, any> = {};
    data["currency"] = this.currency;
    data["value"] = this.value;
    return data;
  }
}
