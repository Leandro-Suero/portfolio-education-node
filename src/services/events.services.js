import Event from "../models/Event";
import User from "../models/User";
import EventUser from "../models/EventUser";
import { sequelize } from "../database/database";

export async function getEvents(limit, offset, sort) {
  return Event.findAndCountAll({
    include: {
      model: User,
      attributes: ["name", "id", "email", "role", "active"],
    },
    limit,
    offset,
    order: [sort],
  });
}

export async function createEvent({ title, description, place, start_time }) {
  return Event.create(
    {
      title,
      description,
      place,
      start_time,
    },
    {
      fields: ["title", "description", "place", "start_time"],
    }
  );
}

export async function getEventById(eventId) {
  return Event.findOne({
    where: { id: eventId },
    include: {
      model: User,
      attributes: ["name", "id", "email", "role", "active"],
    },
  });
}

export async function updateEventById({
  usersToAdd,
  usersToRemove,
  ...eventNewData
}) {
  const t = await sequelize.transaction();
  try {
    if (usersToAdd.length > 0) {
      // forEach addPart
      usersToAdd.forEach((userId) => {
        addParticipant(eventNewData.id, userId, t);
      });
    }
    if (usersToRemove.length > 0) {
      // forEach removePart
      usersToRemove.forEach((userId) => {
        removeParticipant(eventNewData.id, userId, t);
      });
    }
    const eventFound = await Event.findByPk(eventNewData.id);
    for (const prop in eventNewData) {
      eventFound[prop] = eventNewData[prop];
    }
    const updated = await eventFound.save();
    // If the execution reaches this line, no errors were thrown.
    // We commit the transaction.
    await t.commit();
    return updated;
  } catch (error) {
    //something went wrong with the transactions
    await t.rollback();
    throw error;
  }
}

export async function deleteEventById(eventId) {
  const eventFound = await Event.findByPk(eventId);
  if (eventFound) {
    const destroyed = await eventFound.destroy();
    return destroyed;
  } else {
    return false;
  }
}

//OTHER ROUTES - PARTICIPANTS
export async function addParticipant(event_id, user_id, t = false) {
  const options = t ? { transaction: t } : {};
  const newEventUser = await EventUser.create(
    {
      event_id,
      user_id,
    },
    options
  );
  return newEventUser;
}

export async function removeParticipant(event_id, user_id, t = false) {
  const options = t ? { transaction: t } : {};
  const deleted = await EventUser.destroy(
    {
      where: {
        event_id,
        user_id,
      },
    },
    options
  );
  return deleted;
}
