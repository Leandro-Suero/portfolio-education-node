import { authJwt } from "../middlewares";
import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";

router.post("/", [authJwt.verifyToken, authJwt.isAdmin], usersCtrl.createUser);

router.get(
  "/",
  [authJwt.verifyToken, authJwt.isAdminOrTeacher],
  usersCtrl.getUsers
);

router.get(
  "/:userId",
  [authJwt.verifyToken, authJwt.isAdminOrTeacher],
  usersCtrl.getUserById
);

router.delete(
  "/:userId",
  [authJwt.verifyToken, authJwt.isAdmin],
  usersCtrl.deleteUserById
);

export default router;
