import React, { useCallback } from "react";
import { DUMMY_QUIZ_DATA } from "../utils/quizData";
import { useNavigate } from "react-router-dom";
import { getRandomQuestions } from "../utils/quizHelpers";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import QuizResultHeader from "../component/QuizResultHeader";
import QuizQuestionResult from "../component/QuizQuestionResult";
import ExplanationPanel from "../component/ExplanationPanel";
import QuizNavigationResult from "../component/QuizNavigationResult";
function QuizResultPage() {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  useEffect(() => {
    // Simulasi pengambilan data kuis
    const randomQuiz = getRandomQuestions(DUMMY_QUIZ_DATA, 1, 3);
    // 19 Agt 2025 pukul 00:32:26
    const formatedDate = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    randomQuiz.createdAt = formatedDate;

    setQuizData(randomQuiz);
    const simulatedAnswers = {};
    randomQuiz.questions.forEach((question) => {
      // Simulasi jawaban acak dari opsi yang tersedia
      const randomOption =
        question.options[Math.floor(Math.random() * question.options.length)];
      simulatedAnswers[question.id] = randomOption;
    });
    setAnswers(simulatedAnswers);
  }, []);
  const calculateQuizStats = useCallback(() => {
    if (!quizData?.questions) return null;
    let correct = 0;
    const userAnsweredData = quizData.questions.map((question) => {
      const selectedAnswer = answers[question.id];
      const isCorrect = selectedAnswer === question.correct_answer;

      if (isCorrect) correct++;

      return {
        questionId: question.id,
        question: question.question,
        selectedAnswer,
        correctAnswer: question.correct_answer,
        explanation: question.explanation,
        isCorrect,
      };
    });
    const total = quizData.questions.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    return {
      total,
      answered: total,
      correct,
      incorrect: total - correct,
      userAnsweredData,
      percentage,
      passRate: percentage >= 66,
    };
  }, [answers, quizData]);
  const stats = quizData ? calculateQuizStats() : null;
  const totalQuestions = quizData?.questions?.length || 0;
  const handleNextQuiz = useCallback(() => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < totalQuestions - 1) return prevIndex + 1;
      // finish
      navigate("/");
      return prevIndex;
    });
  }, [navigate, totalQuestions]);

  const handlePrevious = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleRestart = useCallback(() => {
    navigate("/quiz");
  }, [navigate]);
  // console.log("stats", stats);
  // console.log("quizData", quizData);
  if (!quizData) return <div className="loading">Memuat soal...</div>;

  return (
    <div className="quiz-result-page app lg:w-3xl lg:shadow-2xl lg:rounded-2xl w-full lg:my-5 bg-background">
      <QuizResultHeader
        passRate={stats?.passRate}
        percentage={stats?.percentage}
        createdAt={quizData?.createdAt}
        title={quizData?.title}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />
      <Separator className="my-4 bg-primary h-0.5 " />

      <QuizQuestionResult
        question={stats?.userAnsweredData[currentQuestionIndex]?.question}
        options={quizData?.questions[currentQuestionIndex]?.options}
        currentQuestionIndex={currentQuestionIndex}
        userAnsweredData={stats?.userAnsweredData}
      />
      <ExplanationPanel
        explanation={stats?.userAnsweredData[currentQuestionIndex]?.explanation}
        isCorrect={stats?.userAnsweredData[currentQuestionIndex]?.isCorrect}
      />
      <Separator className="my-4 bg-primary h-0.5  mb-4" />
      <QuizNavigationResult
        isCorrect={stats?.userAnsweredData[currentQuestionIndex]?.isCorrect}
        currentQuestionIndex={currentQuestionIndex}
        handleRestart={handleRestart}
        handlePrevious={handlePrevious}
        handleNextQuiz={handleNextQuiz}
        totalQuestions={totalQuestions}
      />
    </div>
  );
}

export default QuizResultPage;
