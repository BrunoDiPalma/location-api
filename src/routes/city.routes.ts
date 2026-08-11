import { Router } from "express";
import {
  createCityController,
  getCitiesController,
  getCityByIdController,
} from "../controllers/city.controller.js";

const cityRouter = Router();

cityRouter.post("/cities", createCityController);
cityRouter.get("/cities", getCitiesController);
cityRouter.get("/cities/:id", getCityByIdController);

export default cityRouter;
