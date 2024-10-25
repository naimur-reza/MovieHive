import { getMovies } from "@/app/api/movies/movies";
import MovieCard from "./Card/MovieCard";
import { TSearchParams } from "@/types/types";

const Movies = async ({ searchParams }: { searchParams: TSearchParams }) => {
  const movies = await getMovies(searchParams);

  return (
    <div className="container py-20 max-w-6xl mx-auto">
      <h1 className="text-xl lg:text-3xl mb-5 font-medium">Popular</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
