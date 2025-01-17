"use client";
import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ReviewsList from "@/components/ReviewsList";
import { MyReviewsResponse, Review } from "@/lib/types";

type Props = { reviews: Review[]; userId: string };

const MyReviews = ({ reviews, userId }: Props) => {
  return (
    <>
      <ReviewsList reviews={reviews} userId={userId} />
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationPrevious onClick={() => setPage(page - 1)} />
            )}
            {[...Array(totalPages).keys()].map((index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setPage(index + 1)}
                  active={index + 1 === page}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {page < totalPages && (
              <PaginationNext onClick={() => setPage(page + 1)} />
            )}
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default MyReviews;
