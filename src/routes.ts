import { Router } from "express";
import { PositionController } from "./controllers/PositionController";

const router = Router();

/* -------------------------------------------------------
 * -------------------- coordination  --------------------
 * -------------------------------------------------------
 */
const positionController = new PositionController();

router.post(
  "/position",
  positionController.postPositionRequest.bind(positionController)
);
// router.get(
//   "/coordination/:id",
//   positionController.getCoordination.bind(positionController)
// );
// router.post(
//   "/coordination",
//   positionController.postCoordination.bind(positionController)
// );

export { router };
