"use client";
import { Separator } from "@/components/ui/separator";
import WatchlistCard from "@/components/Card/WatchlistCard";
import { useWatchlistStore } from "@/app/store/watchlistStore";

export default function WatchlistPage() {
  const { watchlist } = useWatchlistStore();

  console.log(watchlist);

  return (
    <div className="container mx-auto px-4 py-20 text-center space-y-3">
      <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>
      <Separator />
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <WatchlistCard key={movie.id} {...movie} />
          ))}
        </div>
      )}
    </div>
  );
}
