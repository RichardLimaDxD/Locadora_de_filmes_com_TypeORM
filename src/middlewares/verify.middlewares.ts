import { NextFunction, Request, Response } from "express";
import { Movie } from "../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const nameExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { name }: { name: string } = request.body;
  if (name === undefined) return next();

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie | null = await movieRepository.findOne({
    where: {
      name: name,
    },
  });

  if (movie?.name !== undefined) {
    throw new AppError("Movie already exists.", 409);
  }

  return next();
};

const idExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const id: number = parseInt(request.params.id);

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie | null = await movieRepository.findOne({
    where: {
      id: id,
    },
  });

  if (movie?.id === undefined) {
    throw new AppError("Movie not found", 404);
  }

  return next();
};

export { nameExistsMiddleware, idExistsMiddleware };
