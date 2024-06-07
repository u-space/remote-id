import { Coordination } from "./Coordination";
import { GeographicalZone } from "./GeographicalZone";
import { Operation } from "./Operation";
import OperationVolume from "./OperationVolume";
import { User } from "./User";
import { Vehicle } from "./Vehicle";

export enum FlightRequestState {
  REQUIRE_APPROVAL = "REQUIRE_APPROVAL",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
  PREFLIGHT = "PREFLIGHT",
}

export enum FlightCategory {
  OPEN = "OPEN",
  STS_01 = "STS_01",
  STS_02 = "STS_02",
  A2 = "A2",
  A3 = "A3",
}

export class FlightRequest {
  id?: string;
  // public operatorId: string;
  // public volumes: Polygon[];

  name: string;

  volumes: OperationVolume[];

  uavs: Vehicle[];

  state: FlightRequestState;

  operation?: Operation[];

  coordination?: Coordination[];

  operator: User; //FIXME: this should be an operator, will be implemented in the future

  creator: User;

  flight_comments?: string;

  urban_flight?: boolean;

  parachute_model?: string;

  flight_category: FlightCategory;

  dji_blocked?: boolean;

  dji_controller_number?: string;

  dji_email?: string;

  paid: boolean;

  // Expected from frontend but not persisted
  geographicalZones?: GeographicalZone[];

  basePrice?: number;

  urbanFlightCharge?: number;

  paymentLink?: string;

  createdAt?: Date;

  constructor(
    name: string,
    volumes: OperationVolume[],
    uavs: Vehicle[],
    paid: boolean,
    operator: User,
    creator: User,
    state: FlightRequestState,
    flight_category: FlightCategory,
    operation?: Operation[],
    coordination?: Coordination[],
    flight_comments?: string,
    urban_flight?: boolean,
    parachute_model?: string,
    dji_blocked?: boolean,
    dji_controller_number?: string,
    dji_email?: string,
    id?: string,
    geographicalZones?: GeographicalZone[],
    basePrice?: number,
    urbanFlightCharge?: number,
    paymentLink?: string,
    createdAt?: Date
  ) {
    this.id = id;
    this.name = name;
    this.volumes = volumes;
    this.uavs = uavs;
    this.state = state;
    this.operation = operation;
    this.creator = creator;
    this.coordination = coordination;
    this.operator = operator;
    this.flight_comments = flight_comments;
    this.urban_flight = urban_flight;
    this.parachute_model = parachute_model;
    this.flight_category = flight_category;
    this.dji_blocked = dji_blocked;
    this.dji_controller_number = dji_controller_number;
    this.dji_email = dji_email;
    this.paid = paid;
    this.geographicalZones = geographicalZones;
    this.basePrice = basePrice;
    this.urbanFlightCharge = urbanFlightCharge;
    this.paymentLink = paymentLink;
    this.createdAt = createdAt;
  }
}
