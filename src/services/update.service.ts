import { Repository } from "typeorm";
import {
  TmovieRequest,
  Tmovies,
  TmoviesResponse,
  Tupdate,
} from "../interfaces/movies";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { productSchema } from "../schemas/movies.schema";

const updateMoviesService = async (
  movieData: Tupdate,
  movieId: number
): Promise<TmovieRequest> => {
  const moviesRepository: Repository<Movie> =
    AppDataSource.getRepository(Movie);

  const oldMovieData: Movie | null = await moviesRepository.findOneBy({
    id: movieId,
  });

  const newMovieData: Movie = moviesRepository.create({
    ...oldMovieData,
    ...movieData,
  });

  await moviesRepository.save(newMovieData);

  const returnMovie: any = productSchema.parse(newMovieData);

  return returnMovie;
};
export { updateMoviesService };
