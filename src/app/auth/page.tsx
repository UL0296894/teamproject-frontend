import { Card } from "@/components/ui/card";
import React from "react";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/forms/LoginForm";
import SignupForm from "@/components/forms/SignupForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { isAuth } from "@/lib/auth";
type Props = {};

const AuthPage = async (props: Props) => {
  const jwtPayload = await isAuth();
  if (jwtPayload) {
    redirect("/");
  }

  return (
    <div className="flex h-screen w-full items-center justify-center flex-col gap-3">
      <Link href="/" className="flex z-40 font-extrabold text-3xl">
        MOVIE<span className="text-green-600">REVIEWS</span>
      </Link>
      <Card className="min-w-80 p-6 space-y-4">
        <div className="text-center">
          <p className="text-2xl font-bold uppercase">Welcome back</p>
        </div>

        <Tabs defaultValue="account" className="w-96">
          <TabsList className="w-full">
            <TabsTrigger value="login" className="w-full">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="w-full">
              Sign up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthPage;
