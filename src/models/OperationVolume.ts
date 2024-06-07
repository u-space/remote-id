import { Polygon } from "geojson";

class OperationVolume {
  id?: string;
  ordinal?: number;
  effective_time_begin?: Date;
  effective_time_end?: Date;
  min_altitude?: number;
  max_altitude?: number;
  operation_geography?: Polygon;
  beyond_visual_line_of_sight?: boolean;

  constructor(
    id?: string,
    ordinal?: number,
    effective_time_begin?: Date,
    effective_time_end?: Date,
    min_altitude?: number,
    max_altitude?: number,
    operation_geography?: Polygon,
    beyond_visual_line_of_sight?: boolean
  ) {
    this.id = id;
    this.ordinal = ordinal;
    this.effective_time_begin = effective_time_begin;
    this.effective_time_end = effective_time_end;
    this.min_altitude = min_altitude;
    this.max_altitude = max_altitude;
    this.operation_geography = operation_geography;
    this.beyond_visual_line_of_sight = beyond_visual_line_of_sight;
  }
}

export default OperationVolume;
