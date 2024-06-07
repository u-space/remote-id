import { FlightRequest } from "./FlightRequest";
import { FlySafeInsuranceSimulation } from "./FlySafeInsuranceSimulation";

export class FlightRequestPayment {
  id?: string;
  sessionId?: string;
  user?: string;
  insurance?: FlySafeInsuranceSimulation[];
  createDate?: Date;
  flightRequest: FlightRequest;

  constructor(
    flightRequest: FlightRequest,
    id?: string,
    sessionId?: string,
    user?: string,
    insurance?: FlySafeInsuranceSimulation[],
    createDate?: Date
  ) {
    this.id = id;
    this.sessionId = sessionId;
    this.user = user;
    this.insurance = insurance;
    this.createDate = createDate;
    this.flightRequest = flightRequest;
  }
}
