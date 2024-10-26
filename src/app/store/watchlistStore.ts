import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TMovie } from "@/types/types";

interface WatchlistStore {
  watchlist: TMovie[];
  addToWatchlist: (movie: TMovie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      watchlist: [],
      addToWatchlist: (movie) =>
        set((state) => ({
          watchlist: state.watchlist.some((m) => m.id === movie.id)
            ? state.watchlist
            : [...state.watchlist, movie],
        })),
      removeFromWatchlist: (movieId) =>
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.id !== movieId),
        })),
      isInWatchlist: (movieId) => get().watchlist.some((m) => m.id === movieId),
    }),
    {
      name: "watchlist-storage",
    }
  )
);
