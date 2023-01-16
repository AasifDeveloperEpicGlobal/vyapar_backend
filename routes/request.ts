import { Router } from "express";
import { createRequestDemo, deleteRequestDemo, getAllRequestDemo, getRequestDemo, updateRequestDemo } from "../controllers/request-controller";

const routes = Router();

routes.post("/create", createRequestDemo);
routes.delete("/delete/:id", deleteRequestDemo);
routes.get("/:id", getRequestDemo);
routes.get("/", getAllRequestDemo);
routes.put("/update/:id", updateRequestDemo);
export default routes;