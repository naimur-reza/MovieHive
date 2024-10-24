import { TMovie } from "@/types/types";
import Image from "next/image";
import { Star, Calendar, Clock, Users, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Casts from "./components/Casts";

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
      <div className="relative  ">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={`${movie.title} backdrop`}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/70" />
        </div>
        <div className="relative container py-8 md:py-12 lg:py-20 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <div className="relative lg:w-[80%] w-full lg:h-96 h-[500px] border rounded-lg border-gray-700/60">
                <Image
                  src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="rounded-lg shadow-lg w-full"
                  priority
                />
              </div>
            </div>
            <div className="lg:w-2/3">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-6 ">
                <div className="font-medium text-yellow-500 flex items-center gap-1">
                  IMDB_
                  {movie.vote_average.toFixed(1)}
                  <Star className="ml-1 w-4 h-4 fill-current" />
                </div>

                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {movie.release_date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {movie.runtime} min
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {movie.vote_count} votes
                </span>
              </div>
              <p className="text-lg mb-6 leading-relaxed text-opacity-80">
                {movie.overview}
              </p>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <Badge key={genre.id} variant="outline">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Casts casts={credits.cast} />
    </div>
  );
}
