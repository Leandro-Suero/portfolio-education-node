import Group from "../models/Group";
import User from "../models/User";
import GroupUser from "../models/GroupUser";

export async function getGroups(limit, offset, sort) {
  return Group.findAndCountAll({
    include: {
      model: User,
      attributes: ["name", "id", "email", "role", "active"],
    },
    limit,
    offset,
    order: [sort],
  });
}

export async function createGroup({ name, description, active }) {
  return Group.create(
    {
      name,
      description,
      active,
    },
    {
      fields: ["name", "description", "active"],
    }
  );
}

export async function getGroupById(groupId) {
  return Group.findOne({
    where: { id: groupId },
    include: {
      model: User,
      attributes: ["name", "id", "email", "role", "active"],
    },
  });
}

export async function updateGroupById({ ...groupNewData }) {
  const groupFound = await Group.findByPk(groupNewData.id);
  for (const prop in groupNewData) {
    groupFound[prop] = groupNewData[prop];
  }
  const updated = await groupFound.save();
  return updated;
}

export async function deleteGroupById(groupId) {
  const groupFound = await Group.findByPk(groupId);
  if (groupFound) {
    const destroyed = await groupFound.destroy();
    return destroyed;
  }
  return false;
}

//OTHER ROUTES - PARTICIPANTS
export async function getGroupParticipants(group_id) {
  return Group.findOne({
    where: { id: group_id },
    include: {
      model: User,
      attributes: ["name", "id", "email", "role", "active"],
    },
  });
}

export async function getGroupParticipantsWithRole(group_id, group_role) {
  return Group.findOne({
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
}

export async function addParticipant(group_id, user_id, group_role) {
  return GroupUser.create({
    group_id,
    user_id,
    group_role,
  });
}

export async function removeParticipant(group_id, user_id) {
  return GroupUser.destroy({
    where: {
      group_id,
      user_id,
    },
  });
}
