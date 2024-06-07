import Prisma from "@prisma/client";
import { FlySafeInsuranceSimulation } from "../../models/FlySafeInsuranceSimulation";


export function fromPrismaToFlySafeInsuranceSimulation(
  insurance: Prisma.FlySafeInsuranceSimulation
): FlySafeInsuranceSimulation {
  return new FlySafeInsuranceSimulation(
    insurance.id,
    insurance.premium_total,
    insurance.flysafe_simulation_response,
    insurance.simulation_id,
    insurance.vehicle
  );
}