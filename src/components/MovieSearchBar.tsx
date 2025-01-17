"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = { initialSearchQuery?: string };

const MovieSearchBar = ({ initialSearchQuery }: Props) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || "");
  const router = useRouter();
  const onSubmit = () => {
    if (!searchQuery) return;
    router.push(`/movies/search?q=${searchQuery}`, { scroll: true });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="mt-4 p-4 flex justify-center w-full items-center flex-col">
      <div className="flex justify-center items-center lg:w-3/4 w-full relative">
        <Input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          className="bg-white w-full h-10 pr-9"
          placeholder="Search for movies..."
        />
        <Button
          variant="ghost"
          onClick={onSubmit}
          className="absolute right-0.5"
        >
          <Search />
        </Button>
      </div>
    </div>
  );
};

export default MovieSearchBar;
