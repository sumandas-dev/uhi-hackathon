export class Customer {
  id: string;
  cred: string;
  static fromJson(json: Record<string, any>) {
    const obj = new Customer();
    obj.id = json["id"];
    obj.cred = json["cred"];
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    data["id"] = this.id;
    data["cred"] = this.cred;
    return data;
  }
}
