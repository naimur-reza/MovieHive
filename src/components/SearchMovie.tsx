"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

const SearchMovie = () => {
  const router = useRouter();

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const params = new URLSearchParams();
          if (e.target.value) {
            params.append("search", e.target.value);
          }

          const query = params.size ? "?" + params.toString() : "";
          router.push("/" + query);
        }}
        type="search"
        placeholder="Search"
        className="w-[200px] sm:w-[300px] pl-8"
      />
    </div>
  );
};

export default SearchMovie;
