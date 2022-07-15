import { DiscoveryCategories } from "./discovery-categories";
import { DiscoveryDescriptor } from "./discovery-descriptor";
import { DiscoveryItems } from "./discovery-items";
import { DiscoveryLocations } from "./discovery-location";
import { Fulfillment } from "./fulfillment";

export class DiscoveryProviders {
  id: string;
  descriptor: DiscoveryDescriptor;
  locations: DiscoveryLocations[] = [];
  categories: DiscoveryCategories[] = [];
  items: DiscoveryItems[] = [];
  fulfillments: Fulfillment[] = [];

  static fromJson(json: Record<string, any>) {
    const obj = new DiscoveryProviders();
    obj.id = json["id"];
    obj.descriptor =
      json["descriptor"] != null
        ? DiscoveryDescriptor.fromJson(json["descriptor"])
        : null;
    if (json["locations"] != null) {
      json["locations"].forEach((v) => {
        obj.locations.push(DiscoveryLocations.fromJson(v));
      });
    }
    if (json["categories"] != null) {
      json["categories"].forEach((v) => {
        obj.categories.push(DiscoveryCategories.fromJson(v));
      });
    }
    if (json["items"] != null) {
      json["items"].forEach((v) => {
        obj.items.push(DiscoveryItems.fromJson(v));
      });
    }
    if (json["fulfillments"] != null) {
      json["fulfillments"].forEach((v) => {
        obj.fulfillments.push(Fulfillment.fromJson(v));
      });
    }

    return obj;
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};
    data["id"] = this.id;
    if (this.descriptor != null) {
      data["descriptor"] = this.descriptor!.toJson();
    }
    if (this.locations != null) {
      data["locations"] = this.locations!.map((v) => v.toJson());
    }
    if (this.categories != null) {
      data["categories"] = this.categories!.map((v) => v.toJson());
    }
    if (this.items != null) {
      data["items"] = this.items!.map((v) => v.toJson());
    }
    if (this.fulfillments != null) {
      data["fulfillments"] = this.fulfillments!.map((v) => v.toJson());
    }
    return data;
  }
}
