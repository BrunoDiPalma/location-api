import { z } from "zod";

export const createStateSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório."),
  uf: z.string().trim().length(2, "A UF deve possuir exatamente 2 caracteres."),
});

export const updateStateSchema = createStateSchema;

export const stateIdSchema = z.object({
  id: z.coerce.number().int().positive("ID inválido."),
});

export const stateUfSchema = z.object({
  uf: z.string().trim().length(2, "UF inválida."),
});
