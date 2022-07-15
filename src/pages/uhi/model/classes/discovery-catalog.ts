import { DiscoveryDescriptor } from "./discovery-descriptor";
import { DiscoveryProviders } from "./discovery-providers";
import { Fulfillment } from "./fulfillment";

export class DiscoveryCatalog {
  descriptor: DiscoveryDescriptor;
  providers: DiscoveryProviders[] = [];
  fulfillments: Fulfillment[] = [];

  static fromJson(json: Record<string, any>) {
    const obj = new DiscoveryCatalog();
    obj.descriptor =
      json["descriptor"] != null
        ? DiscoveryDescriptor.fromJson(json["descriptor"])
        : null;
    if (json["providers"] != null) {
      json["providers"].forEach((v) => {
        obj.providers.push(DiscoveryProviders.fromJson(v));
      });
    }

    if (json["fulfillments"] != null) {
      json["fulfillments"].forEach((v) => {
        obj.fulfillments.push(Fulfillment.fromJson(v));
      });
    }
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    if (this.descriptor != null) {
      data["descriptor"] = this.descriptor!.toJson();
    }
    if (this.providers != null) {
      data["providers"] = this.providers!.map((v) => v.toJson());
    }
    if (this.fulfillments != null) {
      data["fulfillments"] = this.fulfillments!.map((v) => v.toJson());
    }
    return data;
  }
}
