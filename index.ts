import "dotenv/config";
import express, { Express } from "express";
import { createServer } from "http";
import cors from "cors";
import { databaseConnect } from "./config/database";
const mongoose = require("mongoose");
import authRoutes from "./routes/auth";
import partyRoutes from "./routes/parties";
import { stateData } from "./state";
// const Country = require("country-state-city").Country;
// const State = require("country-state-city").State;
// const City = require("country-state-city").City;

mongoose.set("strictQuery", false);
// console.log(stateData);

// INITIALIZING EXPREESS
const app: Express = express();
const server = createServer(app);
const port = process.env.PORT;
app.use(cors())
databaseConnect();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// PORT LISTEN
server.listen(port, () => {
  console.log(`Server Runnig http://localhost:${port}`);
});

// MIDDLEWARES
// app.disable("x-powered-by");
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: process.env.ALLOWED_DOMAINS?.split(" "),
//     optionsSuccessStatus: 200,
//   })
// );

//ROUTES
app.get("/", (req, res) => {
  res.status(200).json({ name: "Api Worked Fine" });
});
app.get("/api", (req, res) => {
  res.status(200).json({ name: "Hello World! 2" });
});

// Signup and login routes
app.use("/api/auth", authRoutes);
app.use("/api/parties", partyRoutes);

// app.use("/api/beds", testRoutes);
