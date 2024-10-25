import { TMovie, TSearchParams } from "@/types/types";

export async function getMovies(searchParams: TSearchParams) {
  const { search } = searchParams;
  let res;

  if (search) {
    res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${search}`,
      { next: { revalidate: 3600 } } // Revalidate every hour
    );
  } else {
    res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      { next: { revalidate: 3600 } } // Revalidate every hour
    );
  }

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await res.json();
  return data.results as TMovie[];
}

export async function fetchMovieDetails(id: string) {
  const movie: TMovie = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).then((res) => res.json());
  return movie;
}

export async function fetchMovieCredits(id: string) {
  const credits = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).then((res) => res.json());
  return credits;
}
