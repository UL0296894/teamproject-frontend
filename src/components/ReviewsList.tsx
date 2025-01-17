import React from "react";

import { Separator } from "./ui/separator";
import { Review as TReview } from "@/lib/types";
import Review from "./Review";
import { isAuth } from "@/lib/auth";

type Props = { reviews: TReview[] };

const ReviewsList = async ({ reviews }: Props) => {
  const user = await isAuth();
  return (
    <div className="space-y-6 mt-6">
      <h3 className="text-2xl font-bold text-gray-800">Reviews</h3>
      <Separator />
      {reviews.length === 0 && (
        <p className="text-gray-600 italic">No reviews yet.</p>
      )}
      <div className="grid grid-cols-2 gap-4">
        {reviews.map((review) => (
          // @ts-expect-error
          <Review key={review.id} review={review} userId={user.id} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
