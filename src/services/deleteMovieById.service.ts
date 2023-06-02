import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { TmovieRequest, Tupdate } from "../interfaces/movies";

const deleteMovieByIdService = async (
  movieId: number
): Promise<TmovieRequest> => {
  const moviesRepository: Repository<Movie> =
    AppDataSource.getRepository(Movie);

  const oldMovieData: Movie | any = await moviesRepository.findOneBy({
    id: movieId,
  });

  const returnDelte: any = await moviesRepository.remove(oldMovieData);

  return returnDelte;
};
export { deleteMovieByIdService };
