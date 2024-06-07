import axios, { AxiosInstance } from "axios";
import FormData from "form-data";
import { createReadStream } from "fs";
import { Operation } from "../../models/Operation";
import { User } from "../../models/User";
import { Vehicle } from "../../models/Vehicle";
import Configuration from "../../utils/Configuration";
import ICielumAPI from "./ICielumAPI";

export default class CielumAPIImp implements ICielumAPI {
  private _baseUrl: string = Configuration.CIELUM_BACKEND;
  private axiosInstance: AxiosInstance;
  constructor() {
    const https = require("https");
    this.axiosInstance = axios.create({
      baseURL: this._baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
  }

  getHeaders(token: string, multipart = true): any {
    const headers = multipart
      ? { "Content-Type": "multipart/form-data", auth: token }
      : { auth: token };
    return { headers };
  }

  //operations
  async createOperation(operation: any, token: string) {
    const response = await this.axiosInstance.post(
      `/operation/`,
      operation,
      this.getHeaders(token, false)
    );
  }
  async getOperation(gufi: string, token: string): Promise<Operation> {
    const response = await this.axiosInstance.get(
      `/operation/${gufi}`,
      this.getHeaders(token)
    );
    return response.data as Operation;
  }
  //vehicles
  async getVehicle(uvin: string, token: string): Promise<Vehicle> {
    try {
      const response = await this.axiosInstance.get(`/vehicle/${uvin}`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data as Vehicle;
    } catch (error) {
      throw error;
    }
  }
  async addDocument(
    uvin: string,
    fileName: string,
    document: any,
    documentExtraFields: any,
    token: string
  ) {
    // const file = readFileSync(fileName);
    const readStream = createReadStream(
      `${Configuration.FILES_PATH}/${fileName}`
    );

    let formData = new FormData();
    formData.append("extra_fields_str", JSON.stringify(documentExtraFields));
    formData.append("file", readStream);
    for (const prop in document) {
      if (prop === "file") continue;
      if (prop === "extra_fields") continue;
      formData.append(prop, (document as any)[prop]);
    }

    const response = await this.axiosInstance.post(
      `/vehicle/${uvin}/document`,
      formData,
      this.getHeaders(token)
    );
  }
  //users
  async getUser(username: string, token: string): Promise<User> {
    const response = await this.axiosInstance.get(
      `/user/${username}`,
      this.getHeaders(token)
    );
    return response.data;
  }
}
