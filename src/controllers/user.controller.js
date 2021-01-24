import User from "../models/User";

export const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password = null,
      rol,
      can_login = false,
      phone = null,
      active = true,
    } = req.body;
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
    if (savedUser) {
      return res.json({
        message: "User created succesfully",
        data: savedUser,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
};

export const getUsers = async (req, res) => {
  const sort = req.query.sort ? JSON.parse(req.query.sort) : ["id", "ASC"];
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  try {
    const users = await User.findAndCountAll({
      limit,
      offset,
      order: [sort],
    });
    res.header(
      "Content-Range",
      `users ${offset}-${offset + limit}/${users.count}`
    );
    res.header("Access-Control-Expose-Headers", "Content-Range");
    return res.json({
      data: users.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    return res.json({
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
};

export async function deleteUserById(req, res) {
  const { userId } = req.params;
  try {
    const userFound = await User.findByPk(userId);
    if (userFound) {
      const destroyed = await userFound.destroy();
      if (destroyed) {
        return res.status(204).json();
      }
    } else {
      return res.status(404).json({ message: "User not found", data: {} });
    }
    return res.status(500).json({ message: "Something went wrong", data: {} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}
