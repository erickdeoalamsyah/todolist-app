import React from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header
      style={{ fontFamily: "'Shadows Into Light', cursive" }}
      className="flex justify-between items-center px-6 py-3 bg-gradient-to-r from-blue-900 to-black border-b-2 border-gray-400 text-white"
    >
      <h1 className="text-xl font-bold">To Do List</h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;
