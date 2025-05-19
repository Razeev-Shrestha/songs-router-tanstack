"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings } from "lucide-react";
import { useAuthProvider } from "@/providers/auth-provider";
import { Link, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/services";
import { generateRandomImage } from "@/lib/generate-random-image";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuthProvider();
  const { data } = useSuspenseQuery(userQueryOptions);
  const router = useRouter();
  const [accessToken, set, remove] = useLocalStorage("accessToken");
  const [refreshToken, setRT, removeRt] = useLocalStorage("refreshToken");

  const onLogout = () => {
    setIsMenuOpen(false);
    remove();
    removeRt();
    router.navigate({ reloadDocument: true });
  };

  const user = data.data.user;

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6 h-16 flex items-center justify-between border-b">
        <Link to="/" className="flex items-center gap-2">
          <Icon icon="music" className="h-6 w-6" />
          <span className="font-bold">MusicApp</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 flex flex-col gap-1">
            <span
              className={`block h-0.5 w-full bg-current transform transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-current transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-current transform transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
          </div>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-4 sm:gap-6">
          <Link
            to="/genres"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Genres
          </Link>
          <Link
            to="/artists"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Artists
          </Link>
        </nav>

        {/* Auth section - desktop */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={generateRandomImage()}
                      alt={user?.email}
                    />
                    <AvatarFallback>{user?.email.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="flex flex-col space-y-1 leading-none p-2">
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex flex-col space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    asChild
                  >
                    <Link to="/dashboard">
                      <Settings className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={onLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-background z-40 border-b transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <nav className="flex flex-col p-4">
          <Link
            to="/genres"
            className="py-2 text-sm font-medium hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Genres
          </Link>
          <Link
            to="/artists"
            className="py-2 text-sm font-medium hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Artists
          </Link>

          {/* Auth section - mobile */}
          {isAuthenticated ? (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={"/placeholder.svg"} alt={user?.email} />
                  <AvatarFallback>{user?.email.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Link to="/dashboard" className="flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mb-2 justify-start"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>

              <Button
                variant="destructive"
                size="sm"
                className="w-full justify-start"
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 mt-4">
              <Link to="/login" className="flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Button>
              </Link>
              <Link to="/register" className="flex-1">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};
