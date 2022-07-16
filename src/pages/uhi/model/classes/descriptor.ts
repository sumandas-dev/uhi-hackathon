export class Descriptor {
  name: string;

  static fromJson(json: Record<string, any>) {
    const obj = new Descriptor();
    if (json["name"] != null) {
      obj.name = json["name"];
    }
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    if (this.name != null) {
      data["name"] = this.name;
    }

    return data;
  }
}
