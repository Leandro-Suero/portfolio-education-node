import { authJwt } from "../middlewares";
import { Router } from "express";
const router = Router();

import * as invoicesCtrl from "../controllers/invoices.controller";

router.get("/", authJwt.verifyToken, invoicesCtrl.getInvoices);

router.get("/:invoiceId", authJwt.verifyToken, invoicesCtrl.getInvoiceById);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  invoicesCtrl.createInvoice
);

router.put(
  "/:invoiceId",
  [authJwt.verifyToken, authJwt.isAdmin],
  invoicesCtrl.updateInvoiceById
);

router.delete(
  "/:invoiceId",
  [authJwt.verifyToken, authJwt.isAdmin],
  invoicesCtrl.deleteInvoiceById
);

export default router;
