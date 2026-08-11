import { Router } from "express";
import {
  createCityController,
  getCitiesController,
} from "../controllers/city.controller.js";

const cityRouter = Router();

cityRouter.post("/cities", createCityController);
cityRouter.get("/cities", getCitiesController);

export default cityRouter;
