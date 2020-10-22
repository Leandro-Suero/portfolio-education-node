import Event from "../models/Event";

export async function getEvents(req, res) {
  try {
    const events = await Event.findAll();
    return res.json({
      data: events,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function createEvent(req, res) {
  const { title, description, place, start_time } = req.body;
  try {
    const newEvent = await Event.create(
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
  const { eventId } = req.params;
  try {
    const event = await Event.findByPk(eventId);
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
    const eventFound = await Event.findByPk(req.params.eventId);
    for (const prop in req.body) {
      eventFound[prop] = req.body[prop];
    }
    const updated = await eventFound.save();
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
  const { eventId } = req.params;
  try {
    const eventFound = await Event.findByPk(eventId);
    if (eventFound) {
      const destroyed = await eventFound.destroy();
      if (destroyed) {
        return res.status(204).json();
      }
    } else {
      return res.status(404).json({ message: "Event not found", data: {} });
    }
    return res.status(500).json({ message: "Something went wrong", data: {} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}