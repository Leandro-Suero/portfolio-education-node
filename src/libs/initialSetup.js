import User from "../models/User";

export const createAdmin = async () => {
  // check for an existing admin user
  const user = await User.findOne({ where: { email: "admin@admin" } });
  if (!user) {
    // create a new admin user
    try {
      const hashedPassword = await User.encryptPassword("admin");
      const savedUser = await User.create(
        {
          name: "admin",
          email: "admin@admin",
          role: "admin",
          can_login: true,
          password: hashedPassword,
          phone: null,
          active: true,
        },
        {
          fields: [
            "name",
            "email",
            "role",
            "can_login",
            "password",
            "phone",
            "active",
          ],
        }
      );
      if (savedUser) {
        console.log("Admin User Created!");
      }
    } catch (error) {
      console.log("Error on Admin User creation");
      console.error(error);
    }
  }
};
