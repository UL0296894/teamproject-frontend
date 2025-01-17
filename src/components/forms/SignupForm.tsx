"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSignupSchema } from "@/lib/types";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cookies } from "next/headers";
import { signup } from "@/app/actions/auth";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type Props = {};

const SignupForm = (props: Props) => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");
  const router = useRouter();
  const form = useForm<z.infer<typeof formSignupSchema>>({
    resolver: zodResolver(formSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSignupSchema>) {
    try {
      setIsLoading(true);
      setError("");
      const { error, success } = await signup(values);
      if (error) {
        setError(error);
      }
      if (success) {
        toast({
          title: "Success",
          description: "User registered successfully.",
        });
        if (origin && origin.startsWith("/")) {
          router.push(decodeURIComponent(origin));
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Smith"
                    disabled={isLoading}
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@example.com"
                    type="email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="******"
                    type="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            {error && (
              <p className="text-center text-sm font-semibold text-red-900">
                {error}
              </p>
            )}

            <Button disabled={isLoading} type="submit" className="w-full">
              {!isLoading && "Signup"}
              {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
            </Button>
            <p className="text-muted-foreground text-sm text-center">
              By joining you agree to the MovieReviews terms of service.
            </p>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SignupForm;
