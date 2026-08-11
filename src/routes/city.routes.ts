import { Router } from "express";
import {
  createCityController,
  deleteCityController,
  getCitiesController,
  getCityByIdController,
  updateCityController,
} from "../controllers/city.controller.js";

const cityRouter = Router();

cityRouter.post("/cities", createCityController);
cityRouter.get("/cities", getCitiesController);
cityRouter.get("/cities/:id", getCityByIdController);
cityRouter.put("/cities/:id", updateCityController);
cityRouter.delete("/cities/:id", deleteCityController);

export default cityRouter;
