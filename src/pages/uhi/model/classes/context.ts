export class Context {
  domain: string;
  country: string;
  city: string;
  action: string;
  coreVersion: string;
  consumerId: string;
  consumerUri: string;
  messageId: string;
  timestamp: string;
  deviceId: string;
  transactionId: string;
  providerUrl: string;
  ttl: string;

  static fromJson(data: Record<string, any>): Context {
    const obj = new Context();
    obj.domain = data["domain"];
    obj.country = data["country"];
    obj.city = data["city"];
    obj.action = data["action"];
    obj.coreVersion = data["core_version"];
    obj.consumerId = data["consumer_id"];
    obj.consumerUri = data["consumer_uri"];
    obj.messageId = data["message_id"];
    obj.timestamp = data["timestamp"];
    obj.deviceId = data["device_id"];
    obj.transactionId = data["transaction_id"];
    obj.providerUrl = data["provider_uri"];
    obj.ttl = data["ttl"];

    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    data["domain"] = this.domain;
    data["country"] = this.country;
    data["city"] = this.city;
    data["action"] = this.action;
    data["core_version"] = this.coreVersion;
    data["consumer_id"] = this.consumerId;
    data["consumer_uri"] = this.consumerUri;
    data["message_id"] = this.messageId;
    data["timestamp"] = this.timestamp;
    data["ttl"] = this.ttl;
    if (this.deviceId != null) {
      data["device_id"] = this.deviceId;
    }
    if (this.providerUrl != null) {
      data["provider_uri"] = this.providerUrl;
    }
    data["transaction_id"] = this.transactionId;
    return data;
  }
}
