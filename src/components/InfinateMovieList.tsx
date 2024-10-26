"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { TMovie } from "@/types/types";
import { getMovies } from "@/app/api/movies/movies";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import MovieCard from "./Card/MovieCard";

interface InfiniteMovieListProps {
  initialMovies: TMovie[];
}

const LoadingIndicator = () => (
  <div className="flex justify-center mt-8">
    <Loader2 className="animate-spin" />
  </div>
);

export default function InfiniteMovieList({
  initialMovies,
}: InfiniteMovieListProps) {
  const [movies, setMovies] = useState<TMovie[]>(initialMovies);
  const pageRef = useRef(1);
  const [isLoading, setIsLoading] = useState(false);
  const isFetchingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const [ref, inView] = useInView();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const loadMovies = useCallback(
    async (reset = false) => {
      if (isFetchingRef.current || !hasMoreRef.current) return;
      isFetchingRef.current = true;
      setIsLoading(true);
      const newPage = reset ? 1 : pageRef.current + 1;
      try {
        const newMovies = await getMovies({
          search: search || "",
          page: newPage,
        });
        if (newMovies.length === 0) {
          hasMoreRef.current = false;
        } else {
          setMovies((prevMovies) =>
            reset ? newMovies : [...prevMovies, ...newMovies]
          );
          pageRef.current = newPage;
        }
      } catch (error) {
        console.error("Failed to load movies:", error);
      } finally {
        setIsLoading(false);
        isFetchingRef.current = false;
      }
    },
    [search]
  );

  useEffect(() => {
    hasMoreRef.current = true;
    loadMovies(true);
  }, [search, loadMovies]);

  useEffect(() => {
    if (inView && !isFetchingRef.current && hasMoreRef.current) {
      loadMovies();
    }
  }, [inView, loadMovies]);

  const memoizedMovieCards = useMemo(
    () => movies.map((movie) => <MovieCard key={movie.id} {...movie} />),
    [movies]
  );

  return (
    <div className="container py-28 max-w-6xl mx-auto">
      <h1 className="text-xl lg:text-3xl mb-5 font-medium border-l-4 border-yellow-500 pl-2">
        {search ? `Search Results for "${search}"` : "Popular Movies"}
      </h1>
      {movies.length === 0 && !isLoading ? (
        <p>No movies found. Try a different search term.</p>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {memoizedMovieCards}
        </div>
      )}
      {isLoading && <LoadingIndicator />}
      <div ref={ref} />
    </div>
  );
}
