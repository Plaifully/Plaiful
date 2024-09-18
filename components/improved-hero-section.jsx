"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "./actions";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Heart, ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "./ThemeProvider";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Company", href: "#" },
];

export function ImprovedHeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // const handleSubscribe = (e) => {
  //   e.preventDefault();
  //   // Here you would typically send the email to your backend
  //   console.log("Subscribed with email:", email);
  //   // Reset form and hide it
  //   setEmail("");
  //   setShowRegistration(false);
  // };

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(formData) {
    setStatus("Submitting...");

    try {
      const result = await subscribeToNewsletter(formData);
      if (result.success) {
        setStatus("Success! You are now subscribed.");
        setEmail("");
      } else {
        setStatus(`Error: ${result.message}`);
      }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
    }
  }

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 group">
              <span className="sr-only ">Your Company</span>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Minimalist%20Symmetrical%20Black%20'P'%20Abstract%20Design%20on%20White%20(1)-0x51G2MWOKpTvpaxyQn3rb5sxtFoef.png"
                alt="Company logo"
                width={56}
                height={56}
                className="w-auto dark:invert h-14 transition-transform duration-300 ease-in-out group-hover:-rotate-6"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <TooltipProvider>
              {navigation.map((item) => (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className="text-sm font-semibold leading-6 text-foreground hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-foreground">Coming soon</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              {/* {mounted &&
                (theme === "dark" ? (
                  <Sun
                    onClick={toggleTheme}
                    className="h-[1.2rem] w-[1.2rem]"
                  />
                ) : (
                  <Moon
                    onClick={toggleTheme}
                    className="h-[1.2rem] w-[1.2rem]"
                  />
                ))} */}
              <ThemeToggle type="icon" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild className="">
                    <Link className="btn-solid" href="/login">
                      Login
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-foreground">Coming soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </nav>
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-50" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5 group">
                  <span className="sr-only">Your Company</span>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Minimalist%20Symmetrical%20Black%20'P'%20Abstract%20Design%20on%20White%20(1)-0x51G2MWOKpTvpaxyQn3rb5sxtFoef.png"
                    alt="Company logo"
                    width={56}
                    height={56}
                    className="w-auto h-14 transition-transform duration-300 ease-in-out group-hover:-rotate-6"
                  />
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-muted"
                      >
                        {item.name}
                        <span className="ml-2 text-sm text-muted-foreground">
                          (Coming soon)
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    {/* <Button
                      onClick={toggleTheme}
                      variant="outline"
                      size="sm"
                      className="w-full mb-2"
                    >
                      {mounted &&
                        (theme === "dark"
                          ? "Switch to Light Mode"
                          : "Switch to Dark Mode")}
                    </Button> */}
                    <div className="py-6 flex justify-center items-center">
                      <ThemeToggle type="text" />
                    </div>
                    <Button asChild className="w-full btn-solid">
                      <Link href="/login">
                        Login
                        <span className="ml-2 text-sm">(Coming soon)</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              The future of storytelling has arrived
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Build rich and immersive stories where your child&apos;s
              imagination makes them the star of their own adventure
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-y-6">
              {status && (
                <p className="mt-2 pb-2 text-base text-theme">{status}</p>
              )}
              {!showRegistration ? (
                <Button
                  onClick={() => setShowRegistration(true)}
                  className="w-full sm:w-auto bg-foreground text-background hover:text-foreground hover:bg-background border border-foreground"
                >
                  Stay informed
                </Button>
              ) : (
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-grow flex items-center">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowRegistration(false)}
                        className="mr-2"
                        aria-label="Go back"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-grow"
                      />
                    </div>
                    <Button type="submit" className="flex-shrink-0 btn-solid">
                      <Heart className="mr-2 h-4 w-4" /> Subscribe
                    </Button>
                  </div>
                </form>
              )}
              <Link
                href="https://x.com/PlaifulAi"
                className="text-foreground hover:text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
                <span className="sr-only">X (formerly Twitter)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
