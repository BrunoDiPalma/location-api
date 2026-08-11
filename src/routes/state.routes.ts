import { Router } from "express";
import { createStateController, getStatesController } from "../controllers/state.controller.js";

const stateRouter = Router();

stateRouter.post("/states", createStateController);
stateRouter.get("/states", getStatesController)

export default stateRouter;
