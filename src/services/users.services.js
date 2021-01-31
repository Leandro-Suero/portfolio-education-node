import User from "../models/User";

export const createUser = async ({
  name,
  email,
  password = null,
  rol,
  can_login = false,
  phone = null,
  active = true,
}) => {
  //if unique email can be tested before to give an acording message
  //in this case returning always a generic 500
  let hashedPassword = null;
  if (password !== null) {
    hashedPassword = await User.encryptPassword(password);
  }
  const savedUser = await User.create(
    {
      name,
      email,
      rol,
      can_login,
      password: hashedPassword,
      phone,
      active,
    },
    {
      fields: [
        "name",
        "email",
        "rol",
        "can_login",
        "password",
        "phone",
        "active",
      ],
    }
  );
  return savedUser;
};

export const getUsers = async (limit, offset, sort) => {
  return User.findAndCountAll({
    limit,
    offset,
    order: [sort],
  });
};

export const getUserById = async (userId) => {
  return User.findByPk(userId);
};

export async function deleteUserById(userId) {
  const userFound = await User.findByPk(userId);
  if (userFound) {
    const destroyed = await userFound.destroy();
    return destroyed;
  } else {
    return false;
  }
}
