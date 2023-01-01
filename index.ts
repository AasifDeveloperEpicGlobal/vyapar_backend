import "dotenv/config";
import express, { Express } from "express";
import { createServer } from "http";
import cors from "cors";
import { databaseConnect } from "./config/database";
const mongoose = require("mongoose");
import authRoutes from "./routes/auth";
import partyRoutes from "./routes/parties";
import stateRoutes from "./routes/state";
import accessoriesItem from "./routes/accessoriesItem";
import unitRoutes from "./routes/unit";
import hsnRoutes from "./routes/hsn";

mongoose.set("strictQuery", false);

// INITIALIZING EXPREESS
const app: Express = express();
const server = createServer(app);
const port = process.env.PORT;
app.use(cors());
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
app.use("/api/state", stateRoutes);
app.use("/api/accessories", accessoriesItem);
app.use("/api/unit", unitRoutes);
app.use("/api/hsn", hsnRoutes);

// app.use("/api/beds", testRoutes);
