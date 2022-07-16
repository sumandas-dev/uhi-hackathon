export class Params {
  amount: string;
  mode: string;
  vpa: string;
  transactionId: string;

  static fromJson(json: Record<string, any>) {
    const obj = new Params();
    obj.amount = json["amount"];
    obj.mode = json["mode"];
    obj.vpa = json["vpa"];
    obj.transactionId = json["transaction_id"];
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    data["amount"] = this.amount;
    data["mode"] = this.mode;
    data["vpa"] = this.vpa;
    data["transaction_id"] = this.transactionId;
    return data;
  }
}
