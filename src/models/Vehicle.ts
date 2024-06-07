import { User } from "./User";

export enum vehicleType {
  MULTIROTOR = "MULTIROTOR",
  FIXEDWING = "FIXEDWING",
  VTOL = "VTOL",
  OTHER = "OTHER",
}

export enum VehicleAuthorizeStatus {
  PENDING = "PENDING",
  AUTHORIZED = "AUTHORIZED",
  NOT_AUTHORIZED = "NOT_AUTHORIZED",
}

export class Vehicle {
  uvin?: string;
  date?: string;
  registeredBy?: User;
  owner?: User;
  operators?: User[];
  nNumber?: string;
  faaNumber?: string;
  vehicleName?: string;
  manufacturer?: string;
  model?: string;
  "class"?: vehicleType;
  payload?: string[];
  accessType?: string;
  vehicleTypeId?: string;
  trackerId?: string;
  authorized?: VehicleAuthorizeStatus;
  extra_fields?: Record<string, any>;

  constructor(
    uvin?: string,
    date?: string,
    registeredBy?: User,
    owner?: User,
    operators?: User[],
    nNumber?: string,
    faaNumber?: string,
    vehicleName?: string,
    manufacturer?: string,
    model?: string,
    aClass?: vehicleType,
    payload?: string[],
    accessType?: string,
    vehicleTypeId?: string,
    trackerId?: string,
    authorized?: VehicleAuthorizeStatus,
    extra_fields?: Record<string, any>
  ) {
    this.uvin = uvin;
    this.date = date;
    this.registeredBy = registeredBy;
    this.owner = owner;
    this.operators = operators;
    this.nNumber = nNumber;
    this.faaNumber = faaNumber;
    this.vehicleName = vehicleName;
    this.manufacturer = manufacturer;
    this.model = model;
    this.class = aClass;
    this.payload = payload;
    this.accessType = accessType;
    this.vehicleTypeId = vehicleTypeId;
    this.trackerId = trackerId;
    this.authorized = authorized;
    this.extra_fields = extra_fields;
  }
}
