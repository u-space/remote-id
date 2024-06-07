// import { fileServerUrl } from '../config/config';
// import { getUrl } from '../services/uploadFileService';

export class Document {
  id?: string;
  name?: string;
  upload_time?: string;
  valid_until?: string;
  tag?: string;
  observations?: string;
  valid?: boolean;
  extra_fields: any;
  downloadFileUrl?: string;

  getFileName() {
    return this.name; //`${this.name}`;
  }

  // getDownloadFileUrl() {
  // 	return fileServerUrl.slice(0, -1) + getUrl(this.getFileName());
  // }

  // populateAttributes() {
  // 	this.downloadFileUrl = this.getDownloadFileUrl();
  // }

  /**
   * @returns document simple extra fields.
   */
  //   getExtraFieldSchema(): any {
  //     const tag = this.tag;
  //     return Document.getExtraFieldSchema(tag);
  //   }

  static extraFieldsSchemas = {
    InsuranceDocument: {
      insurance_carrier: { type: "String", required: true },
      insurance_date_begin: { type: "Date", required: true },
      insurance_limit: { type: "String", required: true },
    },
    OperatorRegisterDocument: {},
    TheoricalUasDocument: {
      school: { type: "String", required: true },
      pilotCometence: { type: "String", required: true },
    },
    PracticalUasDocument: {
      school: { type: "String", required: true },
      pilotCometence: { type: "String", required: true },
    },
    LiabilityInsuranceDocument: {
      insurance_carrier: { type: "String", required: true },
      insurance_date_begin: { type: "Date", required: true },
      insurance_limit: { type: "Number", required: true },
    },
    Sts01Docuemnt: {
      school: { type: "String", required: true },
      pilotCometence: { type: "String", required: true },
    },
    Sts02Docuemnt: {
      school: { type: "String", required: true },
      pilotCometence: { type: "String", required: true },
    },
    RadiofonistDocument: {
      school: { type: "String", required: true },
      pilotCometence: { type: "String", required: true },
    },
    Other: {},
  };

  // static getExtraFieldSchema(tag: string): ObjectLiteral {
  // 	return Document.extraFieldsSchemas[tag];
  // }
}

export function setExtraField(document: any) {
  if (document.extra_fields_str) {
    try {
      document.extra_fields = JSON.parse(document.extra_fields_str);
    } catch (error) {
      document.extra_fields = {};
    }
    delete document.extra_fields_str;
  }
}

export function setFileName(request: any, document: any) {
  if (request.files && request.files[0]) {
    const files = request.files;
    const fileMetadata = files[0];
    document.name = fileMetadata.filename;
  }
}

export function validateDocument(document: any) {
  const errors = [];
  if (!document.name) {
    errors.push("Invalid empty name.");
  }
  if (!document.tag) {
    errors.push("Invalid empty tag.");
  }
  if (errors.length > 0) {
    throw new Error(errors.join(" "));
  }
}
