"use server";

import { TMovie } from "@/types/types";

let watchlist: TMovie[] = [];

export async function addToWatchlist(movie: TMovie) {
  const exists = watchlist.some((m) => m.id === movie.id);
  if (!exists) {
    watchlist.push(movie);
  }
  return { success: true, message: "Movie added to watchlist", watchlist };
}

export async function removeFromWatchlist(movieId: number) {
  watchlist = watchlist.filter((m) => m.id !== movieId);
  return { success: true, message: "Movie removed from watchlist", watchlist };
}

export async function getWatchlist() {
  return watchlist;
}
