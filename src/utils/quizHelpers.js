// Helper functions untuk kuis

/**
 * Mengacak urutan array (Fisher-Yates shuffle)
 * @param {Array} array - Array yang akan diacak
 * @returns {Array} Array yang sudah diacak
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Mengacak pertanyaan dan opsi jawaban
 * @param {Object} quizData - Data kuis
 * @param {boolean} shuffleQuestions - Apakah mengacak urutan pertanyaan
 * @param {boolean} shuffleOptions - Apakah mengacak urutan opsi
 * @returns {Object} Data kuis yang sudah diacak
 */
export const shuffleQuizData = (quizData, shuffleQuestions = false, shuffleOptions = true) => {
  let questions = [...quizData.questions];
  
  // Acak urutan pertanyaan jika diminta
  if (shuffleQuestions) {
    questions = shuffleArray(questions);
  }
  
  // Acak urutan opsi untuk setiap pertanyaan
  if (shuffleOptions) {
    questions = questions.map(question => ({
      ...question,
      options: shuffleArray(question.options)
    }));
  }
  
  return {
    ...quizData,
    questions
  };
};

/**
 * Mengambil sejumlah pertanyaan acak dari pool pertanyaan
 * @param {Object} quizData - Data kuis lengkap
 * @param {number} minQuestions - Jumlah minimum pertanyaan (default: 1)
 * @param {number} maxQuestions - Jumlah maksimum pertanyaan (default: 3)
 * @returns {Object} Data kuis dengan pertanyaan yang sudah dipilih secara acak
 */
export const getRandomQuestions = (quizData, minQuestions = 1, maxQuestions = 3) => {
  const availableQuestions = [...quizData.questions];
  
  // Tentukan jumlah pertanyaan secara acak antara min dan max
  const questionCount = Math.floor(Math.random() * (maxQuestions - minQuestions + 1)) + minQuestions;
  
  // Pastikan tidak melebihi jumlah pertanyaan yang tersedia
  const finalCount = Math.min(questionCount, availableQuestions.length);
  
  // Acak dan ambil sejumlah pertanyaan
  const shuffledQuestions = shuffleArray(availableQuestions);
  const selectedQuestions = shuffledQuestions.slice(0, finalCount);
  
  // Acak opsi untuk setiap pertanyaan yang dipilih
  const questionsWithShuffledOptions = selectedQuestions.map(question => ({
    ...question,
    options: shuffleArray([...question.options])
  }));
  
  return {
    ...quizData,
    questions: questionsWithShuffledOptions
  };
};

export function formatDate(dateInput) {
  const d = dateInput ? new Date(dateInput) : new Date();
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**
 * Menghitung statistik kuis
 * @param {Object} selectedAnswers - Jawaban yang dipilih user
 * @param {Array} questions - Array pertanyaan
 * @returns {Object} Statistik kuis
 */
export const calculateQuizStats = (selectedAnswers, questions) => {
  let correct = 0;
  let answered = 0;
  
  questions.forEach(question => {
    if (selectedAnswers[question.id] !== undefined) {
      answered++;
      if (selectedAnswers[question.id] === question.correct_answer) {
        correct++;
      }
    }
  });
  
  const total = questions.length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const completionRate = total > 0 ? Math.round((answered / total) * 100) : 0;
  
  return {
    correct,
    incorrect: answered - correct,
    unanswered: total - answered,
    total,
    answered,
    percentage,
    completionRate
  };
};

/**
 * Format waktu dari detik ke format MM:SS
 * @param {number} seconds - Waktu dalam detik
 * @returns {string} Waktu dalam format MM:SS
 */
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Validasi data kuis
 * @param {Object} quizData - Data kuis yang akan divalidasi
 * @returns {Object} Hasil validasi
 */
export const validateQuizData = (quizData) => {
  const errors = [];
  
  if (!quizData || typeof quizData !== 'object') {
    errors.push('Data kuis tidak valid');
    return { isValid: false, errors };
  }
  
  if (!Array.isArray(quizData.questions) || quizData.questions.length === 0) {
    errors.push('Tidak ada pertanyaan dalam kuis');
    return { isValid: false, errors };
  }
  
  quizData.questions.forEach((question, index) => {
    if (!question.id) {
      errors.push(`Pertanyaan ${index + 1}: ID tidak ada`);
    }
    
    if (!question.question || question.question.trim() === '') {
      errors.push(`Pertanyaan ${index + 1}: Teks pertanyaan kosong`);
    }
    
    if (!Array.isArray(question.options) || question.options.length < 2) {
      errors.push(`Pertanyaan ${index + 1}: Minimal harus ada 2 opsi jawaban`);
    }
    
    if (!question.correct_answer) {
      errors.push(`Pertanyaan ${index + 1}: Jawaban benar tidak ada`);
    } else if (!question.options.includes(question.correct_answer)) {
      errors.push(`Pertanyaan ${index + 1}: Jawaban benar tidak ada dalam opsi`);
    }
    
    if (!question.explanation || question.explanation.trim() === '') {
      errors.push(`Pertanyaan ${index + 1}: Penjelasan tidak ada`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};