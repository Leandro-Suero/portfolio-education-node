import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import pkg from "../package.json";

import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/user.routes";
import invoicesRoutes from "./routes/invoices.routes";
import eventsRoutes from "./routes/events.routes";
import groupsRoutes from "./routes/groups.routes";

import { createAdmin } from "./libs/initialSetup";

const app = express();
createAdmin();

// Settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Welcome Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my API",
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
  });
});

// Routes
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/invoices", invoicesRoutes);
app.use("/events", eventsRoutes);
app.use("/groups", groupsRoutes);

export default app;
