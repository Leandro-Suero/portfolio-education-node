import Group from "../models/Group";
import User from "../models/User";
import GroupUser from "../models/GroupUser";

export async function getGroups(req, res) {
  try {
    const groups = await Group.findAll({
      include: {
        model: User,
        attributes: ["name", "id", "email", "role", "active"],
      },
    });
    return res.json({
      data: groups,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function createGroup(req, res) {
  console.log("create");
  const { name, description, active } = req.body;
  try {
    const newGroup = await Group.create(
      {
        name,
        description,
        active,
      },
      {
        fields: ["name", "description", "active"],
      }
    );
    if (newGroup) {
      return res.json({
        message: "Group created succesfully",
        data: newGroup,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function getGroupById(req, res) {
  const { groupId } = req.params;
  try {
    const group = await Group.findOne({
      where: { id: groupId },
      include: {
        model: User,
        attributes: ["name", "id", "email", "role", "active"],
      },
    });
    return res.json({
      data: group,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function updateGroupById(req, res) {
  try {
    const groupFound = await Group.findByPk(req.params.groupId);
    for (const prop in req.body) {
      groupFound[prop] = req.body[prop];
    }
    const updated = await groupFound.save();
    if (updated) {
      return res.status(200).json(updated);
    }
    return res.status(500).json({ message: "Something went wrong", data: {} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function deleteGroupById(req, res) {
  const { groupId } = req.params;
  try {
    const groupFound = await Group.findByPk(groupId);
    if (groupFound) {
      const destroyed = await groupFound.destroy();
      if (destroyed) {
        return res.status(204).json();
      }
    } else {
      return res.status(404).json({ message: "Group not found", data: {} });
    }
    return res.status(500).json({ message: "Something went wrong", data: {} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

//OTHER ROUTES - PARTICIPANTS
export async function getParticipants(req, res) {
  const group_id = req.params.groupId;
  try {
    const group = await Group.findOne({
      where: { id: group_id },
      include: {
        model: User,
        attributes: ["name", "id", "email", "role", "active"],
      },
    });
    return res.json({
      data: group,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function getParticipantsWithRole(req, res) {
  const group_id = req.params.groupId;
  const group_role = req.params.groupRole;
  try {
    const group = await Group.findOne({
      where: { id: group_id },
      include: {
        model: User,
        attributes: ["name", "id", "email", "role", "active"],
        through: {
          where: {
            group_role: group_role,
          },
        },
      },
    });
    return res.json({
      data: group,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function addParticipant(req, res) {
  const group_id = req.params.groupId;
  const { user_id } = req.body;
  const { group_role } = req.body;
  try {
    const newGroupUser = await GroupUser.create({
      group_id,
      user_id,
      group_role,
    });

    if (newGroupUser) {
      return res.json({
        message: "User added to this Group succesfully",
        data: newGroupUser,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function removeParticipant(req, res) {
  const group_id = req.params.groupId;
  const { user_id } = req.body;
  try {
    const deleted = await GroupUser.destroy({
      where: {
        group_id,
        user_id,
      },
    });

    if (deleted) {
      return res.status(204).json();
    } else {
      return res
        .status(500)
        .json({ message: "Something went wrong", data: {} });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}
