import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import RatingBadge from "@/components/RatingBadge";
import ReviewButton from "@/components/ReviewButton";
import ReviewsList from "@/components/ReviewsList";
import { buttonVariants } from "@/components/ui/button";
import { isAuth } from "@/lib/auth";
import { MovieDetailsResponse, ReviewsResponse } from "@/lib/types";
import axios from "axios";
import { format } from "date-fns";
import { Lock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    movieId: string;
  };
};

const getMovieDetails = async (movieId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/${movieId}`,
    {
      method: "GET",
    }
  );
  const data: MovieDetailsResponse = await response.json();
  return data;
};

export const getReviews = async (movieId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/movies/${movieId}`,
    {
      method: "GET",
    }
  );
  const data: ReviewsResponse = await response.json();
  return data;
};
const MovieDetailsPage = async ({ params }: Props) => {
  const { movieId } = await params;
  if (!movieId) {
    return redirect("/");
  }
  const reviews = await getReviews(movieId);
  let movieDetails;
  try {
    movieDetails = await getMovieDetails(movieId);
  } catch (error) {
    console.log(error);
  }

  if (!movieDetails) {
    return;
  }

  const user = await isAuth();

  return (
    <>
      <MaxWidthWrapper className="relative mt-4 p-4">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1">
            <Image
              className="rounded-lg"
              src={`${process.env.NEXT_PUBLIC_MOVIEDB_POSTER_BASE_URL}${movieDetails?.posterUrl}`}
              width={500}
              height={0}
              alt="Image"
            />
          </div>

          <div className="col-span-3 px-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {movieDetails?.title}{" "}
                <span className="text-gray-500">
                  ({format(movieDetails?.releaseDate, "yyyy")})
                </span>
              </h1>
              <p className="text-muted-foreground text-lg mt-2">
                Released on:{" "}
                <span className="font-medium text-gray-700">
                  {format(movieDetails?.releaseDate, "dd/MM/yyyy")}
                </span>
              </p>
              <p className="text-muted-foreground text-lg mt-2">
                Categories:{" "}
                <span className="font-medium text-gray-700">
                  {movieDetails.categories.map(({ category }, index) => (
                    <span key={category.id}>
                      <Link
                        href={`/category/${category.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {category.name}
                      </Link>
                      {index < movieDetails.categories.length - 1 && ", "}
                    </span>
                  ))}
                </span>
              </p>

              <div className="mt-10">
                <h3 className="font-bold text-2xl text-gray-800 border-b-2 border-gray-200 pb-1">
                  Synopsis
                </h3>
                <p className="max-w-prose text-lg text-gray-700 mt-4 leading-relaxed">
                  {movieDetails.synopsis}
                </p>
              </div>

              <div className="mt-4 flex flex-row justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-2xl text-gray-800 flex items-center">
                    Rating
                    <Star className="h-5 w-5 ml-2" />
                  </h3>
                  <RatingBadge
                    className="text-3xl items-baseline"
                    rating={movieDetails.rating}
                  />
                </div>
                <div>
                  {user ? (
                    <ReviewButton movieId={movieId} />
                  ) : (
                    <Link
                      className={buttonVariants({ variant: "outline" })}
                      href={`/auth?origin=${encodeURIComponent(
                        `/movies/${movieId}`
                      )}`}
                    >
                      <Lock className="w-4 h-4" />
                      Login to leave a review
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <ReviewsList reviews={reviews} />
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default MovieDetailsPage;
