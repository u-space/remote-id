import * as turf from "@turf/turf";
import { Point, Polygon } from "geojson";
import { IPositionPostRequest } from "./src/controllers/IPositionPostRequest";
import { initialized } from "./src/data-source";
import { PositionService } from "./src/services/PositionService";

export function calculatePoint(
  polygonGeoJSON: Polygon,
  speed: number,
  time: number
): Point | null {
  // Calcular la distancia a recorrer
  const distance = speed * time;

  // Obtener el perímetro del polígono
  const line = turf.polygonToLine(polygonGeoJSON);
  const length = turf.length(line, { units: "meters" });

  // Calcular la distancia efectiva tomando en cuenta vueltas completas
  const effectiveDistance = distance % length;

  // Calcular el punto en la línea
  if (line.type === "Feature" && line.geometry.type === "LineString") {
    const point = turf.along(line.geometry, effectiveDistance, {
      units: "meters",
    });
    return point.geometry;
  }
  return null;
}

async function pointOnPolygon(timeElapsed: number) {
  const positionService = new PositionService();
  const pol: Polygon = {
    coordinates: [
      [
        [-56.165826767456224, -34.926955027967296],
        [-56.16529638745092, -34.93800440276001],
        [-56.15226294504977, -34.93756830145275],
        [-56.15412480141511, -34.92586373674635],
        [-56.165826767456224, -34.926955027967296],
      ],
    ],
    type: "Polygon",
  };
  const point = calculatePoint(pol, 10, timeElapsed);
  const iPosition: IPositionPostRequest = {
    authentication_data: "",
    uas_id: "f95b0fb9-5112-4f8e-97a8-7b6c682a697c",
    ua_type: 0,
    timestamp: new Date().toISOString(),
    operational_status: 0,
    latitude: point?.coordinates[1] || 0,
    longitude: point?.coordinates[0] || 0,
    geodetic_altitude: 0,
    horizontal_accuracy: 0,
    vertical_accuracy: 0,
    speed: 0,
    direction: 0,
    vertical_speed: 0,
    operator_location: {
      latitude: -34.92903,
      longitude: -56.16084,
      altitude: 0,
    },
    operating_area: {
      ceiling: 0,
      floor: 0,
      radius: 0,
      polygon: pol.coordinates[0].map((p) => ({
        latitude: p[1],
        longitude: p[0],
        altitude: 0,
      })),
      start_time: new Date().toISOString(),
      end_time: new Date().toISOString(),
    },
  };

  try {
    const savedPosition = await positionService.addPosition(
      iPosition,
      "emialonzo@gmail.com"
    );
    console.log(savedPosition);
  } catch (error) {
    console.log(error);
  }
}

const startTime = new Date();
function loop() {
  setTimeout(() => {
    const endTime = new Date();
    const timeElapsedMs = endTime.getTime() - startTime.getTime();
    console.log("Time elapsed: " + timeElapsedMs / 1000 + " s");
    pointOnPolygon(timeElapsedMs / 1000);
    loop();
  }, 1000);
}

initialized.then(() => {
  loop();
});
