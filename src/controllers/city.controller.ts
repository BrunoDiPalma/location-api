import { Request, Response } from "express";
import { createCity, getCities } from "../services/city.service.js";

export async function createCityController(req: Request, res: Response) {
  try {
    const { name, stateId } = req.body;

    const city = await createCity(name, stateId);

    return res.status(201).json(city);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  return res.status(500).json({
    message: "Erro ao criar cidade.",
  });
}

export async function getCitiesController(req: Request, res: Response) {
  try {
    const cities = await getCities();

    return res.status(200).json(cities);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({
        message: error.message,
      });
    }
  }

  return res.status(500).json({
    message: "Erro ao listar cidades."
  })
}
