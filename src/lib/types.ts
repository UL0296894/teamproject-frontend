import { z } from "zod";

export const formSignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

export const formLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

export type MoviesResponse = {
  title: string;
  posterUrl: string;
  synopsis: string;
  rating: number;
  releaseDate: Date;
  id: number;
  backdropUrl: string;
  createdAt: string;
  updatedAt: string;
}[];

export type MoviesCategoryResponse = {
  title: string;
  posterUrl: string;
  synopsis: string;
  rating: number;
  releaseDate: Date;
  id: number;
  backdropUrl: string;
  createdAt: string;
  updatedAt: string;
  categories: [
    {
      category: {
        name: string;
      };
    }
  ];
}[];

export type CategoriesResponse = {
  id: number;
  name: string;
}[];

export type MovieDetailsResponse = {
  title: string;
  posterUrl: string;
  synopsis: string;
  rating: number;
  releaseDate: Date;
  id: number;
  backdropUrl: string;
  createdAt: string;
  updatedAt: string;
  categories: [
    {
      category: {
        id: number;
        name: string;
      };
    }
  ];
};

export const formReviewSchema = z.object({
  rating: z.coerce.number().min(1).max(5),
  title: z.string().min(3),
  content: z.string().min(3),
});

export type ReviewsResponse = {
  id: string;
  title: string;
  authorName: string;
  content: string;
  rating: number;
  userId: number;
  movieId: number;
  createdAt: Date;
  updatedAt: Date;
}[];

export type MyReviewsResponse = {
  reviews: Review[];
  total: number;
};

export type Review = {
  id: string;
  title: string;
  authorName: string;
  content: string;
  rating: number;
  userId: number;
  movieId: number;
  createdAt: Date;
  updatedAt: Date;
};

export const formEditPasswordSchema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Associa l'errore a 'confirmPassword'
  });
