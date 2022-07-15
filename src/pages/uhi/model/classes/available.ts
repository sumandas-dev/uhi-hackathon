export class Available {
  count: string;

  static fromJson(json: Record<string, any>) {
    const obj = new Available();
    obj.count = json["count"];
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    data["count"] = this.count;
    return data;
  }
}
