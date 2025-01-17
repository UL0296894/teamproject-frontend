import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MovieSearchBar from "@/components/MovieSearchBar";
import PopularMoviesList from "@/components/PopularMoviesList";
import RatingBadge from "@/components/RatingBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MoviesResponse } from "@/lib/types";
import { format } from "date-fns";
import { Search } from "lucide-react";
import Image from "next/image";

const getPopularMovies = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies`,
    {
      method: "GET",
    }
  );
  const data: MoviesResponse = await response.json();
  return data;
};

export default async function Home() {
  let popularMovies;
  try {
    popularMovies = await getPopularMovies();
  } catch (error) {}
  return (
    <div>
      <section className="bg-slate-100">
        <MaxWidthWrapper className="py-10">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto text-center flex flex-col items-start justify-center lg:items-center">
              <h1 className="w-fit tracking-tight text-balance font-bold !leading-snug text-gray-900 text-5xl md:text-6xl lg:text-7xl ">
                Explore, review, and share your love for movies on{" "}
                <span className="bg-primary text-white">MovieReviews</span>.
              </h1>
              <MovieSearchBar />
              <p className="text-lg font-semibold text-gray-700 md:text-xl  text-center mt-4">
                Search among thousands of movies and discover reviews, ratings,
                and hidden gems.
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-slate-50">
        <MaxWidthWrapper className="py-10">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto text-center flex flex-col items-center justify-center lg:items-start">
              <h3 className="text-2xl uppercase font-bold">Popular movies</h3>
            </div>
            <PopularMoviesList initialMovies={popularMovies!} />
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
