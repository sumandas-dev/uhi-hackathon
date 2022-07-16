import { Order } from "./order";

export class InitMessage {
  order: Order;

  static fromJson(json: Record<string, any>) {
    const obj = new InitMessage();
    obj.order = json["order"] != null ? Order.fromJson(json["order"]) : null;
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    if (this.order != null) {
      data["order"] = this.order!.toJson();
    }
    return data;
  }
}
