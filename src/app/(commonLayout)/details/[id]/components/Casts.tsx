import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TCast } from "@/types/types";

import Image from "next/image";

const Casts = ({ casts }: { casts: TCast[] }) => {
  return (
    <div className="pt:5 lg:pt-10 text-xl font-semibold max-w-6xl mx-auto ">
      <h1 className="text-xl lg:text-2xl font-semibold ">Top Billed Cast</h1>

      <div className="grid  grid-cols-3 md:grid-cols-4 lg:grid-cols-6  gap-4 mt-4">
        {casts.slice(0, 6).map((cast) => (
          <TooltipProvider key={cast.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="border border-gray-300 dark:border-gray-700/50 p-2 rounded-lg">
                  <div className="border  rounded-lg border-gray-300 dark:border-gray-700/50 w-full ">
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                      alt={cast.name}
                      height={120}
                      width={100}
                      className="rounded-md shadow-md w-full h-full"
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium text-center ">
                    {cast.name}
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{cast.character}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default Casts;
