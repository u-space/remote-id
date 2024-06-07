import { FlightRequestDAO } from "../daos/FlightRequestDAO";
import { IPositionPostRequest } from "../entities/IPositionPostRequest";

export class PositionService {
  private flightRequestDAO: FlightRequestDAO;

  constructor() {}

  async addPosition(position: IPositionPostRequest, username: string) {}
}
