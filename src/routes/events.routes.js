import { Router } from "express";
const router = Router();

import * as eventsCtrl from "../controllers/events.controller";

router.get("/", eventsCtrl.getEvents);

router.get("/:eventId", eventsCtrl.getEventById);

router.post("/", eventsCtrl.createEvent);

router.put("/:eventId", eventsCtrl.updateEventById);

router.delete("/:eventId", eventsCtrl.deleteEventById);

export default router;
