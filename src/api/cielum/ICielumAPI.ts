import { Operation } from "../../models/Operation";
import { User } from "../../models/User";
import { Vehicle } from "../../models/Vehicle";

export default interface ICielumAPI {
  getHeaders(token: string): any;
  createOperation(operation: any, token: string): Promise<void>;
  getOperation(gufi: string, token: string): Promise<Operation>;
  getVehicle(uvin: string, token: string): Promise<Vehicle>;
  addDocument(
    uvin: string,
    fileName: string,
    document: any,
    documentExtraFields: any,
    token: string
  ): Promise<void>;
  getUser(username: string, token: string): Promise<User>;
}
