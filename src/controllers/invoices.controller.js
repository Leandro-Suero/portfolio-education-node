import Invoice from "../models/Invoice";
import User from "../models/User";

export async function getInvoices(req, res) {
  const sort = req.query.sort ? JSON.parse(req.query.sort) : ["id", "ASC"];
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  try {
    const invoices = await Invoice.findAndCountAll({
      include: {
        model: User,
        attributes: ["name", "id", "email", "role", "active"],
      },
      limit,
      offset,
      order: [sort],
    });
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
  const {
    payment_date = null,
    amount,
    description,
    status = "unpaid",
    user_id,
  } = req.body;
  try {
    const newInvoice = await Invoice.create(
      {
        payment_date,
        amount,
        description,
        status,
        user_id,
      },
      {
        fields: ["payment_date", "amount", "description", "status", "user_id"],
      }
    );

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
  const { invoiceId } = req.params;
  try {
    const invoice = await Invoice.findOne({
      where: { id: invoiceId },
      include: {
        model: User,
        attributes: ["name", "id", "email", "role", "active"],
      },
    });
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
    const invoiceFound = await Invoice.findByPk(req.params.invoiceId);
    for (const prop in req.body) {
      invoiceFound[prop] = req.body[prop];
    }
    const updated = await invoiceFound.save();
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
  const { invoiceId } = req.params;
  try {
    const invoiceFound = await Invoice.findByPk(invoiceId);
    if (invoiceFound) {
      const destroyed = await invoiceFound.destroy();
      if (destroyed) {
        return res.status(204).json();
      }
    } else {
      return res.status(404).json({ message: "Invoice not found", data: {} });
    }
    return res.status(500).json({ message: "Something went wrong", data: {} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}
