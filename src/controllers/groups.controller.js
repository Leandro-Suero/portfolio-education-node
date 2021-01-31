import * as groupService from "../services/groups.services";

export async function getGroups(req, res) {
  const sort = req.query.sort ? JSON.parse(req.query.sort) : ["id", "ASC"];
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  try {
    const groups = await groupService.getGroups(limit, offset, sort);
    res.header(
      "Content-Range",
      `groups ${offset}-${offset + limit}/${groups.count}`
    );
    res.header("Access-Control-Expose-Headers", "Content-Range");
    return res.json({
      data: groups.rows,
      total: groups.count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function createGroup(req, res) {
  try {
    const newGroup = await groupService.createGroup(req.body);
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
  try {
    const group = await groupService.getGroupById(req.params.groupId);
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
    const updated = await groupService.updateGroupById(req.body);
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
  try {
    const destroyed = await groupService.deleteGroupById(req.params.groupId);
    if (destroyed) {
      return res.status(204).json({ message: "Group deleted!", data: {} });
    }
    return res.status(404).json({ message: "Group not found", data: {} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

//OTHER ROUTES - PARTICIPANTS
export async function getParticipants(req, res) {
  try {
    const group = await groupService.getGroupParticipants(req.params.groupId);
    return res.json({
      data: group,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function getParticipantsWithRole(req, res) {
  const { groupId, groupRole } = req.params;
  try {
    const group = await groupService.getGroupParticipantsWithRole(
      groupId,
      groupRole
    );
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
  const { user_id, group_role } = req.body;
  try {
    const newGroupUser = await groupService.addParticipant(
      group_id,
      user_id,
      group_role
    );
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
    const deleted = await groupService.removeParticipant(group_id, user_id);
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
