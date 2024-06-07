import OperationVolume from "../models/OperationVolume";

export default class ModelValidationUtils {
  static validateVolume(volume: OperationVolume): void {
    // check first and last point of polygon are the same
    const operationGeography = volume.operation_geography;
    if (!operationGeography)
      throw new Error("Invalid volume (no operation geography)");
    const coordinates = operationGeography.coordinates;
    for (let i = 0; i < coordinates.length; i++) {
      const polygon = coordinates[i];
      if (
        polygon[0][0] !== polygon[polygon.length - 1][0] ||
        polygon[0][1] !== polygon[polygon.length - 1][1]
      ) {
        throw new Error(
          "polygons in volumes must start and end with the same lng,lat pair"
        );
      }
    }
  }
}
