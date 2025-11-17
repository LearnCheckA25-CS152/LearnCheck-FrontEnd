const API_URL = import.meta.env.VITE_API_URL;

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

export { generateQuiz, calculateQuizScore };
