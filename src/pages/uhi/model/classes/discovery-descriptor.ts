export class DiscoveryDescriptor {
  name: string;

  static fromJson(json: Record<string, any>) {
    const obj = new DiscoveryDescriptor();
    obj.name = json["name"];
    return obj;
  }
  toJson() {
    const data: Record<string, any> = {};
    data["name"] = this.name;
    return data;
  }
}
