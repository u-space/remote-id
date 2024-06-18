import { Router } from "express";
import { PositionController } from "./controllers/PositionController";

export const router = Router();

/* -------------------------------------------------------
 * -------------------- coordination  --------------------
 * -------------------------------------------------------
 */
const positionController = new PositionController();

router.post(
  "/position",
  positionController.postPositionRequest.bind(positionController)
);

router.get(
  "/position",
  positionController.getPositionRequest.bind(positionController)
);

router.get(
  "/position/after/:id",
  positionController.getPositionAfterIdRequest.bind(positionController)
);

router.get(
  "/position/between/:start/:end",
  positionController.getPositionsBetweenDates.bind(positionController)
);

router.get(
  "/position/last",
  positionController.getLastPosition.bind(positionController)
);

router.get(
  "/position/operation/:id",
  positionController.getPositionsByOperationId.bind(positionController)
);

router.get(
  "/position/operation/",
  positionController.getPositionsByOperationIdWithDates.bind(positionController)
);

// TODO

// router.get(
//   "/coordination/:id",
//   positionController.getCoordination.bind(positionController)
// );
// router.post(
//   "/coordination",
//   positionController.postCoordination.bind(positionController)
// );
