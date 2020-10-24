import { authJwt } from "../middlewares";
import { Router } from "express";
const router = Router();

import * as groupsCtrl from "../controllers/groups.controller";

router.get("/", groupsCtrl.getGroups);

router.get("/:groupId", groupsCtrl.getGroupById);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  groupsCtrl.createGroup
);

router.put(
  "/:groupId",
  [authJwt.verifyToken, authJwt.isAdminOrTeacher],
  groupsCtrl.updateGroupById
);

router.delete(
  "/:groupId",
  [authJwt.verifyToken, authJwt.isAdmin],
  groupsCtrl.deleteGroupById
);

//participants routes
router.get(
  "/:groupId/participants",
  [authJwt.verifyToken, authJwt.isAdminOrTeacher],
  groupsCtrl.getParticipants
);
router.get(
  "/:groupId/participants/:groupRole",
  [authJwt.verifyToken, authJwt.isAdminOrTeacher],
  groupsCtrl.getParticipantsWithRole
);
router.post(
  "/:groupId/participants",
  [authJwt.verifyToken, authJwt.isAdminOrTeacher],
  groupsCtrl.addParticipant
);
router.delete(
  "/:groupId/participants",
  [authJwt.verifyToken, authJwt.isAdminOrTeacher],
  groupsCtrl.removeParticipant
);

export default router;
