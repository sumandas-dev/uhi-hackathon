export class InitTimeSlotTags {
  abdmGovInSlotId: string;

  static fromJson(json: Record<string, any>) {
    const obj = new InitTimeSlotTags();
    obj.abdmGovInSlotId = json["@abdm/gov.in/slot_id"];
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    data["@abdm/gov.in/slot_id"] = this.abdmGovInSlotId;
    return data;
  }
}
