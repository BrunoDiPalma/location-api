import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createStateSchema,
  updateStateSchema,
  stateIdSchema,
  stateUfSchema,
} from "../schemas/state.schema.js";
import {
  createStateController,
  getStatesController,
  getStatesByUFController,
  updateStateController,
  deleteStateController,
} from "../controllers/state.controller.js";

const stateRouter = Router();
stateRouter.post("/states", validate(createStateSchema, "body"), createStateController);
stateRouter.get("/states", getStatesController);
stateRouter.get("/states/:uf", validate(stateUfSchema, "params"), getStatesByUFController);
stateRouter.put("/states/:id",
  validate(stateIdSchema, "params"),
  validate(updateStateSchema, "body"),
   updateStateController);
stateRouter.delete("/states/:id", validate(stateIdSchema, "params"), deleteStateController);

export default stateRouter;