import { NoDataError } from "../../errors/NoDataError";
import { Operation } from "../../models/Operation";
import { Language, Role, Settings, User } from "../../models/User";
import {
  Vehicle,
  VehicleAuthorizeStatus,
  vehicleType,
} from "../../models/Vehicle";
import ICielumAPI from "./ICielumAPI";
import { v4 as uuidv4 } from "uuid";

export default class CielumAPIMock implements ICielumAPI {
  users: User[] = [
    new User(
      "admin",
      "Administrador",
      "Del Sistema",
      "admin@delsistema.com",
      undefined,
      true,
      Role.ADMIN,
      undefined,
      new Settings(Language.EN),
      {
        DNI_CIF: "507690588",
        phone: "099999999",
        address: "admin",
        zipCode: "11400",
        city: "ADMIN",
        documents: [],
      }
    ),
  ];

  vehicles: Vehicle[] = [
    new Vehicle(
      "a3f92b57-d5b6-4000-9748-359ed6a34af2",
      "2022-11-14T15:27:09.836Z",
      this.users[0],
      this.users[0],
      [this.users[0]],
      "NNUMBER",
      "FAANUMBER",
      "Admin Nave",
      "DJI",
      "Mavic mini 2",
      vehicleType.MULTIROTOR,
      [],
      undefined,
      undefined,
      undefined,
      VehicleAuthorizeStatus.AUTHORIZED,
      {
        serial_number: "adsfs22323",
        documents: [
          {
            name: "1668622023229-488586774-Casa-XANEL-·-12-1.jpg",
            upload_time: "2022-11-16T18:07:03.852Z",
            valid_until: "2022-11-30T18:06:35.965Z",
            id: "6764f332-3264-4453-a8eb-d8374641e6c8",
            type: "InsuranceDocument",
            extra_fields: {
              insurance_date_begin: "2022-11-16T18:06:45.595Z",
              insurance_carrier: "dronfies",
              insurance_limit: "500",
            },
            downloadFileUrl:
              "https://easy.cielum.eu:3000/uploads/1668622023229-488586774-Casa-XANEL-·-12-1.jpg",
          },
        ],
      }
    ),
  ];

  operations: any[] = [];

  getHeaders(token: string): any {
    throw new Error("not implemented");
  }
  async createOperation(operation: any, token: string): Promise<void> {
    const gufi = uuidv4();
    operation.gufi = gufi;
    // TODO: should add a clone of the operation received
    this.operations.push(operation);
  }
  async getOperation(gufi: string, token: string): Promise<Operation> {
    throw new Error("not implemented");
  }
  async getVehicle(uvin: string, token: string): Promise<Vehicle> {
    for (let i = 0; i < this.vehicles.length; i++) {
      if (this.vehicles[i].uvin === uvin) {
        // TODO: Here we should return a clone of the object
        return this.vehicles[i];
      }
    }
    throw new NoDataError(
      `There is no vehicle with the uvin received "${uvin}"`
    );
  }
  async addDocument(
    uvin: string,
    fileName: string,
    document: any,
    documentExtraFields: any,
    token: string
  ): Promise<void> {
    throw new Error("not implemented");
  }
  async getUser(username: string, token: string): Promise<User> {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === username) {
        // TODO: Should return a clone of the object
        return this.users[i];
      }
    }
    throw new NoDataError(
      `There is no user with the username received "${username}"`
    );
  }
}
