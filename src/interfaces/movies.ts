import { z } from "zod";
import {
  moviesCreateSchema,
  moviesSchemaResponse,
  updateSchema,
} from "../schemas/movies.schema";
import { Movie } from "../entities";
import { DeepPartial } from "typeorm";

type Tmovies = {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
};

type TmovieRequest = z.infer<typeof moviesCreateSchema>;

interface ImovieResult {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: Array<Movie>;
}

type TmoviesResponse = z.infer<typeof moviesSchemaResponse>;

type Tupdate = DeepPartial<Tmovies>;

export { Tmovies, TmovieRequest, TmoviesResponse, ImovieResult, Tupdate };
