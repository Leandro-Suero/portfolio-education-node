import * as invoiceService from "../services/invoices.services";

export async function getInvoices(req, res) {
  const sort = req.query.sort ? JSON.parse(req.query.sort) : ["id", "ASC"];
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  try {
    const invoices = await invoiceService.getInvoices(limit, offset, sort);
    res.header(
      "Content-Range",
      `invoices ${offset}-${offset + limit}/${invoices.count}`
    );
    res.header("Access-Control-Expose-Headers", "Content-Range");
    return res.json({
      data: invoices.rows,
      total: invoices.count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function createInvoice(req, res) {
  try {
    const newInvoice = await invoiceService.createInvoice(req.body);
    if (newInvoice) {
      return res.json({
        message: "Invoice created succesfully",
        data: newInvoice,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function getInvoiceById(req, res) {
  try {
    const invoice = await invoiceService.getInvoiceById(req.params.invoiceId);
    return res.json({
      data: invoice,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function updateInvoiceById(req, res) {
  try {
    const updated = await invoiceService.updateInvoiceById(req.body);
    if (updated) {
      return res.status(200).json(updated);
    }
    return res.status(500).json({ message: "Something went wrong", data: {} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function deleteInvoiceById(req, res) {
  try {
    const destroyed = await invoiceService.deleteInvoiceById(
      req.params.invoiceId
    );
    if (destroyed) {
      return res.status(204).json({ message: "Invoice deleted!", data: {} });
    }
    return res.status(404).json({ message: "Invoice not found", data: {} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}
