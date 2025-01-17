"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Card } from "./ui/card";
import Image from "next/image";
import RatingBadge from "./RatingBadge";
import { format } from "date-fns";
import { MoviesResponse } from "@/lib/types";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

type Props = { initialMovies: MoviesResponse };

const MoviesList = ({ initialMovies }: Props) => {
  const [movies, setMovies] = useState(initialMovies || []);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/search?title=v`,
        {
          method: "GET",
        }
      );
      const data: MoviesResponse = await response.json();
      console.log(data);
      setMovies(data);
    } catch (err) {
      setError("Can't fetch movies. Try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isLoading && !error && movies.length > 0 && (
        <ScrollArea>
          <div className="mt-10 flex w-max space-x-8 pt-4">
            {movies!.map((movie) => {
              return (
                <Link href={`/movies/${movie.id}`} key={movie.title}>
                  <Card className="border-none pb-6 rounded-md relative shadow-lg hover:-translate-y-5 transition-transform hover:cursor-pointer">
                    <div>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_MOVIEDB_POSTER_BASE_URL}/${movie.posterUrl}`}
                        alt="poster image"
                        className="rounded-t-md h-fit"
                        width={185}
                        height={0}
                      />
                      <RatingBadge
                        className={"absolute -top-6 left-3/4"}
                        rating={movie.rating}
                      />
                    </div>
                    <div className="mt-4 mb-2 px-2 max-w-[185px]">
                      <p className="text-center text-lg font-semibold break-words whitespace-normal ">
                        {movie.title}
                      </p>

                      <p className="text-muted-foreground text-md text-center">
                        {format(movie.releaseDate, "do MMM, yyyy")}
                      </p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
          <div className="mt-10">
            <ScrollBar orientation="horizontal" />
          </div>
          <div className="absolute top-0 right-0 h-full w-4 ml-2 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
        </ScrollArea>
      )}
      {isLoading && (
        <div className="flex space-x-8 pt-4 space-y-2 justify-center w-full">
          {new Array(3).fill(0).map(() => {
            return (
              <div className="flex flex-col">
                <Skeleton className="h-[200px] w-[200px] rounded-xl" />
                <div className="space-y-2 mt-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {(error || !initialMovies) && movies.length <= 0 && !isLoading && (
        <div className="flex justify-center">
          <div className="bg-red-300 border-red-800 border flex rounded-xl p-4 flex-col mt-4 w-96">
            <Button onClick={fetchMovies}>Retry</Button>
            <p className="text-center text-lg font-semibold text-red-900 mt-2 ">
              Failed to fetch movies.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MoviesList;
