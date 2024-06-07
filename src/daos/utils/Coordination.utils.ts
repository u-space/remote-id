import Prisma from "@prisma/client";
import { InvalidDataError } from "../../errors/InvalidDataError";
import { UnexpectedError } from "../../errors/UnexpectedError";
import { Coordination, CoordinationState } from "../../models/Coordination";
import { FlightRequest } from "../../models/FlightRequest";
import { fromPrismaToCoordinator } from "./Coordinator.utils";
import {
  fromPrismaToFlightCategory,
  fromPrismaToFlightRequestState,
} from "./FlightRequest.utils";

// ------------------ COORDINATION ------------------
export function fromPrismaToCoordination(coordination: any): Coordination {
  const fr = coordination.flightRequest;
  const existing = fr
    ? new FlightRequest(
        fr.name,
        [],
        fr.uavs.map((uvin: string) => {
          return {
            uvin: uvin,
          };
        }),
        fr.paid,
        { username: fr.operator },
        { username: fr.creator },
        fromPrismaToFlightRequestState(fr.state),
        fromPrismaToFlightCategory(fr.flight_category),
        fr.operation,
        fr.coordination,
        fr.flight_comments,
        fr.urban_flight,
        fr.parachute_model,
        fr.dji_blocked,
        fr.dji_controller_number,
        fr.dji_email,
        fr.id,
        undefined,
        undefined,
        undefined,
        undefined,
        fr.createdAt
      )
    : undefined;
  if (existing) existing.id = fr.id;
  return new Coordination(
    fromPrismaToCoordinationState(coordination.state),
    coordination.limit_date,
    coordination.coordinator
      ? fromPrismaToCoordinator(coordination.coordinator)
      : undefined,
    existing,
    coordination.id,
    coordination.reference ?? undefined,
    coordination.last_state_change_reason ?? undefined
  );
}

export function fromCoordinationToPrismaCreate(
  coordination: Coordination
): Prisma.Prisma.CoordinationCreateInput {
  if (!coordination.coordinator?.id) {
    throw new InvalidDataError("Coordinator id is missing");
  }
  if (!coordination.flightRequest?.id) {
    throw new InvalidDataError("FlightRequest id is missing");
  }
  const result = {
    id: coordination.id,
    reference: coordination.reference,
    state: fromCoordinationStateToPrisma(coordination.state),
    limit_date: coordination.limit_date,
    last_state_change_reason: coordination.last_state_change_reason,
    coordinator: { connect: { id: coordination.coordinator.id } },
    flightRequest: { connect: { id: coordination.flightRequest.id } },
  };
  if (result.limit_date.toString() === "Invalid Date") {
    throw new InvalidDataError(
      `Invalid limit_data (limit_date=${coordination.limit_date})`
    );
  }
  return result;
}

export function fromCoordinationToPrismaUpdate(
  coordination: Partial<Coordination>
): Prisma.Prisma.CoordinationUpdateInput {
  return {
    id: coordination.id,
    reference: coordination.reference,
    state: coordination.state
      ? fromCoordinationStateToPrisma(coordination.state)
      : undefined,
    limit_date: coordination.limit_date,
    last_state_change_reason: coordination.last_state_change_reason,
    coordinator:
      coordination.coordinator && coordination.coordinator.id
        ? { connect: { id: coordination.coordinator.id } }
        : undefined,
    flightRequest:
      coordination.flightRequest && coordination.flightRequest.id
        ? { connect: { id: coordination.flightRequest.id } }
        : undefined,
  };
}

// This function map each CoordinationState enum from prisma to the one from the model
export function fromPrismaToCoordinationState(
  coordinationState: Prisma.CoordinationState
): CoordinationState {
  switch (coordinationState) {
    case Prisma.CoordinationState.TODO:
      return CoordinationState.TODO;
    case Prisma.CoordinationState.REQUESTED:
      return CoordinationState.REQUESTED;
    case Prisma.CoordinationState.APPROVED:
      return CoordinationState.APPROVED;
    case Prisma.CoordinationState.IN_NEED_OF_MODIFICATION:
      return CoordinationState.IN_NEED_OF_MODIFICATION;
    case Prisma.CoordinationState.REJECTED:
      return CoordinationState.REJECTED;
    case Prisma.CoordinationState.SELF_MANAGED:
      return CoordinationState.SELF_MANAGED;
    default:
      throw new UnexpectedError("CoordinationState not found");
  }
}

export function fromCoordinationStateToPrisma(
  coordinationState: CoordinationState
): Prisma.CoordinationState {
  switch (coordinationState) {
    case CoordinationState.TODO:
      return Prisma.CoordinationState.TODO;
    case CoordinationState.REQUESTED:
      return Prisma.CoordinationState.REQUESTED;
    case CoordinationState.APPROVED:
      return Prisma.CoordinationState.APPROVED;
    case CoordinationState.IN_NEED_OF_MODIFICATION:
      return Prisma.CoordinationState.IN_NEED_OF_MODIFICATION;
    case CoordinationState.REJECTED:
      return Prisma.CoordinationState.REJECTED;
    case CoordinationState.SELF_MANAGED:
      return Prisma.CoordinationState.SELF_MANAGED;
    default:
      throw new UnexpectedError("CoordinationState not found");
  }
}
