import { Request, Response } from "express";
import {
  createCity,
  getCities,
  getCityById,
  searchCities,
} from "../services/city.service.js";

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
    const { uf, name } = req.query;

    const normalizedUf = typeof uf === "string" ? uf : undefined;

    const normalizedName = typeof name === "string" ? name : undefined;

    if (normalizedUf || normalizedName) {
      const cities = await searchCities(normalizedUf, normalizedName);

      return res.status(200).json(cities);
    }

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
    message: "Erro ao listar cidades.",
  });
}

export async function getCityByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "ID inválido!",
      });
    }

    const cityId = Number(id);

    if (Number.isNaN(cityId)) {
      return res.status(400).json({
        message: "ID inválido!",
      });
    }

    const city = await getCityById(cityId);

    return res.status(200).json(city);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  return res.status(500).json({
    message: "Erro ao buscar cidade.",
  });
}
