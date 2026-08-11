import { Router } from "express";
import { createCityController } from "../controllers/city.controller.js";

const cityRouter = Router();

cityRouter.post("/cities", createCityController);

export default cityRouter;
