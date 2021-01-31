import * as userService from "../services/users.services";

export const createUser = async (req, res) => {
  try {
    const savedUser = userService.createUser(req.body);
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
    const users = await userService.getUsers(limit, offset, sort);
    res.header(
      "Content-Range",
      `users ${offset}-${offset + limit}/${users.count}`
    );
    res.header("Access-Control-Expose-Headers", "Content-Range");
    return res.json({
      data: users.rows,
      total: users.count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    return res.json({
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
};

export async function deleteUserById(req, res) {
  try {
    const destroyed = await userService.deleteUserById(req.params.userId);
    if (destroyed) {
      return res.status(204).json();
    }
    return res.status(404).json({ message: "User not found", data: {} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}
