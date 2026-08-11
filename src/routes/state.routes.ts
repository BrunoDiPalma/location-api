import { Router } from "express";
import {
  createStateController,
  getStatesController,
  getStatesByUFController,
  updateStateController,
  deleteStateController,
} from "../controllers/state.controller.js";

const stateRouter = Router();

stateRouter.post("/states", createStateController);
stateRouter.get("/states", getStatesController);
stateRouter.get("/states/:uf", getStatesByUFController);
stateRouter.put("/states/:id", updateStateController);
stateRouter.delete("/states/:id", deleteStateController);

export default stateRouter;
