import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import QuizResultPage from "./pages/QuizResultPage";
import FeedbackPage from "./pages/FeedbackPage";
import { useUserPreferences } from "./hook/useUserPreferences";
import { useLocation } from "react-router-dom";

function App() {

  const location = useLocation();
  console.log("window location => ", location.pathname);

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userIdFromUrl = params.get("user");

    if (userIdFromUrl) {
      setUserId(userIdFromUrl);
      localStorage.setItem("userId", userIdFromUrl);
    } else {
      // Fallback ke localStorage
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, []);
  const { preferences, isLoading, error } = useUserPreferences(userId);

  // Apply preferences to documentElement (sync with index.html)
  useEffect(() => {
    if (isLoading) return;

    const root = document.getElementById("root");

    // Remove all theme-related classes first
    root.classList.remove(
      "dark",
      "font-default",
      "font-serif",
      "font-dyslexia",
      "text-sm",
      "text-base",
      "text-lg"
    );

    // Apply theme
    let theme = preferences.theme;
    if (theme === "dark") {
      root.classList.add("dark");
    }

    // Apply font style
    switch (preferences.fontStyle) {
      case "serif":
        root.classList.add("font-serif");
        break;
      case "open-dyslexic":
        root.classList.add("font-dyslexia");
        break;
      default:
        root.classList.add("font-default");
    }

    switch (preferences.fontSize) {
      case "small":
        root.classList.add("text-sm");
        break;
      case "large":
        root.classList.add("text-lg");
        break;
      default:
        root.classList.add("text-base");
    }
  }, [preferences, isLoading]);
  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen bg-background text-foreground `}
      >
        <p>Loading preferences...</p>
      </div>
    );
  }

  if (error) {
    console.error("Error loading preferences:", error);
  }
  return (
    <div
      className={`app-container bg-background  text-foreground px-4 py-6 h-screen flex items-center justify-center`}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/quiz/result/:resultId" element={<QuizResultPage />} />
        <Route path="/quiz/result/:resultId/feedback" element={<FeedbackPage />} />
      </Routes>
    </div>
  );
}

export default App;
