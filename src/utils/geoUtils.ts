import { Point } from "geojson";

export const createGeoJsonPoint = (
  latitude: number,
  longitude: number,
  altitude?: number
): Point => {
  return {
    type: "Point",
    coordinates: [longitude, latitude, altitude || 0],
  };
};
