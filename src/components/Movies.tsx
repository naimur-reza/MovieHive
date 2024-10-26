import { getMovies } from "@/app/api/movies/movies";

import { TSearchParams } from "@/types/types";
import InfiniteMovieList from "./InfinateMovieList";
import { Suspense } from "react";

const Movies = async ({ searchParams }: { searchParams: TSearchParams }) => {
  const movies = await getMovies(searchParams);

  return (
    <Suspense fallback={"loading..."}>
      <InfiniteMovieList initialMovies={movies} />
    </Suspense>
  );
};

export default Movies;
