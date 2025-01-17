import EditPasswordForm from "@/components/forms/EditPasswordForm";
import EditProfileForm from "@/components/forms/EditPasswordForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MyReviews from "@/components/MyReviews";
import ReviewsList from "@/components/ReviewsList";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { isAuth } from "@/lib/auth";
import { MyReviewsResponse } from "@/lib/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  params: { page?: string; limit?: string };
};

const getMyReviews = async (
  userId: string,
  page: number = 1,
  limit: number = 5
) => {
  const cookieStore = await cookies(); // Ottieni i cookies dalla richiesta
  const token = cookieStore.get("session")?.value;
  if (!token) return [];
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/user/${userId}?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data: MyReviewsResponse = await response.json();
  if (!data) {
    return { reviews: [], total: 0 };
  }
  return data;
};

const ProfilePage = async ({ params }: Props) => {
  const jwtPayload = await isAuth();
  if (!jwtPayload) {
    redirect("/");
  }
  // @ts-ignore
  const userId = jwtPayload.id;
  // @ts-ignore
  const myReviews: MyReviewsResponse = await getMyReviews(userId);

  return (
    <>
      <MaxWidthWrapper className="p-6 mt-6 flex flex-col lg:flex-row gap-8">
        <Card className="border border-gray-200 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl flex-1 h-min flex-shrink-0">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 rounded-t-lg">
            <CardTitle className="text-2xl font-semibold">My Profile</CardTitle>
            <CardDescription className="text-sm text-gray-200">
              Your personal profile details
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 text-gray-800 space-y-6 bg-white rounded-lg shadow-md">
            <p className="text-lg text-gray-700">
              Here, you can update your profile information, manage settings,
              and more.
            </p>
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Edit Password
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Please enter your new password. Ensure it meets the required
                criteria.
              </p>
              <EditPasswordForm />
            </div>
          </CardContent>

          <CardFooter className="bg-gray-100 p-4 rounded-b-lg">
            <p className="text-sm text-gray-600">Edit your profile settings.</p>
          </CardFooter>
        </Card>

        <Card className="border border-gray-200 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl flex-1 h-auto flex-shrink-0">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-teal-400 text-white p-6 rounded-t-lg">
            <CardTitle className="text-2xl font-semibold">My Reviews</CardTitle>
            <CardDescription className="text-sm text-gray-200">
              Your movie reviews and ratings
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 text-gray-800">
            <p className="text-lg">
              View all your reviews, ratings, and feedback for the movies you've
              watched.
            </p>

            <div className="space-y-4">
              <ReviewsList reviews={myReviews.reviews} />
            </div>
          </CardContent>
          <CardFooter className="bg-gray-100 p-4 rounded-b-lg">
            <p className="text-sm text-gray-600">
              Manage or delete your reviews.
            </p>
          </CardFooter>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

export default ProfilePage;
