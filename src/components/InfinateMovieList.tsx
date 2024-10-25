"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { TMovie, TSearchParams } from "@/types/types";
import { getMovies } from "@/app/api/movies/movies";
import { Loader2 } from "lucide-react";
import MovieCard from "./Card/MovieCard";

interface InfiniteMovieListProps {
  initialMovies: TMovie[];
  searchParams: TSearchParams;
}

export default function InfiniteMovieList({
  initialMovies,
  searchParams,
}: InfiniteMovieListProps) {
  const [movies, setMovies] = useState<TMovie[]>(initialMovies);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView();

  const loadMoreMovies = useCallback(async () => {
    setIsLoading(true);
    const nextPage = page + 1;
    const newMovies = await getMovies({ ...searchParams, page: nextPage });
    setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    setPage(nextPage);
    setIsLoading(false);
  }, [page, searchParams]);

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView, loadMoreMovies]);

  return (
    <div className="container py-20 max-w-6xl mx-auto">
      <h1 className="text-xl lg:text-3xl mb-5 font-medium border-l-4 pl-2 border-yellow-500">
        Popular Movies
      </h1>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
      <div ref={ref} className="flex justify-center mt-8">
        {isLoading && <Loader2 className="animate-spin" />}
      </div>
    </div>
  );
}
