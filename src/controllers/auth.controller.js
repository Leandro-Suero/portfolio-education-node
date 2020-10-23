import jwt from "jsonwebtoken";
import User from "../models/User";

export const login = async (req, res) => {
  try {
    const userFound = await User.scope("withPassword").findOne({
      where: { email: req.body.email },
    });
    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );
    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
