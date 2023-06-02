import z from "zod";
import { AppError } from "../error";

const productSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().max(50),
  description: z.string().nullish(),
  duration: z.number().positive().int(),
  price: z.number().positive().int(),
});

const moviesCreateSchema = productSchema.omit({ id: true });

const moviesSchemaResponse = z.array(moviesCreateSchema);

const updateSchema = moviesCreateSchema.partial();

export {
  productSchema,
  moviesCreateSchema,
  moviesSchemaResponse,
  updateSchema,
};
