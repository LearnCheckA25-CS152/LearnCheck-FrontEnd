import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import QuizHeader from "../component/QuizHeader";
import QuizQuestion from "../component/QuizQuestion";
import QuizOptions from "../component/QuizOptions";
import QuizNavigation from "../component/QuizNavigation";
import { Separator } from "@/components/ui/separator";
import { calculateQuizScore } from "../utils/api";

function QuizPage() {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 menit
  const selectedAnswersRef = useRef(selectedAnswers);
  const quizDataRef = useRef(quizData);
  const tutorialId = localStorage.getItem("tutorialId");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Inisialisasi quiz dengan pertanyaan acak
    // const randomQuiz = getRandomQuestions(DUMMY_QUIZ_DATA, 1, 3);
    // setQuizData(randomQuiz);
    const data = localStorage.getItem("question");
    console.log("load data form local storage[quiz page]:", data);
    if (data) {
      setQuizData(JSON.parse(data));
    }
  }, [tutorialId]);

  useEffect(() => {
    selectedAnswersRef.current = selectedAnswers;
  }, [selectedAnswers]);

  useEffect(() => {
    quizDataRef.current = quizData;
  }, [quizData]);

  async function validateQuiz(quizResults) {
    const result = await calculateQuizScore(quizResults);
    console.log("Validated quiz data:", result);
    if (!result) {
      console.error("Failed to validate quiz");
      return null;
    }

    return result;
  }

  const handleFinishQuiz = useCallback(async () => {
    console.log("Finishing quiz...");

    // Quiz selesai - generate unique ID
    const historyId = Math.random().toString(36).substring(2, 11);

    const quizResult = {
      quizId: tutorialId,
      answers: Object.entries(selectedAnswersRef.current).map(([questionId, answer]) => ({
        questionId: parseInt(questionId),
        answer,
      })),
      questions: quizDataRef.current?.questions || [],
      finishedAt: new Date().toISOString(),
    };

    console.log("Quiz result before validation:", quizResult);

    const result = await validateQuiz(quizResult);

    console.log("[FE] quiz result => ", result);

    const finalQuizResult = {
      historyId: historyId,
      quizId: quizResult.quizId,
      quizData: quizDataRef.current,
      answers: result?.answers ?? quizResult.answers,
      stats: result?.stats ?? null,
      finishedAt: result?.finishedAt ?? quizResult.finishedAt,
      feedback: result?.feedback ?? null,
    };

    console.log("Final quiz result:", finalQuizResult);

    // Ambil history hasil quiz sebelumnya
    const quizHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]");
    quizHistory.push(finalQuizResult);

    // Simpan ke localStorage
    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
    localStorage.setItem("lastQuizResult", JSON.stringify(finalQuizResult));

    console.log("Navigating to quiz result page...");
    // Navigate langsung ke halaman hasil quiz yang baru saja dikerjakan
    navigate(`/quiz/result/${historyId}`);
  }, [navigate, tutorialId]);

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
    <div className="flex justify-center w-full lg:w-3xl lg:shadow-2xl lg:rounded-2xl lg:my-5 bg-background">
      <div className=" px-6 py-4 w-full bg-">
        <QuizHeader
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          timeRemaining={timeRemaining}
        />
        <Separator className=" bg-primary h-0.5 mb-4 " />

        <QuizQuestion question={currentQuestion.question} />

        <QuizOptions
          options={currentQuestion.options}
          questionId={currentQuestion.id}
          selectedAnswer={selectedAnswers[currentQuestion.id]}
          onAnswerSelect={handleAnswerSelect}
        />
        <Separator className=" bg-primary h-0.5 mb-4" />

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
