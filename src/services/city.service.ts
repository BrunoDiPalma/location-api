import prisma from "../config/prisma.js";

export async function createCity(name: string, stateId: number){
    if(!name || !stateId){
        throw new Error("Nome e estado são obrigatórios!")
    }

    const normalizedName = name.trim()

    const state = await prisma.state.findFirst({
        where: {
            id: stateId,
            deletedAt: null
        }
    })

    if(!state){
        throw new Error("Estado não encontrado.")
    }

    const existingCity = await prisma.city.findFirst({
        where: {
            name: normalizedName,
            stateId,
            deletedAt: null
        }
    })

    if(existingCity){
        throw new Error("Essa cidade já está cadastrada neste estado.")
    }

    return prisma.city.create({
        data: {
            name: normalizedName,
            stateId
        }
    })
}