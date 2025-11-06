import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomQuestions, calculateQuizStats } from "../utils/quizHelpers";
import { DUMMY_QUIZ_DATA } from "../utils/quizData";
import QuizHeader from "../component/QuizHeader";
import QuizQuestion from "../component/QuizQuestion";
import QuizOptions from "../component/QuizOptions";
import QuizNavigation from "../component/QuizNavigation";

function QuizPage() {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 menit
  const selectedAnswersRef = useRef(selectedAnswers);
  const quizDataRef = useRef(quizData);

  useEffect(() => {
    // Inisialisasi quiz dengan pertanyaan acak
    const randomQuiz = getRandomQuestions(DUMMY_QUIZ_DATA, 1, 3);
    setQuizData(randomQuiz);
  }, []);

  useEffect(() => {
    selectedAnswersRef.current = selectedAnswers;
  }, [selectedAnswers]);

  useEffect(() => {
    quizDataRef.current = quizData;
  }, [quizData]);

  const handleFinishQuiz = useCallback(() => {
    // Quiz selesai
    const stats = calculateQuizStats(selectedAnswersRef.current, quizDataRef.current?.questions || []);
    console.log("Quiz completed:", stats);
    // Navigate ke hasil atau halaman lain
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleFinishQuiz]);

  const currentQuestion = quizData?.questions?.[currentQuestionIndex];
  const totalQuestions = quizData?.questions?.length || 0;

  const handleAnswerSelect = useCallback((answer, questionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentQuestionIndex((prev) => {
      if (prev < totalQuestions - 1) return prev + 1;
      // finish
      handleFinishQuiz();
      return prev;
    });
  }, [totalQuestions, handleFinishQuiz]);

  if (!quizData) return <div className="loading">Memuat soal...</div>;
  if (!Array.isArray(quizData.questions) || quizData.questions.length === 0)
    return <div>Tidak ada pertanyaan untuk ditampilkan</div>;

  return (
    <div className="app-container">
      <div className="quiz-container">
        <QuizHeader
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          timeRemaining={timeRemaining}
        />

        <QuizQuestion question={currentQuestion.question} />

        <QuizOptions
          options={currentQuestion.options}
          questionId={currentQuestion.id}
          selectedAnswer={selectedAnswers[currentQuestion.id]}
          onAnswerSelect={handleAnswerSelect}
        />

        <QuizNavigation
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}

export default QuizPage;
