import { Available } from "./available";

export class Quantity {
  available: Available;
  static formJson(json: Record<string, any>) {
    const obj = new Quantity();
    obj.available = json["available"];
    return obj;
  }
  toJson() {
    const data: Record<string, any> = {};
    data["available"] = this.available;
    return data;
  }
}
