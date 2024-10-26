"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import clsx from "clsx";

const SearchMovie = () => {
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.push(`/?${params.toString()}`);
  }, 300);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      handleSearch(e.target.value);
    },
    [handleSearch]
  );

  return (
    <>
      <Search
        onClick={() => setShowSearch(!showSearch)}
        className={clsx(
          showSearch && "text-yellow-500",
          "h-5 w-5  cursor-pointer block md:hidden"
        )}
      />

      <div
        className={clsx(
          showSearch ? "absolute -bottom-10 z-20 left-0 w-full " : "hidden"
        )}
      >
        <div className="relative  block md:hidden">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={onChange}
            type="search"
            placeholder="Search movies"
            className="w-full sm:w-[300px] pl-8"
          />
        </div>
      </div>

      {/* for pc screens */}
      <div className="relative max-lg:hidden ">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchTerm}
          onChange={onChange}
          type="search"
          placeholder="Search movies"
          className="w-full sm:w-[300px] pl-8"
        />
      </div>
    </>
  );
};

export default SearchMovie;
