import { Router } from "express";
import {
  createStateController,
  getStatesController,
  getStatesByUFController,
  updateStateController,
} from "../controllers/state.controller.js";

const stateRouter = Router();

stateRouter.post("/states", createStateController);
stateRouter.get("/states", getStatesController);
stateRouter.get("/states/:uf", getStatesByUFController);
stateRouter.put("/states/:id", updateStateController);

export default stateRouter;
