"use client";

import { useEffect, useState } from "react";
import { MovieCard } from "./Card/MovieCard";
import { TMovie } from "@/types/movieType";

const Movies = () => {
  const [movies, setMovies] = useState<TMovie[]>();

  const fetchMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    const data = await res.json();
    setMovies(data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  console.log(movies);

  return (
    <div className="container py-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {movies && movies.map((movie, key) => <MovieCard key={key} {...movie} />)}
    </div>
  );
};

export default Movies;
