import { Router } from "express";
import { createStateController, getStatesController, getStatesByUFController } from "../controllers/state.controller.js";

const stateRouter = Router();

stateRouter.post("/states", createStateController);
stateRouter.get("/states", getStatesController)
stateRouter.get("/states/:uf", getStatesByUFController)

export default stateRouter;
