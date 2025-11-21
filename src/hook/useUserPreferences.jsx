import { useState, useEffect } from "react";
import {
  fetchUserPreferences,
  saveUserPreferencesToLocal,
} from "../utils/api";

function useUserPreferences(userId) {
  const [preferences, setPreferences] = useState( {
    layoutWidth: "fullWidth",
    fontStyle: "default",
    theme: "default",
    fontSize: "medium",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // set loading
    if (!userId) {
      setIsLoading(false);
      return;
    }
    // load preferences
    async function loadPreference() {
      setIsLoading(true);
      setError(null);
      try {
        const userIdLocal = localStorage.getItem("userId");
        if (userIdLocal !== userId || !localStorage.getItem(`user_preferences_${userId}`)) {
          const preferences = await fetchUserPreferences(userId);
          setPreferences(preferences.data.preference);
          saveUserPreferencesToLocal(userId, preferences.data.preference);
          setIsLoading(false);
        }else{
          const localPreferences = localStorage.getItem(
            `user_preferences_${userId}`
          );
          setPreferences( JSON.parse(localPreferences) );
          setIsLoading(false);
        }
            
      } catch (error) {
        console.error("Error loading preferences:", error);
        setError(error.message);
        setIsLoading(false);
      }
    }
    loadPreference();
  },[userId]);
  return { preferences, isLoading, error };
}

export{ useUserPreferences }