import { Request, Response } from "express";
import {
  createState,
  getStates,
  getStateByUf,
  updateState,
} from "../services/state.service.js";

export async function createStateController(req: Request, res: Response) {
  try {
    const { name, uf } = req.body;

    const state = await createState(name, uf);

    return res.status(201).json(state);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: "Erro ao criar estado.",
    });
  }
}

export async function getStatesController(req: Request, res: Response) {
  try {
    const states = await getStates();

    return res.status(200).json(states);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: "Erro ao listar estados.",
    });
  }
}

export async function getStatesByUFController(req: Request, res: Response) {
  try {
    const { uf } = req.params;

    if (typeof uf !== "string") {
      return res.status(400).json({
        message: "UF inválida!",
      });
    }

    const state = await getStateByUf(uf);

    return res.status(200).json(state);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  return res.status(500).json({
    message: "Erro ao buscar estado.",
  });
}

export async function updateStateController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, uf } = req.body;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "ID inválido!",
      });
    }

    const stateId = Number(id);

    if (Number.isNaN(stateId)) {
      return res.status(400).json({
        message: "ID inválido!",
      });
    }

    const state = await updateState(stateId, name, uf);
    return res.status(200).json(state);
    
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  return res.status(500).json({
    message: "Erro ao atualizar estado.",
  });
}
