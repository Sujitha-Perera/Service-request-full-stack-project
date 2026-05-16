"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const baseLinkClassName =
    "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200";
  const hoverClassName = "hover:text-purple-900 hover:bg-purple-200/70";
  const focusClassName =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/80";
  const activeClassName =
    "text-purple-900 bg-purple-200/80 ring-1 ring-purple-300/80 shadow-sm shadow-purple-900/20";
  const inactiveClassName = "text-purple-900/80";
  
  const registerLinkClassName =
    "text-purple-950 bg-purple-300 hover:bg-purple-400 border border-purple-300/80 shadow-[0_10px_30px_-20px_rgba(192,132,252,0.7)]";

  const getLinkClassName = (href) => {
    const isActive = pathname === href;
    return [
      baseLinkClassName,
      hoverClassName,
      focusClassName,
      isActive ? activeClassName : inactiveClassName,
    ].join(" ");
  };

  const getAriaCurrent = (href) => (pathname === href ? "page" : undefined);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-100 via-violet-100 to-fuchsia-100 backdrop-blur-xl border-b border-purple-200 shadow-[0_18px_40px_-28px_rgba(168,85,247,0.45)]">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between px-6 py-4 text-center">
        <Link
          href="/"
          className="text-purple-950 text-lg md:text-xl font-serif font-semibold tracking-[0.08em] hover:text-purple-900 transition-colors"
        >
          ServiceBoard
        </Link>

        <div className="flex flex-wrap gap-4 md:gap-6 items-center text-sm">
          {user ? (
            <>
              <Link
                href="/"
                className={getLinkClassName("/")}
                aria-current={getAriaCurrent("/")}
              >
                All Jobs
              </Link>
              <Link
                href="/new-job"
                className={getLinkClassName("/new-job")}
                aria-current={getAriaCurrent("/new-job")}
              >
                Create Job
              </Link>
              <button
                onClick={handleLogout}
                className={[
                  baseLinkClassName,
                  hoverClassName,
                  focusClassName,
                  "text-purple-900/80",
                ].join(" ")}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={[
                  getLinkClassName("/login"),
                  registerLinkClassName,
                ].join(" ")}
                aria-current={getAriaCurrent("/login")}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={[
                  getLinkClassName("/register"),
                  registerLinkClassName,
                ].join(" ")}
                aria-current={getAriaCurrent("/register")}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
