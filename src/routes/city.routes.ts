import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createCitySchema,
  updateCitySchema,
  cityIdSchema,
  searchCitySchema,
} from "../schemas/city.schema.js";
import {
  createCityController,
  deleteCityController,
  getCitiesController,
  getCityByIdController,
  updateCityController,
} from "../controllers/city.controller.js";

const cityRouter = Router();

cityRouter.post("/cities", validate(createCitySchema, "body"),createCityController);
cityRouter.get("/cities", validate(searchCitySchema, "query"), getCitiesController);
cityRouter.get("/cities/:id", validate(cityIdSchema, "params"), getCityByIdController);
cityRouter.put("/cities/:id", 
  validate(cityIdSchema, "params"),
  validate(updateCitySchema, "body"),
  updateCityController);
cityRouter.delete("/cities/:id", validate(cityIdSchema, "params"), deleteCityController);

export default cityRouter;
