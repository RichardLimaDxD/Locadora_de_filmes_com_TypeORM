import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Tmovies } from "../interfaces/movies";
import { Movie } from "../entities";

const createMoviesService = async (movieData: Tmovies): Promise<Movie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepository.create(movieData);

  await movieRepository.save(movie);

  return movie;
};
export { createMoviesService };
