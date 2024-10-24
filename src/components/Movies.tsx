import MovieCard from "./Card/MovieCard";
import { TMovie } from "@/types/movieType";

async function getMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    { next: { revalidate: 3600 } } // Revalidate every hour
  );
  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await res.json();
  return data.results as TMovie[];
}

export default async function Movies() {
  const movies = await getMovies();

  return (
    <div className="container py-10 max-w-6xl mx-auto">
      <h1 className="text-xl lg:text-3xl mb-5 font-medium">Popular</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}
