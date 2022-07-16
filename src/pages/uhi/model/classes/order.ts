import { Billing } from "./billing";
import { Customer } from "./customer";
import { DiscoveryItem } from "./discovery-items";
import { Fulfillment } from "./fulfillment";
import { Payment, Quote } from "./payment";

export class Order {
  item: DiscoveryItem;
  fulfillment: Fulfillment;
  billing: Billing;
  customer: Customer;
  quote: Quote;
  payment: Payment;
  id: string;

  static fromJson(json: Record<string, any>) {
    const obj = new Order();
    obj.item =
      json["item"] != null ? DiscoveryItem.fromJson(json["item"]) : null;
    obj.fulfillment =
      json["fulfillment"] != null
        ? Fulfillment.fromJson(json["fulfillment"])
        : null;
    obj.billing =
      json["billing"] != null ? Billing.fromJson(json["billing"]) : null;
    obj.customer =
      json["customer"] != null ? Customer.fromJson(json["customer"]) : null;
    obj.quote = json["quote"] != null ? Quote.fromJson(json["quote"]) : null;
    obj.payment =
      json["payment"] != null ? Payment.fromJson(json["payment"]) : null;
    obj.id = json["id"];
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    if (this.item != null) {
      data["item"] = this.item!.toJson();
    }
    if (this.fulfillment != null) {
      data["fulfillment"] = this.fulfillment!.toJson();
    }
    if (this.billing != null) {
      data["billing"] = this.billing!.toJson();
    }
    if (this.customer != null) {
      data["customer"] = this.customer!.toJson();
    }
    if (this.quote != null) {
      data["quote"] = this.quote!.toJson();
    }
    if (this.payment != null) {
      data["payment"] = this.payment!.toJson();
    }
    data["id"] = this.id;

    return data;
  }
}
