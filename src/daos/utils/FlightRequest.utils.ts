import Prisma from "@prisma/client";
import { InvalidDataError } from "../../errors/InvalidDataError";
import { Coordination } from "../../models/Coordination";
import {
  FlightCategory,
  FlightRequest,
  FlightRequestState,
} from "../../models/FlightRequest";
import OperationVolume from "../../models/OperationVolume";
import {
  fromCoordinationStateToPrisma,
  fromPrismaToCoordination,
} from "./Coordination.utils";

function validateFlightRequest(fr: FlightRequest) {
  if (!fr.uavs) {
    throw new InvalidDataError("UAVs are required");
  } else if (fr.uavs.length === 0) {
    throw new InvalidDataError("UAVs are required");
  } else {
    fr.uavs.forEach((uav) => {
      if (!uav.uvin) {
        throw new InvalidDataError("UAVs are required to have uvin");
      }
    });
  }
  if (fr.operation) {
    fr.operation.forEach((operation) => {
      if (!operation.gufi) {
        throw new InvalidDataError("Operation gufi is required");
      }
    });
  }

  if (!fr.operator) {
    throw new InvalidDataError("Operator is required");
  } else if (!fr.operator.username) {
    throw new InvalidDataError("Operator username is required");
  }

  if (!fr.creator) {
    throw new InvalidDataError("Creator is required");
  } else if (!fr.creator.username) {
    throw new InvalidDataError("Creator username is required");
  }

  if (!fr.state) {
    throw new InvalidDataError("State is required");
  }
}
/**
 *
 * @param flightRequest FlightRequest
 * @returns Prisma.FlightRequestCreateInput
 *
 * @description This function converts a FlightRequest to a Prisma.FlightRequestCreateInput, IT WILL NOT CREATE THE OPERATION VOLUMES
 */

export function fromFlightRequestToPrismaCreate(
  flightRequest: FlightRequest
): Prisma.Prisma.FlightRequestCreateInput {
  try {
    validateFlightRequest(flightRequest);
    //  we van use the ! mark because we have already validated the data
    return {
      name: flightRequest.name,
      state: fromFlightRequestStateToPrisma(flightRequest.state),
      uavs: flightRequest.uavs.map((uav) => uav.uvin!),
      operation: flightRequest.operation
        ? flightRequest.operation.map((operation) => operation.gufi!)
        : [],
      coordination: flightRequest.coordination
        ? {
            createMany: {
              data: flightRequest.coordination.map((coordination) => {
                if (!coordination.coordinator?.id) {
                  throw new InvalidDataError(
                    "Coordinator is required in all coordinations"
                  );
                }
                return {
                  state: fromCoordinationStateToPrisma(coordination.state),
                  limit_date: coordination.limit_date,
                  last_state_change_reason:
                    coordination.last_state_change_reason,
                  coordinatorId: coordination.coordinator.id,
                };
              }),
            },
          }
        : undefined,
      operator: flightRequest.operator.username!,
      creator: flightRequest.creator.username!,
      flight_comments: flightRequest.flight_comments ?? null,
      urban_flight: flightRequest.urban_flight ?? false,
      parachute_model: flightRequest.parachute_model ?? null,
      flight_category: fromFlightCategoryToPrisma(
        flightRequest.flight_category
      ),
      dji_blocked: flightRequest.dji_blocked ?? false,
      dji_controller_number: flightRequest.dji_controller_number ?? null,
      dji_email: flightRequest.dji_email ?? null,
      paid: flightRequest.paid,
    };
  } catch (error) {
    throw new InvalidDataError((error as Error).message);
  }
}

