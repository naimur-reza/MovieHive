import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TMovie } from "@/types/types";
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
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="p-0">
        <div className="rounded-t-lg  w-full overflow-hidden relative aspect-[1/1.5] lg:aspect-[2/2.7]">
          <Link href={`/details/${id}`}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              height={500}
              width={500}
              sizes="100vw, 100vh"
              className="object-cover rounded-t-lg hover:scale-105 transition-transform duration-300 h-full w-full"
            />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-2 lg:p-4">
        <div className="text-xs lg:text-sm flex items-center justify-between font-normal mb-2 lg:mb-3">
          {new Date(release_date).getFullYear()}

          <div className="flex items-center">⭐ {vote_average.toFixed(1)}</div>
        </div>
        <CardTitle className="text-xs  font-normal lg:font-medium md:text-[15px] line-clamp-1 ">
          {title}
        </CardTitle>

        <CardDescription className="line-clamp-2 mt-2 max-lg:hidden text-sm">
          {overview}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
