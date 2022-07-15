import { DiscoveryDescriptor } from "./discovery-descriptor";
import { DiscoveryPrice } from "./discovery-price";
import { Quantity } from "./quantity";

export class DiscoveryItems {
  id: String;
  descriptor: DiscoveryDescriptor;
  categoryId: String;
  fulfillmentId: String;
  price: DiscoveryPrice;
  quantity: Quantity;

  static fromJson(json: Record<string, any>) {
    const obj = new DiscoveryItems();
    obj.id = json["id"];
    obj.descriptor =
      json["descriptor"] != null
        ? DiscoveryDescriptor.fromJson(json["descriptor"])
        : null;
    obj.categoryId = json["category_id"];
    obj.fulfillmentId = json["fulfillment_id"];
    obj.price =
      json["price"] != null ? DiscoveryPrice.fromJson(json["price"]) : null;

    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    data["id"] = this.id;
    if (this.descriptor != null) {
      data["descriptor"] = this.descriptor!.toJson();
    }
    if (this.categoryId != null) {
      data["category_id"] = this.categoryId;
    }
    data["fulfillment_id"] = this.fulfillmentId;
    if (this.price != null) {
      data["price"] = this.price!.toJson();
    }
    return data;
  }
}
