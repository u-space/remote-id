import Prisma from "@prisma/client";
import { InvalidDataError } from "../../errors/InvalidDataError";
import { FlightRequest } from "../../models/FlightRequest";
import { FlightRequestPayment } from "../../models/FlightRequestPayment";
import { fromPrismaToFlightRequest } from "./FlightRequest.utils";

export function fromFlightRequestPaymentToPrisma(
  payment: FlightRequestPayment
): Prisma.Prisma.FlightRequestPaymentCreateInput {
  try {
    validatePrismaFlightRequestPayment(payment);
    return {
      sessionId: payment.sessionId!,
      user: payment.user!,
      insurance: {
        createMany: {
          data: payment.insurance!.map((ins) => {
            return {
              flysafe_simulation_response: ins.flysafe_simulation_response!,
              premium_total: ins.premium_total!,
              simulation_id: ins.simulation_id!,
              vehicle: ins.vehicle!,
            };
          }),
        },
      },
      FlightRequest: {
        connect: {
          id: payment.flightRequest!.id,
        },
      },
    };
  } catch (error) {
    throw new InvalidDataError((error as Error).message);
  }
}

export function fromPrismaToFlightRequestPayment(
  payment: Prisma.FlightRequestPayment & {
    insurance?: Prisma.FlySafeInsuranceSimulation[];
    FlightRequest: Prisma.FlightRequest;
  }
): FlightRequestPayment {
  return new FlightRequestPayment(
    fromPrismaToFlightRequest(payment.FlightRequest),
    payment.id,
    payment.sessionId,
    payment.user,
    payment.insurance,
    payment.createDate
  );
}

export function fromPrismaToFlightRequestPayment2(
  payment: Prisma.FlightRequestPayment,
  flightRequest: FlightRequest,
  insurance?: Prisma.FlySafeInsuranceSimulation[]
): FlightRequestPayment {
  return new FlightRequestPayment(
    flightRequest,
    payment.id,
    payment.sessionId,
    payment.user,
    insurance,
    payment.createDate
  );
}

function validatePrismaFlightRequestPayment(payment: FlightRequestPayment) {
  if (!payment.sessionId) {
    throw new Error("sessionId is required");
  }
  if (!payment.user) {
    throw new Error("user is required");
  }
  if (!payment.flightRequest) {
    throw new Error("flightRequest is required");
  }
  if (payment.insurance && payment.insurance.length > 0) {
    payment.insurance.forEach((ins) => {
      if (!ins.flysafe_simulation_response) {
        throw new Error("flysafe_simulation_response is required");
      }
      if (!ins.premium_total) {
        throw new Error("premium_total is required");
      }
      if (!ins.simulation_id) {
        throw new Error("simulation_id is required");
      }
      if (!ins.vehicle) {
        throw new Error("vehicle is required");
      }
    });
  }
}
