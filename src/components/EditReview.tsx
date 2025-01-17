"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, Star } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formReviewSchema, Review } from "@/lib/types";
import { editReview, submitReview } from "@/app/actions/review";

type Props = {
  review: Review;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditReview = ({ review, isDialogOpen, setIsDialogOpen }: Props) => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formReviewSchema>>({
    resolver: zodResolver(formReviewSchema),
    defaultValues: {
      // @ts-ignore
      rating: review.rating,
      content: review.content,
      title: review.title,
    },
  });

  const onSubmit = async (values: z.infer<typeof formReviewSchema>) => {
    try {
      setIsLoading(true);
      setError("");
      const { error, success } = await editReview(values, review.id);
      if (error) {
        setError(error);
      }
      if (success) {
        toast({
          title: "Success",
          description: "Review submitted successfully",
        });

        setIsDialogOpen(false);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
        <DialogContent className="max-w-xl p-6 rounded-lg shadow-xl bg-white border border-gray-200">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-3xl font-extrabold text-gray-900">
              Edit review
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2 text-sm">
              Update your review to reflect your latest thoughts. You can adjust
              your rating and provide additional feedback.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        placeholder="Enter a rating between 1 and 5"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        id="title"
                        type="text"
                        placeholder="Enter your review title"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Review</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          id="content"
                          rows={5}
                          className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Write your review here..."
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && (
                  <p className="text-center text-sm font-semibold text-red-900">
                    {error}
                  </p>
                )}
              </div>

              <DialogFooter className="flex justify-between items-center mt-6">
                <Button
                  disabled={isLoading}
                  variant="outline"
                  type="button"
                  className="px-4 py-2 text-sm"
                  onClick={() => {
                    setIsDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white hover:bg-green-700"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditReview;
