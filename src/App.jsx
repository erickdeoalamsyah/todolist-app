import React from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import ToDoList from "./components/ToDoList";
import Header from "./components/Header";

const App = () => {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
};

const MainApp = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Header />
      <div className="max-w-3xl mx-auto p-4">
        <ToDoList />
      </div>
    </div>
  );
};

export default App;
