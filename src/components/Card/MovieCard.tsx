import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TMovie } from "@/types/movieType";
import Link from "next/link";

type TMovieCardProps = Pick<
  TMovie,
  "id" | "title" | "poster_path" | "vote_average" | "release_date" | "overview"
>;

const MovieCard = ({
  id,
  title,
  overview,
  poster_path,
  release_date,
  vote_average,
}: TMovieCardProps) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="p-0">
        <div className="relative aspect-[2/3] w-full">
          <Link href={`/details/${id}`}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              fill
              className="object-cover rounded-t-lg"
            />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-2 mt-2">
          {overview}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">
        <Badge variant="secondary">
          {new Date(release_date).getFullYear()}
        </Badge>
        <Badge variant="outline">⭐ {vote_average.toFixed(1)}</Badge>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
