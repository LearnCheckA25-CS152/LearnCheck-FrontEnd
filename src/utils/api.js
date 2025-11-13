const API_URL = import.meta.env.VITE_API_URL;

async function fetchQuiz(tutorialId) {
  const response = await fetch(`${API_URL}/api/tutorials/${tutorialId}`);
  const responseData = await response.json();

  if(!response.ok) {
    console.error('Error fetching quiz data:', responseData.message);
    return null;
  }
  
  return { data : responseData.data };
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

  const responseData = await response.json();
  
  if(!response.ok) {
    console.error('Error submitting quiz answers:', responseData.message);
    return null;
  }
  return { data : responseData.data };
    
}

export { fetchQuiz, calculateQuizScore };
