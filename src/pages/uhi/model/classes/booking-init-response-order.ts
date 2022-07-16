import { Billing } from "./billing";
import { Customer } from "./customer";
import { DiscoveryItem } from "./discovery-items";
import { Fulfillment } from "./fulfillment";
import { Quote, Payment } from "./payment";

export class BookingInitResponseOrder {
  item: DiscoveryItem;
  fulfillment: Fulfillment;
  billing: Billing;
  customer: Customer;
  quote: Quote;
  payment: Payment;

  static fromJson(json: Record<string, any>) {
    // id = json['id'];
    // state = json['state'];
    // provider = json['provider'] != null
    //     ? new Provider.fromJson(json['provider'])
    //     : null;
    const obj = new BookingInitResponseOrder();
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
  }

  toJson() {
    const data: Record<string, any> = {};
    // data['id'] = this.id;
    // data['state'] = this.state;
    // if (this.provider != null) {
    //   data['provider'] = this.provider!.toJson();
    // }
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
    return data;
  }
}
