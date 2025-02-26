"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Info, Calendar, Menu } from "lucide-react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 focus:outline-none hover:scale-105 transition-transform"
          >
            <Image
              src="/logo.svg"
              alt="Anime Loom Logo"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <span className="hidden sm:inline text-xl sm:text-2xl font-bold text-yellow-400">
              Anime Loom
            </span>
          </Link>

          <form
            onSubmit={handleSearch}
            className="flex-grow max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-2 sm:mx-4 md:mx-8"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-full bg-gray-800/90 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-700 hover:border-gray-600 transition-colors text-sm sm:text-base"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </form>

          <nav className="hidden sm:block">
            <ul className="flex items-center space-x-4 sm:space-x-6">
              <li>
                <Link
                  href="/calendar"
                  className="text-gray-300 hover:text-yellow-400 transition-colors focus:outline-none p-2 rounded-full hover:bg-gray-800"
                  title="Anime Calendar"
                >
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-yellow-400 transition-colors focus:outline-none p-2 rounded-full hover:bg-gray-800"
                  title="About"
                >
                  <Info className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
              </li>
            </ul>
          </nav>

          <button
            onClick={toggleMenu}
            className="sm:hidden text-gray-300 hover:text-yellow-400 transition-colors focus:outline-none p-2 rounded-full hover:bg-gray-800"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {isMenuOpen && (
          <nav className="sm:hidden mt-4">
            <ul className="flex flex-col space-y-2">
              <li>
                <Link
                  href="/calendar"
                  className="text-gray-300 hover:text-yellow-400 transition-colors focus:outline-none block py-2 px-4 rounded hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Anime Calendar
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-yellow-400 transition-colors focus:outline-none block py-2 px-4 rounded hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    About
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
