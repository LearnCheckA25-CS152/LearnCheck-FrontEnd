import { useCallback, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import QuizResultHeader from "../component/QuizResultHeader";
import QuizQuestionResult from "../component/QuizQuestionResult";
import ExplanationPanel from "../component/ExplanationPanel";
import QuizNavigationResult from "../component/QuizNavigationResult";
import { formatDate } from "../utils/quizHelpers";
import { LuMessageSquareText } from "react-icons/lu";

function QuizResultPage() {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [finishedAt, setFinishedAt] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const quizHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]");
  const { resultId } = useParams();
  const [resultData, setResultData] = useState(null);
  const tutorialId = localStorage.getItem("tutorialId");
  const userId = localStorage.getItem("userId");

  console.log("Tutorial ID from URL:", tutorialId);
  console.log("User ID from URL:", userId);

  console.log("Result ID from URL:", resultId);
  console.log("Result Data from History:", resultData);

  console.log(answers)
  console.log(quizHistory);

  useEffect(() => {
    const quizHistoryLocal = JSON.parse(localStorage.getItem("quizHistory") || "[]");
    const found = quizHistoryLocal.find((item) => item.historyId === resultId) || null;
    setResultData(found);
  }, [resultId]);

  useEffect(() => {
    // Simulasi pengambilan data kuis
    // const randomQuiz = getRandomQuestions(DUMMY_QUIZ_DATA, 1, 3);

    if(!resultData) return;
    
    const finishedAtValue = resultData?.finishedAt ?? null;
    setFinishedAt(formatDate(finishedAtValue));

    setQuizData(resultData?.quizData ?? null);
    const restoredAnswer = {};
    resultData.answers.forEach(item => {
      restoredAnswer[item.questionId] = item.answer;
    });

  setAnswers(restoredAnswer);
  }, [resultData]);

  // sementara
  const calculateQuizStats = useCallback(() => {
    if (!quizData?.questions) return null;
    const userAnsweredData = quizData.questions.map((question) => {
      const selectedAnswer = answers[question.id];
      const isCorrect = selectedAnswer === question.correct_answer;

      return {
        questionId: question.id,
        question: question.question,
        selectedAnswer,
        correctAnswer: question.correct_answer,
        explanation: question.explanation,
        isCorrect,
      };
    });
    const total = resultData?.stats?.total;
    const percentage = resultData?.stats?.percentage;
    const correct_answer = resultData?.stats?.correct;
    const incorrect = resultData?.stats?.incorrect;

    return {
      total,
      answered: total,
      correct : correct_answer,
      incorrect: incorrect,
      userAnsweredData,
      percentage,
      passRate: percentage >= 66,
    };
  }, [answers, quizData, resultData]);

  const stats = quizData ? calculateQuizStats() : null;
  const totalQuestions = quizData?.questions?.length || 0;
  const handleNextQuiz = useCallback(() => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < totalQuestions - 1) return prevIndex + 1;
      // finish
      navigate("/?tutorial=" + tutorialId+"&user="+ userId);
      return prevIndex;
    });
  }, [navigate, totalQuestions, tutorialId, userId]);

  const handlePrevious = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleRestart = useCallback(() => {
    navigate("/quiz");
  }, [navigate]);

  const handleViewFeedback = useCallback(() => {
    navigate(`/quiz/result/${resultId}/feedback`);
  }, [navigate, resultId]);

  if (!quizData) return <div className="flex items-center justify-center min-h-screen text-gray-600">Memuat history...</div>;

  return (
    <div className="quiz-result-page app lg:w-3xl lg:shadow-2xl lg:rounded-2xl w-full lg:my-5 bg-background">
      <QuizResultHeader
        passRate={stats?.passRate}
        percentage={resultData?.stats?.percentage}
        createdAt={finishedAt}
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
      <Separator className="my-4 bg-primary h-0.5 mb-4" />
      
      {resultData?.feedback && (
        <>
          <div className="mb-4">
            <Button 
              onClick={handleViewFeedback} 
              className="w-full"
              size="lg"
            >
              <LuMessageSquareText className="mr-2" />
              Lihat Feedback AI
            </Button>
          </div>
          <Separator className="my-4 bg-primary h-0.5 mb-4" />
        </>
      )}

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
