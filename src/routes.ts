import { Router } from "express";
import CoordinationController from "./controllers/CoordinationController";

const router = Router();

/* -------------------------------------------------------
 * -------------------- coordination  --------------------
 * -------------------------------------------------------
 */
const coordinationController = new CoordinationController();

router.get(
  "/coordination",
  coordinationController.getCoordinations.bind(coordinationController)
);
router.get(
  "/coordination/:id",
  coordinationController.getCoordination.bind(coordinationController)
);
router.post(
  "/coordination",
  coordinationController.postCoordination.bind(coordinationController)
);

export { router };
