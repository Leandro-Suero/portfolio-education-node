import * as eventService from "../services/events.services";

export async function getEvents(req, res) {
  const sort = req.query.sort ? JSON.parse(req.query.sort) : ["id", "ASC"];
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  try {
    const events = await eventService.getEvents(limit, offset, sort);
    res.header(
      "Content-Range",
      `events ${offset}-${offset + limit}/${events.count}`
    );
    res.header("Access-Control-Expose-Headers", "Content-Range");
    return res.json({
      data: events.rows,
      total: events.count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function createEvent(req, res) {
  try {
    const newEvent = await eventService.createEvent(req.body);
    if (newEvent) {
      return res.json({
        message: "Event created succesfully",
        data: newEvent,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function getEventById(req, res) {
  try {
    const event = await eventService.getEventById(req.params.eventId);
    return res.json({
      data: event,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function updateEventById(req, res) {
  try {
    const updated = await eventService.updateEventById(req.body);
    if (updated) {
      return res.status(200).json(updated);
    }
    return res.status(500).json({ message: "Something went wrong", data: {} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function deleteEventById(req, res) {
  try {
    const destroyed = await eventService.deleteEventById(req.params.eventId);
    if (destroyed) {
      return res.status(204).json({ message: "Event deleted!", data: {} });
    }
    return res.status(404).json({ message: "Event not found", data: {} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

//OTHER ROUTES - PARTICIPANTS
export async function addParticipant(req, res) {
  const event_id = req.params.eventId;
  const { user_id } = req.body;
  try {
    const newEventUser = await eventService.addParticipant(event_id, user_id);
    if (newEventUser) {
      return res.json({
        message: "User added to this Event succesfully",
        data: newEventUser,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function removeParticipant(req, res) {
  const event_id = req.params.eventId;
  const { user_id } = req.body;
  try {
    const deleted = await eventService.removeParticipant(event_id, user_id);
    if (deleted) {
      return res
        .status(204)
        .json({ message: "Participant removed from the event!", data: {} });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}
