"use client";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const Header = ({ user, profileInfo }) => {
  const MenuItems = [
    {
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "Login",
      path: "/sign-in",
      show: !user,
    },
    {
      label: "Register",
      path: "/sign-up",
      show: !user,
    },
    {
      label: "Activity",
      path: "/activity",
      show: profileInfo?.role === "candidate",
    },
    {
      label: "Jobs",
      path: "/jobs",
      show: user,
    },
    {
      label: "Account",
      path: "/account",
      show: user,
    },
  ];
  return (
    <div>
      <header className="flex h-16 w-full shrink-0 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden ">
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toggle Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link className="mr-6 hidden lg:flex" href="/">
              <h3>JobMania</h3>
            </Link>
            <div className="grid gap-2 p-6">
              {MenuItems && MenuItems.length > 0 ? (
                MenuItems.map((item) =>
                  item.show ? (
                    <Link
                      key={item.label}
                      href={item.path}
                      className="flex w-full py-2 items-center text-lg font-semibold"
                    >
                      {item.label}
                    </Link>
                  ) : null
                )
              ) : (
                <h1>Nothing Present here</h1>
              )}

              <UserButton afterSwitchSessionUrl="/" />
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="hidden lg:flex mr-6">
          JobMania
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6">
          {MenuItems.map((item) =>
            item.show ? (
              <Link
                onClick={() => sessionStorage.removeItem("filterParams")}
                key={item.label}
                href={item.path}
                className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2  font-medium text-sm"
              >
                {item.label}
              </Link>
            ) : null
          )}
          <UserButton afterSwitchSessionUrl="/" />
        </nav>
      </header>
    </div>
  );
};

export default Header;
