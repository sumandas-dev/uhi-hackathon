import { DiscoveryPrice } from "./discovery-price";
import { Params } from "./params";

export class Payment {
  uri: string;
  tlMethod: string;
  params: Params;
  type: string;
  status: string;

  static fromJson(json: Record<string, any>) {
    const obj = new Payment();
    obj.uri = json["uri"];
    obj.tlMethod = json["tl_method"];
    obj.params =
      json["params"] != null ? Params.fromJson(json["params"]) : null;
    obj.type = json["type"];
    obj.status = json["status"];
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    data["uri"] = this.uri;
    data["tl_method"] = this.tlMethod;
    if (this.params != null) {
      data["params"] = this.params!.toJson();
    }
    data["type"] = this.type;
    data["status"] = this.status;
    return data;
  }
}

export class Breakup {
  title: string;
  price: DiscoveryPrice;

  static fromJson(json: Record<string, any>) {
    const obj = new Breakup();
    obj.title = json["title"];
    obj.price =
      json["price"] != null ? DiscoveryPrice.fromJson(json["price"]) : null;
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    data["title"] = this.title;
    if (this.price != null) {
      data["price"] = this.price!.toJson();
    }
    return data;
  }
}

export class Quote {
  price: DiscoveryPrice;
  breakup: Breakup[] = [];

  static fromJson(json: Record<string, any>) {
    const obj = new Quote();
    obj.price =
      json["price"] != null ? DiscoveryPrice.fromJson(json["price"]) : null;
    if (json["breakup"] != null) {
      json["breakup"].forEach((v) => {
        obj.breakup.push(Breakup.fromJson(v));
      });
    }
    return obj;
  }
  toJson() {
    const data: Record<string, any> = {};
    if (this.price != null) {
      data["price"] = this.price!.toJson();
    }
    if (this.breakup != null) {
      data["breakup"] = this.breakup!.map((v) => v.toJson());
    }
    return data;
  }
}
