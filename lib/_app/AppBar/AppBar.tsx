import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const AppBar = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400"></div>
      <nav className="NAV-CONTAINER flex w-full border-b bg-white py-4 px-4 text-neutral-600">
        <div className="NAV mx-auto flex w-full max-w-5xl items-center justify-between">
          <div className="NAV-LOGO bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
            HOLLOWVERSE
          </div>
          <div className="NAV-LINKS flex gap-2.5">
            {showSearch && (
              <input
                className="h-[32px] w-40 rounded-lg bg-gray-100 px-2.5 placeholder-gray-400 transition hover:bg-gray-200"
                placeholder="Search..."
              />
            )}
            <button
              onClick={() => {
                !showSearch ? setShowSearch(true) : setShowSearch(false);
              }}
              className="rounded-lg bg-gray-100 p-2 transition hover:bg-gray-200 active:bg-gray-300"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
