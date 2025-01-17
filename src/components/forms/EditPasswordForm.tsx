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
import { formEditPasswordSchema } from "@/lib/types";
import { z } from "zod";
import { editPassword, logout } from "@/app/actions/auth";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const EditPasswordForm = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formEditPasswordSchema>>({
    resolver: zodResolver(formEditPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formEditPasswordSchema>) {
    try {
      setIsLoading(true);
      setError("");
      const { error, success } = await editPassword(values);
      if (error) {
        setError(error);
      }
      if (success) {
        toast({
          title: "Success",
          description: "Please login again.",
        });
        await logout();
        router.push("/");
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm new password</FormLabel>
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
              {!isLoading && "Save"}
              {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditPasswordForm;
