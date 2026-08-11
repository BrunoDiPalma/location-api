import { Request, Response } from "express"
import { createCity } from "../services/city.service.js"

export async function createCityController(req: Request, res: Response){
    try {
        const { name, stateId } = req.body

        const city = await createCity(name, stateId)

        return res.status(201).json(city)
        
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                message: error.message
            })
        }
    }

    return res.status(500).json({
        message: "Erro ao criar cidade."
    })
}