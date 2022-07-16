import { Context } from "./classes/context";
import { InitMessage } from "./classes/init-message";

export class BookingInitRequestModel {
  context: Context;
  message: InitMessage;

  fromJson(json: Record<string, any>) {
    const obj = new BookingInitRequestModel();
    obj.context =
      json["context"] != null ? Context.fromJson(json["context"]) : null;
    obj.message =
      json["message"] != null ? InitMessage.fromJson(json["message"]) : null;
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    if (this.context != null) {
      data["context"] = this.context!.toJson();
    }
    if (this.message != null) {
      data["message"] = this.message!.toJson();
    }
    return data;
  }
}
