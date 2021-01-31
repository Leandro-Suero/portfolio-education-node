import Invoice from "../models/Invoice";
import User from "../models/User";

export async function getInvoices(limit, offset, sort) {
  return Invoice.findAndCountAll({
    include: {
      model: User,
      attributes: ["name", "id", "email", "role", "active"],
    },
    limit,
    offset,
    order: [sort],
  });
}

export async function createInvoice({
  payment_date = null,
  amount,
  description,
  status = "unpaid",
  user_id,
}) {
  return Invoice.create(
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
}

export async function getInvoiceById(invoiceId) {
  return Invoice.findOne({
    where: { id: invoiceId },
    include: {
      model: User,
      attributes: ["name", "id", "email", "role", "active"],
    },
  });
}

export async function updateInvoiceById({ ...invoiceNewData }) {
  const invoiceFound = await Invoice.findByPk(invoiceNewData.id);
  for (const prop in invoiceNewData) {
    invoiceFound[prop] = invoiceNewData[prop];
  }
  const updated = await invoiceFound.save();
  return updated;
}

export async function deleteInvoiceById(invoiceId) {
  const invoiceFound = await Invoice.findByPk(invoiceId);
  if (invoiceFound) {
    const destroyed = await invoiceFound.destroy();
    return destroyed;
  } else {
    return false;
  }
}
