import { IPositionPostRequest } from "../controllers/IPositionPostRequest";
import { PositionDao } from "../daos/position.dao";
import { Position } from "../entities/position";
import { createGeoJsonPoint } from "../utils/geoUtils";

export class PositionService {
  private positionDao: PositionDao;

  constructor() {
    this.positionDao = new PositionDao();
  }

  async addPosition(positionRequest: IPositionPostRequest, username: string) {
    const position: Position = {
      operator_username: username,
      uas_id: positionRequest.uas_id,
      ua_type: positionRequest.ua_type,
      timestamp: new Date(positionRequest.timestamp),
      operational_status: positionRequest.operational_status,
      position: createGeoJsonPoint(
        positionRequest.latitude,
        positionRequest.longitude,
        positionRequest.geodetic_altitude
      ),
      geodetic_altitude: positionRequest.geodetic_altitude,
      horizontal_accuracy: positionRequest.horizontal_accuracy,
      vertical_accuracy: positionRequest.vertical_accuracy,
      speed: positionRequest.speed,
      direction: positionRequest.direction,
      vertical_speed: positionRequest.vertical_speed,
      operator_location: createGeoJsonPoint(
        positionRequest.operator_location.latitude,
        positionRequest.operator_location.longitude,
        positionRequest.operator_location.altitude
      ),
      operating_area_ceiling: positionRequest.operating_area.ceiling,
      operating_area_floor: positionRequest.operating_area.floor,
      operating_area_radius: positionRequest.operating_area.radius,
      operating_area_start_time: new Date(
        positionRequest.operating_area.start_time
      ),
      operating_area_end_time: new Date(
        positionRequest.operating_area.end_time
      ),
      operating_area_polygon: {
        type: "Polygon",
        coordinates: [
          positionRequest.operating_area.polygon.map((ip) => {
            return [ip.longitude, ip.latitude, ip.altitude];
          }),
        ],
      },
    };
    try {
      return await this.positionDao.save(position);
    } catch (error: any) {
      console.log(error);
      throw new Error(
        "There was an error trying to execute PositionService.addPosition()"
      );
    }
  }
}
