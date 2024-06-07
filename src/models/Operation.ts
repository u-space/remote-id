import { Point } from "geojson";
import OperationVolume from "./OperationVolume";
import { User } from "./User";
import { Vehicle } from "./Vehicle";

export enum OperationState {
  PROPOSED = "PROPOSED",
  ACCEPTED = "ACCEPTED",
  ACTIVATED = "ACTIVATED",
  CLOSED = "CLOSED",
  NONCONFORMING = "NONCONFORMING",
  ROGUE = "ROGUE",
  NOT_ACCEPTED = "NOT_ACCEPTED",
  PENDING = "PENDING",
}
export enum OperatonFaaRule {
  PART_107 = "PART_107",
  PART_107X = "PART_107X",
  PART_101E = "PART_101E",
  OTHER = "OTHER",
}

export class Operation {
  gufi?: string;
  name?: string;
  owner?: User;
  uss_name?: string;
  discovery_reference?: string;
  submit_time?: string;
  update_time?: string;
  aircraft_comments?: string;
  flight_comments?: string;
  volumes_description?: string;
  airspace_authorization?: string;
  state?: OperationState;
  controller_location?: Point;
  gcs_location?: Point;
  faa_rule?: OperatonFaaRule;
  operation_volumes?: OperationVolume[];
  uas_registrations?: Vehicle[];
  creator?: User;
  contact?: string;
  contact_phone?: string;

  constructor(
    gufi?: string,
    name?: string,
    owner?: User,
    uss_name?: string,
    discovery_reference?: string,
    submit_time?: string,
    update_time?: string,
    aircraft_comments?: string,
    flight_comments?: string,
    volumes_description?: string,
    airspace_authorization?: string,
    state?: OperationState,
    controller_location?: Point,
    gcs_location?: Point,
    faa_rule?: OperatonFaaRule,
    operation_volumes?: OperationVolume[],
    uas_registrations?: Vehicle[],
    creator?: User,
    contact?: string,
    contact_phone?: string
  ) {
    this.gufi = gufi;
    this.name = name;
    this.owner = owner;
    this.uss_name = uss_name;
    this.discovery_reference = discovery_reference;
    this.submit_time = submit_time;
    this.update_time = update_time;
    this.aircraft_comments = aircraft_comments;
    this.flight_comments = flight_comments;
    this.volumes_description = volumes_description;
    this.airspace_authorization = airspace_authorization;
    this.state = state;
    this.controller_location = controller_location;
    this.gcs_location = gcs_location;
    this.faa_rule = faa_rule;
    this.operation_volumes = operation_volumes;
    this.uas_registrations = uas_registrations;
    this.creator = creator;
    this.contact = contact;
    this.contact_phone = contact_phone;
  }
}
