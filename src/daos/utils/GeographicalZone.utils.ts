import Prisma from "@prisma/client";
import { GeographicalZone } from "../../models/GeographicalZone";
import { fromPrismaToCoordinator } from "./Coordinator.utils";

export function fromPrismaToGeographicalZone(
  geographicalZone: Prisma.GeographicalZone & {
    coordinator?: Prisma.Coordinator;
  }
): GeographicalZone {
  // We define geography as undefined because prismas does not support GeoJSON
  return new GeographicalZone(
    geographicalZone.id,
    geographicalZone.name,
    undefined,
    geographicalZone.layer_id ?? undefined,
    geographicalZone.object_id ?? undefined,
    geographicalZone.gfid ?? undefined,
    geographicalZone.last_update ?? undefined,
    geographicalZone.coordinator
      ? fromPrismaToCoordinator(geographicalZone.coordinator)
      : undefined
  );
}

export function fromGeographicalZoneToPrismaUpdate(
  geozone: Partial<GeographicalZone>
): Prisma.Prisma.GeographicalZoneUpdateInput {
  return {
    name: geozone.name,
    layer_id: geozone.layer_id,
    object_id: geozone.object_id,
    gfid: geozone.gfid,
    last_update: geozone.last_update,
  };
}

export function fromGeographicalZoneToPrismaSave(
  geozone: Partial<GeographicalZone>
): Prisma.Prisma.GeographicalZoneUpdateInput {
  return {
    name: geozone.name,
    layer_id: geozone.layer_id,
    object_id: geozone.object_id,
    gfid: geozone.gfid,
    last_update: geozone.last_update,
  };
}
