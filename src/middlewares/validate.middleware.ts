import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

type Source = "body" | "params" | "query";

export function validate(schema: ZodType, source: Source = "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return res.status(400).json({
        message: "Dados inválidos.",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    next();
  };
}