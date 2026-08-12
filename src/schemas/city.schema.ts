import { z } from "zod";

export const createCitySchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório."),
  stateId: z.coerce.number().int().positive("Estado é obrigatório."),
});

export const updateCitySchema = createCitySchema;

export const cityIdSchema = z.object({
  id: z.coerce.number().int().positive("ID inválido."),
});

export const searchCitySchema = z.object({
  uf: z.string().trim().length(2, "UF inválida.").optional(),
  name: z.string().trim().min(1).optional(),
});
