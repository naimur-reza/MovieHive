import { TMovie } from "@/types/types";
import MovieInfo from "./components/MovieInfo";
import Recommendations from "./components/Recommendations";
import { fetchMovieCredits, fetchMovieDetails } from "@/app/api/movies/movies";
import { Suspense } from "react";
import Loading from "./loading";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const movies: TMovie[] = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).then((res) => res.json().then((data) => data.results));
  return movies.map((movie) => ({
    id: String(movie.id),
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const movie = await fetchMovieDetails(params.id);
  const credits = await fetchMovieCredits(params.id);

  return (
    <Suspense fallback={<Loading />}>
      <div className=" my-10">
        <MovieInfo movie={movie} casts={credits.cast} />
        <Recommendations movieId={params.id} />
      </div>
    </Suspense>
  );
}
