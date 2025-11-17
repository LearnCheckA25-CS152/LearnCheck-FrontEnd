import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { calculateQuizStats } from "../utils/quizHelpers";
import { DUMMY_QUIZ_DATA } from "../utils/quizData";
import QuizHeader from "../component/QuizHeader";
import QuizQuestion from "../component/QuizQuestion";
import QuizOptions from "../component/QuizOptions";
import QuizNavigation from "../component/QuizNavigation";
import { generateQuiz } from "../utils/api";

function QuizPage() {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 menit
  const selectedAnswersRef = useRef(selectedAnswers);
  const quizDataRef = useRef(quizData);

  const tutorialId = "35363"; 

  useEffect(() => {
    // Inisialisasi quiz dengan pertanyaan acak
    // const randomQuiz = getRandomQuestions(DUMMY_QUIZ_DATA, 1, 3);
    // setQuizData(randomQuiz);
    fetchQuiz(tutorialId);
  }, [tutorialId]);

  useEffect(() => {
    selectedAnswersRef.current = selectedAnswers;
  }, [selectedAnswers]);

  useEffect(() => {
    quizDataRef.current = quizData;
  }, [quizData]);

  async function fetchQuiz(tutorialId) {
    const result = await generateQuiz(tutorialId);
    console.log("Fetched quiz data:", result);
    if (!result) {
      console.error("Failed to fetch quiz");
      setQuizData({title : "quiz", questions: []});
      return;
    }

    setQuizData({ questions: result.questions });
  };

  const handleFinishQuiz = useCallback(() => {
    // Quiz selesai
    const stats = calculateQuizStats(selectedAnswersRef.current, quizDataRef.current?.questions || []);
    const quizId = Math.random().toString(36).substr(2, 9);

    // Simpan hasil ke localStorage
    const quizResult = {
      id: quizId,
      ...stats,
      answers: selectedAnswersRef.current,
      questions: quizDataRef.current?.questions || [],
      timeUsed: 300 - timeRemaining,
      timestamp: new Date().toISOString(),
      quizTitle: quizDataRef.current?.title || "Quiz",
    };

    console.log(quizResult);

    // Ambil history hasil quiz sebelumnya
    const quizHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]");
    quizHistory.push(quizResult);

    // Simpan ke localStorage
    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
    localStorage.setItem("lastQuizResult", JSON.stringify(quizResult));

    console.log("Quiz completed:", stats);
    // Navigate ke hasil atau halaman lain
    navigate("/");
  }, [navigate, timeRemaining]);

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

  if (!quizData)
    return <div className="flex items-center justify-center min-h-screen text-gray-600">Memuat soal...</div>;
  if (!Array.isArray(quizData.questions) || quizData.questions.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Tidak ada pertanyaan untuk ditampilkan
      </div>
    );

  return (
    <div className="flex justify-center">
      <div className="my-5 px-6 py-8 w-[720px] max-w-[1200px] rounded-[10px] shadow-[0px_4px_8px_rgba(0,0,0,0.2)] bg-white">
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
