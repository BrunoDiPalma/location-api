import { Router } from "express";
import { createStateController } from "../controllers/state.controller.js";

const stateRouter = Router();

stateRouter.post("/states", createStateController);

export default stateRouter;
