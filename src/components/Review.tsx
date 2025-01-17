"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Review as TReview } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Edit, Ellipsis, Trash } from "lucide-react";
import EditReview from "./EditReview";
import { deleteReview } from "@/app/actions/review";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
type Props = {
  review: TReview;
  userId?: string;
};

const Review = ({ review, userId }: Props) => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const deleteReviewHandler = async () => {
    try {
      setIsLoading(true);
      setError("");
      const { error, success } = await deleteReview(review.id);
      if (error) {
        setError(error);
      }
      if (success) {
        toast({
          title: "Success",
          description: "Deleted successfully.",
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: error,
        });
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const editReviewHandler = async () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card key={review.id} className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex justify-between flex-col">
            <div className="flex justify-between items-center">
              <span className="text-yellow-600 font-bold">
                {review.rating} / 5
              </span>
              {review.userId.toString() === userId?.toString() && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        editReviewHandler();
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        deleteReviewHandler();
                      }}
                      className="text-red-400 cursor-pointer"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <span className="text-lg font-medium">{review.authorName}</span>
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors duration-300">
            {review.title}
          </h3>
          <p className="text-gray-700 break-words max-w-full">
            {review.content}
          </p>
        </CardContent>
      </Card>
      <EditReview
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        review={review}
      />
    </>
  );
};

export default Review;
