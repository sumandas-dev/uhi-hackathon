export class Tags {
  experience: string;
  specialtyTag: string;
  medicinesTag: string;
  followUp: string;
  languageSpokenTag: string;
  education: string;
  firstConsultation: string;
  upiId: string;
  slotId: string;
  hprId: string;

  static fromJson(json: Record<string, any>) {
    const obj = new Tags();
    if (json["@abdm/gov/in/education"] != null) {
      obj.education = json["@abdm/gov/in/education"];
    }

    if (json["@abdm/gov/in/experience"] != null) {
      obj.experience = json["@abdm/gov/in/experience"];
    }

    if (json["@abdm/gov/in/speciality"] != null) {
      obj.specialtyTag = json["@abdm/gov/in/speciality"];
    }

    if (json["@abdm/gov/in/follow_up"] != null) {
      obj.followUp = json["@abdm/gov/in/follow_up"];
    }

    if (json["@abdm/gov/in/first_consultation"] != null) {
      obj.firstConsultation = json["@abdm/gov/in/first_consultation"];
    }

    if (json["@abdm/gov/in/languages"] != null) {
      obj.languageSpokenTag = json["@abdm/gov/in/languages"];
    }

    if (json["@abdm/gov/in/system_of_med"] != null) {
      obj.medicinesTag = json["@abdm/gov/in/system_of_med"];
    }
    if (json["@abdm/gov/in/upi_id"] != null) {
      obj.upiId = json["@abdm/gov/in/upi_id"];
    }
    if (json["@abdm/gov.in/slot"] != null) {
      obj.slotId = json["@abdm/gov.in/slot"];
    }

    if (json["@abdm/gov/in/hpr_id"] != null) {
      obj.hprId = json["@abdm/gov/in/hpr_id"];
    }
    return obj;
  }

  toJson() {
    const data: Record<string, any> = {};
    if (this.education != null) {
      data["@abdm/gov/in/education"] = this.education;
    }
    if (this.experience != null) {
      data["@abdm/gov/in/experience"] = this.experience;
    }

    if (this.followUp != null) {
      data["@abdm/gov/in/follow_up"] = this.followUp;
    }
    if (this.firstConsultation != null) {
      data["@abdm/gov/in/first_consultation"] = this.firstConsultation;
    }
    if (this.specialtyTag != null) {
      data["@abdm/gov/in/speciality"] = this.specialtyTag;
    }
    if (this.languageSpokenTag != null) {
      data["@abdm/gov/in/languages"] = this.languageSpokenTag;
    }

    if (this.medicinesTag != null) {
      data["@abdm/gov/in/system_of_med"] = this.medicinesTag;
    }

    if (this.upiId != null) {
      data["@abdm/gov/in/upi_id"] = this.upiId;
    }

    if (this.slotId != null) {
      data["@abdm/gov.in/slot"] = this.slotId;
    }

    if (this.hprId != null) {
      data["@abdm/gov/in/hpr_id"] = this.hprId;
    }

    return data;
  }
}
