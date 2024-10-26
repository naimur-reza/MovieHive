"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { TMovie } from "@/types/types";
import { getMovies } from "@/app/api/movies/movies";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import MovieCard from "./Card/MovieCard";

interface InfiniteMovieListProps {
  initialMovies: TMovie[];
}

export default function InfiniteMovieList({
  initialMovies,
}: InfiniteMovieListProps) {
  const [movies, setMovies] = useState<TMovie[]>(initialMovies);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const loadMovies = useCallback(
    async (reset = false) => {
      setIsLoading(true);
      const newPage = reset ? 1 : page + 1;
      const newMovies = await getMovies({
        search: search || "",
        page: newPage,
      });
      setMovies((prevMovies) =>
        reset ? newMovies : [...prevMovies, ...newMovies]
      );
      setPage(newPage);
      setIsLoading(false);
    },
    [page, search]
  );

  useEffect(() => {
    loadMovies(true);
  }, [search]);

  useEffect(() => {
    if (inView) {
      loadMovies();
    }
  }, [inView, loadMovies]);

  return (
    <div className="container py-28 max-w-6xl mx-auto">
      <h1 className="text-xl lg:text-3xl mb-5 font-medium border-l-4 border-yellow-500 pl-2">
        {search ? `Search Results for "${search}"` : "Popular Movies"}
      </h1>
      {movies.length === 0 && !isLoading ? (
        <p>No movies found. Try a different search term.</p>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      )}
      <div ref={ref} className="flex justify-center mt-8">
        {isLoading && <Loader2 className="animate-spin" />}
      </div>
    </div>
  );
}
