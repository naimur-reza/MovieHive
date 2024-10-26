"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ToggleTheme";
import SearchMovie from "./SearchMovie";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-700/20 dark:border-gray-700/50 bg-white/50 dark:bg-black/50 fixed top-0 w-full z-10 bg-opacity-55 backdrop-blur-sm">
      <div className="container h-14 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetTitle>
                <div className="font-bold text-xl text-yellow-500">
                  <Link href="/">MovieHive</Link>
                </div>
              </SheetTitle>

              <nav className="flex flex-col space-y-4 mt-5">
                <Link
                  href="/"
                  className="text-lg font-medium hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/popular"
                  className="text-lg font-medium hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  Popular
                </Link>
                <Link
                  href="/watchlist"
                  className="text-lg font-medium hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  Watchlist
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="font-bold text-xl text-yellow-500 ">
            <Link href="/">MovieHive</Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <SearchMovie />

          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
