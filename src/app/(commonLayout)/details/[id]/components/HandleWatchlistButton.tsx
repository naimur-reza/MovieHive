"use client";

import { useToast } from "@/hooks/use-toast";
import { useWatchlistStore } from "@/app/store/watchlistStore";
import { useEffect, useState } from "react";
import { TMovie } from "@/types/types";
import { Button } from "@/components/ui/button";

const HandleWatchlistButton = ({ movie }: { movie: TMovie }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } =
    useWatchlistStore();
  const [isInWatchlistState, setIsInWatchlistState] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsInWatchlistState(isInWatchlist(movie.id));
  }, [movie.id, isInWatchlist]);

  const handleWatchlistToggle = () => {
    if (isInWatchlistState) {
      removeFromWatchlist(movie.id);
      setIsInWatchlistState(false);
      toast({ title: "Removed from watchlist" });
    } else {
      addToWatchlist(movie);
      setIsInWatchlistState(true);
      toast({ title: "Added to watchlist" });
    }
  };

  return (
    <Button className="mb-5" onClick={handleWatchlistToggle}>
      {isInWatchlistState ? "Remove from Watchlist" : "Add to Watchlist"}
    </Button>
  );
};

export default HandleWatchlistButton;
