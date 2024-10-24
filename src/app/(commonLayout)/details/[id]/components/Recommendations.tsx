import MovieCard from "@/components/Card/MovieCard";
import { TMovie } from "@/types/types";

const Recommendations = async ({ movieId }: { movieId: string }) => {
  const recommendations = (await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=3d4b1c5869824140b9cf8cd1ba643fb6`
  ).then((res) => res.json().then((data) => data.results))) as TMovie[];

  return (
    <div className=" container py-20 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-5"> More like this </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {recommendations.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
