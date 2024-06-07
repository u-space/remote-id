import Prisma from "@prisma/client";
import { isUndefined } from "lodash";
import { InvalidDataError } from "../../errors/InvalidDataError";
import AutomaticCoordinatorProcedure from "../../models/AutomaticCoordinatorProcedure";
import {
  Coordinator,
  CoordinatorType,
  Liaison,
} from "../../models/Coordinator";
import ManualCoordinatorProcedure from "../../models/ManualCoordinatorProcedure";
import { fromPrismaToGeographicalZone } from "./GeographicalZone.utils";

// ------------------ COORDINATOR ------------------

function validateCoordinatorForPrisma(coordinator: Coordinator) {
  /*if (!coordinator.telephone) {
    throw new InvalidDataError("Coordinator telephone is missing");
  }
  if (!coordinator.email) {
    throw new InvalidDataError("Coordinator email is missing");
  }*/
  // if (!coordinator.minimun_coordination_days) {
  //   throw new InvalidDataError(
  //     "Coordinator minimun_coordination_days is missing"
  //   );
  // }
  // if (!coordinator.price) {
  //   throw new InvalidDataError("Coordinator price is missing");
  // }
  if (isUndefined(coordinator.geographical_zone)) {
    throw new InvalidDataError("Coordinator geographical_zone is missing");
  }
  if (isUndefined(coordinator.geographical_zone.id)) {
    throw new InvalidDataError("Coordinator.geographical_zone.id is missing");
  }
  if (isUndefined(coordinator.infrastructure)) {
    throw new InvalidDataError("Coordinator infrastructure is missing");
  }
}

export function fromPrismaToCoordinator(
  coordinator: Prisma.Coordinator & {
    automatic_coordinator_procedure?: Prisma.AutomaticCoordinatorProcedure | null;
    manual_coordinator_procedure?: Prisma.ManualCoordinatorProcedure | null;
    geographical_zone?: Prisma.GeographicalZone;
  }
) {
  return new Coordinator(
    coordinator.id,
    coordinator.infraestructure,
    fromPrismaToLiaison(coordinator.liaison),
    fromPrismaToCoordinatorType(coordinator.type),
    (coordinator.automatic_coordinator_procedure as AutomaticCoordinatorProcedure) ??
      (coordinator.manual_coordinator_procedure as ManualCoordinatorProcedure),
    coordinator.telephone === null ? undefined : coordinator.telephone,
    coordinator.email === null ? undefined : coordinator.email,
    coordinator.minimun_coordination_days,
    coordinator.price,
    coordinator.discount_Multiple_Dates ?? undefined,
    coordinator.geographical_zone
      ? fromPrismaToGeographicalZone(coordinator.geographical_zone)
      : undefined,
    coordinator.manual_coordinator_procedure ?? undefined,
    coordinator.automatic_coordinator_procedure ?? undefined
  );
}

export function fromCoordinatorToPrismaCreate(
  coordinator: Coordinator
): Prisma.Prisma.CoordinatorCreateInput {
  try {
    validateCoordinatorForPrisma(coordinator);
    const mcp = coordinator.manual_coordinator_procedure;
    const acp = coordinator.automatic_coordinator_procedure;
    // We can exclamation mark here because we have already validated the coordinator, to make TS happy
    return {
      id: coordinator.id,
      infraestructure: coordinator.infrastructure!,
      liaison: coordinator.liaison
        ? fromLiaisonToPrisma(coordinator.liaison)
        : undefined,
      type: coordinator.type
        ? fromCoordinatorTypeToPrisma(coordinator.type)
        : undefined,
      telephone: coordinator.telephone!,
      email: coordinator.email!,
      minimun_coordination_days: coordinator.minimun_coordination_days!,
      price: coordinator.price!,
      discount_Multiple_Dates: coordinator.discount_Multiple_Dates!,
      geographical_zone: {
        connect: {
          id: coordinator.geographical_zone!.id,
        },
      },
      manual_coordinator_procedure: mcp
        ? {
            create: {
              text_description: mcp.text_description ?? "",
              procedure_url: mcp.procedure_url ?? "",
              template_url: mcp.template_url ?? "",
            },
          }
        : undefined,
      automatic_coordinator_procedure: acp
        ? {
            create: {
              email: acp.email ?? "",
              template_html: acp.template_html ?? "",
            },
          }
        : undefined,
    };
  } catch (error) {
    throw error;
  }
}

export function fromCoordinatorToPrismaUpdate(
  coordinator: Partial<Coordinator>
): Prisma.Prisma.CoordinatorUpdateInput {
  return {
    id: coordinator.id,
    infraestructure: coordinator.infrastructure,
    liaison: coordinator.liaison
      ? fromLiaisonToPrisma(coordinator.liaison)
      : undefined,
    type: coordinator.type
      ? fromCoordinatorTypeToPrisma(coordinator.type)
      : undefined,
    telephone: coordinator.telephone,
    email: coordinator.email,
    minimun_coordination_days: coordinator.minimun_coordination_days,
    price: coordinator.price,
    discount_Multiple_Dates: coordinator.discount_Multiple_Dates,
    geographical_zone: coordinator.geographical_zone
      ? {
          connect: {
            id: coordinator.geographical_zone.id,
          },
        }
      : undefined,
    manual_coordinator_procedure: coordinator.manual_coordinator_procedure
      ? {
          update: {
            text_description:
              coordinator.manual_coordinator_procedure.text_description,
            procedure_url:
              coordinator.manual_coordinator_procedure.procedure_url,
            template_url: coordinator.manual_coordinator_procedure.template_url,
          },
        }
      : undefined,
    automatic_coordinator_procedure: coordinator.automatic_coordinator_procedure
      ? {
          update: {
            email: coordinator.automatic_coordinator_procedure.email,
            template_html:
              coordinator.automatic_coordinator_procedure.template_html,
          },
        }
      : undefined,
  };
}

function fromPrismaToCoordinatorType(type: Prisma.CoordinatorType) {
  return CoordinatorType[type as keyof typeof CoordinatorType];
}

function fromCoordinatorTypeToPrisma(type: CoordinatorType) {
  return Prisma.CoordinatorType[type as keyof typeof Prisma.CoordinatorType];
}

export function fromPrismaToLiaison(liaison: Prisma.Liaison): Liaison {
  return Liaison[liaison as keyof typeof Liaison];
}

export function fromLiaisonToPrisma(liaison: Liaison): Prisma.Liaison {
  return Prisma.Liaison[liaison as keyof typeof Prisma.Liaison];
}