export function fromFlightRequestToPrismaUpdate(
  flightRequest: Partial<FlightRequest>
): Prisma.Prisma.FlightRequestUpdateInput {
  try {
    if (flightRequest.uavs) {
      flightRequest.uavs.forEach((uav) => {
        if (!uav.uvin) {
          throw new InvalidDataError("UAVs are required to have uvin");
        }
      });
    }
    if (flightRequest.operation) {
      flightRequest.operation.forEach((operation) => {
        if (!operation.gufi) {
          throw new InvalidDataError("Operation gufi is required");
        }
      });
    }
    return {
      state: flightRequest.state
        ? fromFlightRequestStateToPrisma(flightRequest.state)
        : undefined,
      uavs: flightRequest.uavs
        ? flightRequest.uavs.map((uav) => uav.uvin!)
        : undefined,
      operation: flightRequest.operation
        ? flightRequest.operation.map((operation) => operation.gufi!)
        : undefined,
      operator: flightRequest.operator?.username,
      flight_comments: flightRequest.flight_comments,
      urban_flight: flightRequest.urban_flight,
      parachute_model: flightRequest.parachute_model,
      flight_category: flightRequest.flight_category
        ? fromFlightCategoryToPrisma(flightRequest.flight_category)
        : undefined,
      dji_blocked: flightRequest.dji_blocked,
      dji_controller_number: flightRequest.dji_controller_number,
      dji_email: flightRequest.dji_email,
      paid: flightRequest.paid,
    };
  } catch (error) {
    throw new InvalidDataError((error as Error).message);
  }
}

export function fromFlightRequestStateToPrisma(
  state: FlightRequestState
): Prisma.FlightRequestState {
  return Prisma.FlightRequestState[
    state as keyof typeof Prisma.FlightRequestState
  ];
}

export function fromPrismaToFlightRequestState(
  state: Prisma.FlightRequestState
): FlightRequestState {
  return FlightRequestState[state as keyof typeof FlightRequestState];
}

export function fromFlightCategoryToPrisma(
  cat: FlightCategory
): Prisma.FlightCategory {
  return Prisma.FlightCategory[cat as keyof typeof Prisma.FlightCategory];
}

export function fromPrismaToFlightCategory(
  cat: Prisma.FlightCategory
): FlightCategory {
  return FlightCategory[cat as keyof typeof FlightCategory];
}

export function fromPrismaToFlightRequest(flightRequest: any): FlightRequest {
  return new FlightRequest(
    flightRequest.name,
    [],
    flightRequest.uavs.map((uav: string) => {
      return {
        uvin: uav,
      };
    }),
    flightRequest.paid,
    { username: flightRequest.operator },
    { username: flightRequest.creator },
    fromPrismaToFlightRequestState(flightRequest.state),
    fromPrismaToFlightCategory(flightRequest.flight_category),
    flightRequest.operation.map((operation: string) => {
      return {
        gufi: operation,
      };
    }),
    flightRequest.coordination?.map((coord: any) => {
      return fromPrismaToCoordination(coord);
    }),
    flightRequest.flight_comments ?? undefined,
    flightRequest.urban_flight ?? undefined,
    flightRequest.parachute_model ?? undefined,
    flightRequest.dji_blocked ?? undefined,
    flightRequest.dji_controller_number ?? undefined,
    flightRequest.dji_email ?? undefined,
    flightRequest.id,
    []
  );
}

export function fromPrismaToFlightRequest2(
  flightRequest: Prisma.FlightRequest,
  coordination: Coordination[]
): FlightRequest {
  return new FlightRequest(
    flightRequest.name,
    [],
    flightRequest.uavs.map((uav) => {
      return {
        uvin: uav,
      };
    }),
    flightRequest.paid,
    { username: flightRequest.operator },
    { username: flightRequest.creator },
    fromPrismaToFlightRequestState(flightRequest.state),
    fromPrismaToFlightCategory(flightRequest.flight_category),
    flightRequest.operation.map((operation) => {
      return {
        gufi: operation,
      };
    }),
    coordination,
    flightRequest.flight_comments ?? undefined,
    flightRequest.urban_flight ?? undefined,
    flightRequest.parachute_model ?? undefined,
    flightRequest.dji_blocked ?? undefined,
    flightRequest.dji_controller_number ?? undefined,
    flightRequest.dji_email ?? undefined,
    flightRequest.id,
    []
  );
}
