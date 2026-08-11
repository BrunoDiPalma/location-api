import prisma from "../config/prisma.js";

export async function createCity(name: string, stateId: number) {
  if (!name || !stateId) {
    throw new Error("Nome e estado são obrigatórios!");
  }

  const normalizedName = name.trim();

  const state = await prisma.state.findFirst({
    where: {
      id: stateId,
      deletedAt: null,
    },
  });

  if (!state) {
    throw new Error("Estado não encontrado.");
  }

  const existingCity = await prisma.city.findFirst({
    where: {
      name: { equals: normalizedName, mode: "insensitive" },
      stateId,
      deletedAt: null,
    },
  });

  if (existingCity) {
    throw new Error("Essa cidade já está cadastrada neste estado.");
  }

  return prisma.city.create({
    data: {
      name: normalizedName,
      stateId,
    },
  });
}

export async function getCities() {
  return prisma.city.findMany({
    where: {
      deletedAt: null,
    },
    include: {
      state: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function getCityById(id: number) {
  const city = await prisma.city.findUnique({
    where: {
      id,
      deletedAt: null,
    },
    include: {
      state: true,
    },
  });

  if (!city) {
    throw new Error("Cidade não encontrada.");
  }

  return city;
}

export async function searchCities(uf?: string, name?: string) {
  const normalizedUf = uf?.trim().toUpperCase();
  const normalizedName = name?.trim();

  if (normalizedUf && normalizedUf.length !== 2) {
    throw new Error("A UF deve possuir exatamente 2 caracteres.");
  }

  return prisma.city.findMany({
    where: {
      deletedAt: null,

      ...(normalizedName && {
        name: {
          contains: normalizedName,
          mode: "insensitive",
        },
      }),

      ...(normalizedUf && {
        state: {
          uf: normalizedUf,
          deletedAt: null,
        },
      }),
    },

    include: {
      state: true,
    },

    orderBy: {
      name: "asc",
    },
  });
}

export async function updateCity(id: number, name: string, stateId: number) {
  if (!name || !stateId) {
    throw new Error("Nome e Estado são obrigatórios!");
  }

  const normalizedName = name.trim();

  const city = await prisma.city.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  });

  if (!city) {
    throw new Error("Cidade não encontrada");
  }

  const state = await prisma.state.findUnique({
    where: {
      id: stateId,
      deletedAt: null,
    },
  });

  if (!state) {
    throw new Error("Estado não encontrado");
  }

  const existingCity = await prisma.city.findFirst({
    where: {
      name: { equals: normalizedName, mode: "insensitive" },
      stateId,
      deletedAt: null,
      NOT: {
        id,
      },
    },
  });

  if (existingCity) {
    throw new Error("Já existe uma cidade com esse nome neste estado.");
  }

  return prisma.city.update({
    where: {
      id,
    },
    data: {
      name: normalizedName,
      stateId,
    },
  });
}

export async function deleteCity(id: number) {
  const city = await prisma.city.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });

  if (!city) {
    throw new Error("Cidade não encontrada");
  }

  return prisma.city.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}
