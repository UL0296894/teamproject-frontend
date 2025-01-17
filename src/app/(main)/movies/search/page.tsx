"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MovieSearchBar from "@/components/MovieSearchBar";
import MoviesList from "@/components/MoviesList";
import { CategoriesResponse, MoviesResponse } from "@/lib/types";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const getMovies = async (queryString: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/search?title=` +
      queryString,
    {
      method: "GET",
    }
  );
  const data: MoviesResponse = await response.json();
  return data;
};

const getCategories = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/categories`,
    {
      method: "GET",
    }
  );
  const data: CategoriesResponse = await response.json();
  return data;
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const queryString = searchParams.get("q") || "";
  const [movies, setMovies] = useState<MoviesResponse>([]);
  const [categories, setCategories] = useState<CategoriesResponse>([]);

  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!queryString) return;

      setLoading(true);
      setError(null);
      try {
        const data = await getMovies(queryString);
        setMovies(data);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [queryString]);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      setCategoriesError(null);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setCategoriesError("Failed to fetch categories");
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <MaxWidthWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center my-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Search for Movies
          </h1>
          <p className="text-gray-600 text-sm">
            Discover your favorite movies by searching their titles below or
            exploring categories.
          </p>
        </div>

        {/* Search Bar */}
        <div className="shadow-md p-4 bg-white rounded-lg">
          <MovieSearchBar initialSearchQuery={queryString} />
        </div>

        {/* Categories Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Explore Categories
          </h2>

          {/* Categories Loading */}
          {categoriesLoading && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
          )}

          {/* Categories Error */}
          {categoriesError && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md my-4">
              <p className="text-sm">{categoriesError}</p>
            </div>
          )}

          {!categoriesLoading && !categoriesError && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="bg-green-100 text-green-700 font-medium text-sm py-2 px-4 rounded-lg shadow-md hover:bg-green-200 hover:shadow-lg transition-all duration-200"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Search Results */}
        {!loading && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Search Results
            </h2>
            {movies.length > 0 ? (
              <MoviesList initialMovies={movies} />
            ) : (
              <p className="text-gray-600 text-sm">
                Start your journey by searching for a movie title above!
              </p>
            )}
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

// Wrap the entire SearchPage component in a Suspense boundary
const SuspendedSearchPage = () => (
  <Suspense
    fallback={<Loader2 className="h-8 w-8 animate-spin text-green-600" />}
  >
    <SearchPage />
  </Suspense>
);

export default SuspendedSearchPage;
