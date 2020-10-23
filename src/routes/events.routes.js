import { authJwt } from "../middlewares";
import { Router } from "express";
const router = Router();

import * as eventsCtrl from "../controllers/events.controller";

router.get("/", eventsCtrl.getEvents);

router.get("/:eventId", eventsCtrl.getEventById);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  eventsCtrl.createEvent
);

router.put(
  "/:eventId",
  [authJwt.verifyToken, authJwt.isAdminOrTeacher],
  eventsCtrl.updateEventById
);

router.delete(
  "/:eventId",
  [authJwt.verifyToken, authJwt.isAdmin],
  eventsCtrl.deleteEventById
);

//participants routes
router.post(
  "/:eventId/participants",
  [authJwt.verifyToken, authJwt.isAdminOrTeacher],
  eventsCtrl.addParticipant
);
router.delete(
  "/:eventId/participants",
  [authJwt.verifyToken, authJwt.isAdminOrTeacher],
  eventsCtrl.removeParticipant
);

export default router;
