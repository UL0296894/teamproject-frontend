import MaxWidthWrapper from "./MaxWidthWrapper";
import { ArrowRight, Loader2, Menu, User } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

import { isAuth } from "@/lib/auth";
import UserDropdown from "./UserDropdown";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
type Props = {};

const Header = async ({}: Props) => {
  let user = null;
  const jwtPayload = await isAuth();
  if (jwtPayload) {
    user = {
      // @ts-ignore
      name: jwtPayload.name,
      // @ts-ignore
      email: jwtPayload.email,
    };
  }

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <a href="/" className="flex z-40 font-extrabold">
            MOVIE<span className="text-green-600">REVIEWS</span>
          </a>
          <div className="h-full items-center space-x-4 lg:flex hidden">
            <Link
              href={"/"}
              className={buttonVariants({ size: "sm", variant: "ghost" })}
            >
              HOME
            </Link>
            <Link
              href={"/movies/search"}
              className={buttonVariants({ size: "sm", variant: "ghost" })}
            >
              SEARCH
            </Link>
            <Link
              href={"/about-us"}
              className={buttonVariants({ size: "sm", variant: "ghost" })}
            >
              ABOUT US
            </Link>
            {!user ? (
              <Link href={"/auth"} className={buttonVariants({ size: "sm" })}>
                LOGIN <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <UserDropdown user={user} />
            )}
          </div>
          <div className="block lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button>
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="z-[9999]">
                <SheetHeader>
                  <SheetTitle>
                    <a href="/" className="flex z-40 font-extrabold">
                      MOVIE<span className="text-green-600">REVIEWS</span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4">
                  <Link
                    href={"/"}
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                  >
                    HOME
                  </Link>
                  <Link
                    href={"/movies/search"}
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                  >
                    SEARCH
                  </Link>
                  <Link
                    href={"/about-us"}
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                  >
                    ABOUT US
                  </Link>
                  {!user ? (
                    <Link
                      href={"/auth"}
                      className={buttonVariants({ size: "sm" })}
                    >
                      LOGIN <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <UserDropdown user={user} />
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Header;
