import prisma from "../config/prisma.js";

export async function createState(name: string, uf: string) {
  if (!name || !uf) {
    throw new Error("Nome e UF são obrigatórios!");
  }

  const normalizedName = name.trim();
  const normalizedUf = uf.trim().toUpperCase();

  if (normalizedUf.length !== 2) {
    throw new Error("A UF deve possuir exatamente 2 caracteres");
  }

  const existingState = await prisma.state.findFirst({
    where: {
      OR: [{ uf: normalizedUf }, { name: normalizedName }],
      deletedAt: null,
    },
  });

  if (existingState) {
    if (existingState.uf === normalizedUf) {
      throw new Error("Já existe um estado com essa UF.");
    }

    throw new Error("Já existe um estado com esse nome.");
  }

  return prisma.state.create({
    data: {
      name: normalizedName,
      uf: normalizedUf,
    },
  });
}

export async function getStates() {
  return prisma.state.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function getStateByUf(uf: string) {
  const normalizedUf = uf.trim().toUpperCase();

  const state = await prisma.state.findFirst({
    where: {
      uf: normalizedUf,
      deletedAt: null,
    },
  });

  if (!state) {
    throw new Error("Estado não encontrado.");
  }

  return state;
}
