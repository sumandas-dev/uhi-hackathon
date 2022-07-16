import { Address } from "./address";

export class Billing {
  name: string;
  address: Address;
  email: string;
  phone: string;

  static fromJson(json: Record<string, any>) {
    const obj = new Billing();
    obj.name = json["name"];
    obj.address =
      json["address"] != null ? Address.fromJson(json["address"]) : null;
    obj.email = json["email"];
    obj.phone = json["phone"];
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    data["name"] = this.name;
    if (this.address != null) {
      data["address"] = this.address!.toJson();
    }
    data["email"] = this.email;
    data["phone"] = this.phone;
    return data;
  }
}
