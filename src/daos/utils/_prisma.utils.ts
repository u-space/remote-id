import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { InvalidDataError } from "../../errors/InvalidDataError";

export function handlePrismaError(error: any): Error {
  if (error instanceof PrismaClientKnownRequestError) {
    const prismaError = error as PrismaClientKnownRequestError;
    if (prismaError.code === "P2023") {
      // Inconsistent column data
      const errorMessage = prismaError.message.trim();
      if (
        errorMessage.includes("Inconsistent column data: Error creating UUID")
      ) {
        // this means a UUID received is not valid
        return new InvalidDataError("Invalid UUID");
      }
    }
  }
  return error;
}
