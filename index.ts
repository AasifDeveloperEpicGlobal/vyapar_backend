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
import saleRoutes from "./routes/sale";
import purchaseRoutes from "./routes/purchase";
import requestRoutes from "./routes/request";
import reviewsRoutes from "./routes/review";
import { isUser } from "./middlewares/utils";
import saleCounter from "./models/saleCounters";
import purchaseCounter from "./models/purchaseCounters";

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

// invoice number for sale
app.get("/api/sale-invoice", async function (req, res) {
  try {
    const getSaleInvoice = await saleCounter.find();
    res.status(200).send({ success: true, data: getSaleInvoice });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
});

// Signup and login routes
app.use("/api/auth", authRoutes);
app.use("/api/parties", isUser, partyRoutes);
app.use("/api/state", stateRoutes);
app.use("/api/accessories", isUser, accessoriesItem);
app.use("/api/unit", unitRoutes);
app.use("/api/hsn", hsnRoutes);
app.use("/api/sale", isUser, saleRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/reviews", reviewsRoutes);

// app.use("/api/beds", testRoutes);

// invoice number for purchase
app.get("/api/purchase-invoice", async function (req, res) {
  try {
    const getPurchaseInvoice = await purchaseCounter.find();
    res.status(200).send({ success: true, data: getPurchaseInvoice });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
});
