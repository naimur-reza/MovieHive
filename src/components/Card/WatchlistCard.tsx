"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TMovie } from "@/types/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useWatchlistStore } from "@/app/store/watchlistStore";
import { Star } from "lucide-react";

type TMovieCardProps = Pick<
  TMovie,
  "id" | "title" | "poster_path" | "vote_average" | "release_date" | "overview"
>;

const WatchlistCard = ({
  id,
  title,
  poster_path,
  release_date,
  vote_average,
  overview,
}: TMovieCardProps) => {
  const { removeFromWatchlist } = useWatchlistStore();

  const handleRemove = async () => {
    removeFromWatchlist(id);
  };

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-[2/3] w-full">
          <Link href={`/details/${id}`}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </Link>
          <div className="    px-2 py-1 rounded-full text-sm font-semibold flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-400" />
            {vote_average.toFixed(1)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-semibold line-clamp-1 flex-1 mr-2">
            {title}
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            {new Date(release_date).getFullYear()}
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {overview}
        </p>
        <div className="flex justify-between items-center">
          <Link href={`/details/${id}`} className="hidden md:block">
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
          <Button onClick={handleRemove} variant="destructive" size="sm">
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WatchlistCard;
