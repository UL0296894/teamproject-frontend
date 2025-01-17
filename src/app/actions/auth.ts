"use server";

import {
  formEditPasswordSchema,
  formLoginSchema,
  formSignupSchema,
} from "@/lib/types";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod";

export const signup = async (values: z.infer<typeof formSignupSchema>) => {
  try {
    const result = formSignupSchema.safeParse(values);
    if (!result.success) return { error: "Bad data format." };

    const parsedData = result.data;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/signup`,
      { ...parsedData }
    );
    if (response.data.accessToken) {
      const accessToken = response.data.accessToken;
      console.log("SignUp successful:", response.data.accessToken);
      (await cookies()).set("session", accessToken);
      return {
        success: true,
      };
    }
    throw new Error("Can't signup, try again.");
  } catch (error: any) {
    if (error.response.data.message)
      return { error: error.response.data.message };

    return { error };
  }
};

export const login = async (values: z.infer<typeof formLoginSchema>) => {
  try {
    const result = formLoginSchema.safeParse(values);
    if (!result.success) return { error: "Bad data format." };

    const parsedData = result.data;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,
      { ...parsedData }
    );
    if (response.data.accessToken) {
      const accessToken = response.data.accessToken;
      console.log("Login successful:", response.data.accessToken);
      (await cookies()).set("session", accessToken);
      return {
        success: true,
      };
    }
    throw new Error("Can't signup, try again.");
  } catch (error: any) {
    if (error.response.data.message)
      return { error: error.response.data.message };

    return { error };
  }
};

export const logout = async () => {
  (await cookies()).delete("session");
};

export const editPassword = async (
  values: z.infer<typeof formEditPasswordSchema>
) => {
  try {
    const result = formEditPasswordSchema.safeParse(values);
    if (!result.success) return { error: "Bad data format." };

    const parsedData = result.data;
    const cookieStore = await cookies(); // Ottieni i cookies dalla richiesta
    const token = cookieStore.get("session")?.value;
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/update-password`,

      { ...parsedData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data) {
      return {
        success: true,
      };
    }
    throw new Error("Can't edit profile now, try again.");
  } catch (error: any) {
    if (error.response.data.message)
      return { error: error.response.data.message };

    return { error };
  }
};
