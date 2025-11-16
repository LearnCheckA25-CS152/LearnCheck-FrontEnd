import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import QuizResultPage from "./pages/QuizResultPage";

function App() {
  return (
    <div className="app-container bg-background font-default text-foreground px-4 py-6 h-screen flex items-center justify-center dark:md:bg-gray-800 dark ">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/quiz/result" element={<QuizResultPage />} />
      </Routes>
    </div>
  );
}

export default App; 