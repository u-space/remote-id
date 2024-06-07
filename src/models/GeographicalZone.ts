import { Coordinator } from "./Coordinator";

export class GeographicalZone {
  id?: string;
  name?: string;
  geography?: GeoJSON.Polygon;
  layer_id?: string;
  object_id?: string;
  gfid?: string;
  last_update?: Date;
  coordinator?: Coordinator;

  constructor(
    id?: string,
    name?: string,
    geography?: GeoJSON.Polygon,
    layer_id?: string,
    object_id?: string,
    gfid?: string,
    last_update?: Date,
    coordinator?: Coordinator
  ) {
    this.id = id;
    this.name = name;
    this.geography = geography;
    this.layer_id = layer_id;
    this.object_id = object_id;
    this.gfid = gfid;
    this.last_update = last_update;
    this.coordinator = coordinator;
  }
}
