"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import { logout } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
type Props = {
  user: {
    name: string;
    email: string;
  };
};

const UserDropdown = ({ user }: Props) => {
  const router = useRouter();
  const logoutHandler = async () => {
    await logout();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User /> {user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[999999]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            router.push("/profile");
          }}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-400 cursor-pointer"
          onClick={logoutHandler}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
