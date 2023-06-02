import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { ImovieResult } from "../interfaces/movies";

const listAllMoviesService = async (query: any): Promise<ImovieResult> => {
  const moviesRepository: Repository<Movie> =
    AppDataSource.getRepository(Movie);

  const count: number = await moviesRepository.count();

  Number(query.perPage!) > 0 && Number(query.perPage!) <= 5
    ? (query.perPage = Number(query.perPage))
    : (query.perPage = 5);

  query.page! > 0 ? (query.page = query.page) : (query.page = 1);

  if (query.sort === undefined || !query.order) {
    query.order = "asc";
  }

  if (query.sort === undefined) {
    query.sort = "id";
  }

  let movies: Movie[] | undefined = await moviesRepository.find();

  movies = await moviesRepository.find({
    skip: (query.page - 1) * query.perPage,
    take: query.perPage,
    order: { [query.sort]: query.order },
  });

  let previwPage: string | null =
    query.page <= 1
      ? null
      : `http://localhost:3000/movies?page=${Number(query.page) - 1}&perPage=${
          query.perPage
        }`;

  let NextPage: string | null =
    count <= query.perPage * query.page
      ? null
      : `http://localhost:3000/movies?page=${Number(query.page) + 1}&perPage=${
          query.perPage
        }`;

  return {
    prevPage: previwPage,
    nextPage: NextPage,
    count: count,
    data: movies,
  };
};
export { listAllMoviesService };
