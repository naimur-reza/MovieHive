import { TMovie } from "@/types/types";

import Casts from "./components/Casts";
import MovieInfo from "./components/MovieInfo";
import Recommendations from "./components/Recommendations";

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

async function fetchMovieDetails(id: string) {
  const movie: TMovie = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).then((res) => res.json());
  return movie;
}

async function fetchMovieCredits(id: string) {
  const credits = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).then((res) => res.json());
  return credits;
}

export default async function Page({ params }: { params: { id: string } }) {
  const movie = await fetchMovieDetails(params.id);
  const credits = await fetchMovieCredits(params.id);

  console.log(movie);

  return (
    <div className=" my-10">
      <MovieInfo movie={movie} />
      <Casts casts={credits.cast} />
      <Recommendations movieId={params.id} />
    </div>
  );
}
