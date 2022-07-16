export class Address {
  door: string;
  name: string;
  locality: string;
  city: string;
  state: string;
  country: string;
  areaCode: string;

  static fromJson(json: Record<string, any>) {
    const obj = new Address();
    obj.door = json["door"];
    obj.name = json["name"];
    obj.locality = json["locality"];
    obj.city = json["city"];
    obj.state = json["state"];
    obj.country = json["country"];
    obj.areaCode = json["area_code"];
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    data["door"] = this.door;
    data["name"] = this.name;
    data["locality"] = this.locality;
    data["city"] = this.city;
    data["state"] = this.state;
    data["country"] = this.country;
    data["area_code"] = this.areaCode;
    return data;
  }
}
