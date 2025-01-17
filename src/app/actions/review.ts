"use server";

import { isAuth } from "@/lib/auth";
import { formReviewSchema } from "@/lib/types";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

export const submitReview = async (
  values: z.infer<typeof formReviewSchema>,
  movieId: string
) => {
  try {
    const user = await isAuth();
    // @ts-ignore
    if (!user || !user.id) {
      return { error: "User is not authenticated." };
    }
    const result = formReviewSchema.safeParse(values);
    if (!result.success) return { error: "Bad data format." };

    const parsedData = result.data;
    const cookieStore = await cookies(); // Ottieni i cookies dalla richiesta
    const token = cookieStore.get("session")?.value;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/movie/${movieId}`,
      {
        ...parsedData,
        movieId,
        // @ts-ignore
        userId: user.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;
    if (data.error) {
      return {
        error:
          "You have already reviewed this film, please edit or delete your review.",
      };
    }

    if (data) {
      revalidatePath(`/movies/${movieId}`);
      return {
        success: true,
      };
    }

    throw new Error("Can't create a new review now, try again later.");
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteReview = async (reviewId: string) => {
  try {
    const user = await isAuth();
    // @ts-ignore
    if (!user || !user.id) {
      return { error: "User is not authenticated." };
    }

    const cookieStore = await cookies(); // Ottieni i cookies dalla richiesta
    const token = cookieStore.get("session")?.value;
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${reviewId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    if (response.data) {
      revalidatePath(`/movies/${response.data.movieId}`);
      revalidatePath(`/profile`);
      return {
        success: true,
      };
    }
    throw new Error("Can't delete the review now, try again later.");
  } catch (error: any) {
    if (error.response.data.message)
      return { error: error.response.data.message };

    return { error };
  }
};

export const editReview = async (
  values: z.infer<typeof formReviewSchema>,
  reviewId: string
) => {
  try {
    const user = await isAuth();
    // @ts-ignore
    if (!user || !user.id) {
      return { error: "User is not authenticated." };
    }
    const result = formReviewSchema.safeParse(values);
    if (!result.success) return { error: "Bad data format." };

    const parsedData = result.data;
    const cookieStore = await cookies(); // Ottieni i cookies dalla richiesta
    const token = cookieStore.get("session")?.value;
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${reviewId}`,
      // @ts-ignore
      { ...parsedData, userId: user.id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      revalidatePath(`/movies/${response.data.movieId}`);
      revalidatePath(`/profile`);
      return {
        success: true,
      };
    }
    throw new Error("Can't edit this new review now, try again later.");
  } catch (error: any) {
    if (error.response.data.message)
      return { error: error.response.data.message };

    return { error };
  }
};
