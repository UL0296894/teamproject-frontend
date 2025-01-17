"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, Star } from "lucide-react";
import {
  Dialog,
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
import { formReviewSchema } from "@/lib/types";
import { submitReview } from "@/app/actions/review";

type Props = {
  movieId: string;
};

const ReviewButton = ({ movieId }: Props) => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formReviewSchema>>({
    resolver: zodResolver(formReviewSchema),
    defaultValues: {
      // @ts-expect-error
      rating: "",
      content: "",
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formReviewSchema>) => {
    try {
      setIsLoading(true);
      setError("");
      const { error, success } = await submitReview(values, movieId);
      console.log(error, success);
      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }
      if (success) {
        toast({
          title: "Success",
          description: "Review submitted successfully",
        });
        form.reset();

        setIsDialogOpen(false);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center space-x-2">
            <span>Leave a review</span>
            <Star className="h-4 w-4 text-yellow-500" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-xl p-6 rounded-lg shadow-xl bg-white border border-gray-200">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-3xl font-extrabold text-gray-900">
              Share Your Thoughts
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2 text-sm">
              Let us know what you think about this movie. Your opinion matters
              and helps others decide!
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
    </div>
  );
};

export default ReviewButton;
