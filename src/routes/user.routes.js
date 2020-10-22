import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";

router.post("/", usersCtrl.createUser);

router.get("/", usersCtrl.getUsers);

router.get("/:userId", usersCtrl.getUserById);

router.delete("/:userId", usersCtrl.deleteUserById);

export default router;
