const API_URL = import.meta.env.VITE_API_URL;
const PREFERENCES_API_URL = import.meta.env.VITE_API_URL;
async function generateQuiz(tutorialId) {
  const response = await fetch(`${API_URL}/api/generate-question/tutorials/${tutorialId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  let responseData;
  
  try {
    responseData = await response.json();
  } catch (err) {
    console.error('[api] failed to parse json', err);
    return null;
  }

  console.log('[api] generateQuiz body : ', responseData);

  return { questions: responseData.questions ?? responseData.data?.questions ?? [] };
}

async function calculateQuizScore(quizResults) {
  console.log('api : ',quizResults);
  console.log('API_URL : ',API_URL);

  const response = await fetch(`${API_URL}/api/test`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quizResults),
  });

  let responseData;

  try {
    responseData = await response.json();
  } catch (err) {
    console.error('[api] failed to parse json', err);
    return null;
  }

  console.log('[api] calculateQuizScore body : ', responseData);

  return responseData;
    
}
/**
 * Fetch user preferences dari API
 * @param {string} userId - ID user
 * @returns {Promise<Object>} User preferences
 */
async function fetchUserPreferences(userId) {
  try {
    const response = await fetch(`${PREFERENCES_API_URL}/api/users/${userId}/preferences`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user preferences: ${response.status}`);
    }
    const data = await response.json();
    return data;

  }catch(error){
    console.error("Error fetching user preferences:", error);
    return {
      preferences: {
        layoutWidth: "fullWidth",
        fontStyle: "default",
        theme: "default",
        fontSize: "medium",
      },
    };
  }
}
 function saveUserPreferencesToLocal(userId,preferences){
  try{
    localStorage.setItem(`user_preferences_${userId}`, JSON.stringify(preferences));
    
  }catch(error){
     console.error(
       "[userPreferencesService] Error saving to localStorage:",
       error
     );
  }
}

function getUserPreferencesFromLocal(userId){
  try{
    const data = localStorage.getItem(`user_preferences_${userId}`);
    return data ? JSON.parse(data) : null;
  }catch(error){
     console.error(
       "[userPreferencesService] Error getting from localStorage:",
       error
     );
     return null;
  }
}
export { generateQuiz, calculateQuizScore, fetchUserPreferences, saveUserPreferencesToLocal, getUserPreferencesFromLocal };