import { Request, Response } from "express";
import { createMoviesService } from "../services/createMovies.service";
import { Tmovies, Tupdate } from "../interfaces/movies";
import { Movie } from "../entities";
import { listAllMoviesService } from "../services/listAllMovies.service";
import { updateMoviesService } from "../services/update.service";
import { json } from "stream/consumers";
import { deleteMovieByIdService } from "../services/deleteMovieById.service";

const createMoviesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieData: Tmovies = request.body;

  const newMovie: Movie = await createMoviesService(movieData);

  return response.status(201).json(newMovie);
};

const listAllMoviesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const page: number | undefined = Number(request.query.page);

  const perPage: number | undefined = Number(request.query.perPage);

  const movie = await listAllMoviesService(request.query);

  return response.json(movie);
};

const updateMoviesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieData: Tupdate = request.body;
  const movieId: number = parseInt(request.params.id);

  const newMovieData = await updateMoviesService(movieData, movieId);

  return response.status(200).json(newMovieData);
};

const deleteMovieByIdController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieId: number = parseInt(request.params.id);

  await deleteMovieByIdService(movieId);

  return response.status(204).send();
};

export {
  createMoviesController,
  listAllMoviesController,
  updateMoviesController,
  deleteMovieByIdController,
};
