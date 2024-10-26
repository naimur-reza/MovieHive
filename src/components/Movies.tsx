import { getMovies } from "@/app/api/movies/movies";

import { TSearchParams } from "@/types/types";
import InfiniteMovieList from "./InfinateMovieList";

const Movies = async ({ searchParams }: { searchParams: TSearchParams }) => {
  const movies = await getMovies(searchParams);

  return <InfiniteMovieList initialMovies={movies} />;
};

export default Movies;
