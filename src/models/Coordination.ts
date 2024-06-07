import { Coordinator } from "./Coordinator";
import { FlightRequest } from "./FlightRequest";

export enum CoordinationState {
  TODO = "TODO",
  REQUESTED = "REQUESTED",
  APPROVED = "APPROVED",
  IN_NEED_OF_MODIFICATION = "IN_NEED_OF_MODIFICATION",
  REJECTED = "REJECTED",
  SELF_MANAGED = "SELF_MANAGED",
}

export class Coordination {
  id?: string;
  reference?: string;
  state: CoordinationState;
  limit_date: Date;
  last_state_change_reason?: string;
  coordinator?: Coordinator;
  flightRequest?: FlightRequest | { id: string };

  constructor(
    state: CoordinationState,
    limit_date: Date,
    coordinator?: Coordinator,
    flightRequest?: FlightRequest | { id: string },
    id?: string,
    reference?: string,
    last_state_change_reason?: string
  ) {
    this.id = id;
    this.reference = reference;
    this.state = state;
    this.limit_date = limit_date;
    this.last_state_change_reason = last_state_change_reason;
    this.coordinator = coordinator;
    this.flightRequest = flightRequest;
  }
}
