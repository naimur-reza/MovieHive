import { create } from "zustand";

import { TMovie } from "@/types/types";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../actions/watchlist";

interface WatchlistStore {
  watchlist: TMovie[];
  fetchWatchlist: () => Promise<void>;
  addToWatchlist: (movie: TMovie) => Promise<void>;
  removeFromWatchlist: (movieId: number) => Promise<void>;
  isInWatchlist: (movieId: number) => boolean;
}

export const useWatchlistStore = create<WatchlistStore>()((set, get) => ({
  watchlist: [],

  fetchWatchlist: async () => {
    if (get().watchlist.length === 0) {
      const data = await getWatchlist();
      set({ watchlist: data });
    }
  },

  addToWatchlist: async (movie) => {
    const response = await addToWatchlist(movie);
    if (response.success) {
      set({ watchlist: response.watchlist });
    }
  },

  removeFromWatchlist: async (movieId) => {
    const response = await removeFromWatchlist(movieId);
    if (response.success) {
      set({ watchlist: response.watchlist });
    }
  },

  isInWatchlist: (movieId) => get().watchlist.some((m) => m.id === movieId),
}));
