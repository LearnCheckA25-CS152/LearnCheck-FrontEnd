import React from "react";
import { Button } from "@/components/ui/button";
import { LuListRestart } from "react-icons/lu";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

function QuizNavigationResult({ isCorrect, currentQuestionIndex, handleRestart, handlePrevious, handleNextQuiz, totalQuestions }) {
  const nextButton = (currentQuestionIndex, totalQuestions) => {
    if (currentQuestionIndex === totalQuestions - 1) {
      return (
        <Button  variant="outline" onClick={handleNextQuiz} size="lg">
          Finish
          <GrFormNext />
        </Button>
      );
    }
    return (
      <Button variant="default" onClick={handleNextQuiz} size="lg">
        Next
        <GrFormNext />
      </Button>
    );
  };
  return (
    <div className=" quiz-navigation mt-4 flex justify-between align-middle">
      {isCorrect ? (
        <p>
          Jawaban : <span className="text-green-600 ">Benar</span>
        </p>
      ) : (
        <p>
          Jawaban : <span className="text-red-600">Salah</span>
        </p>
      )}
      <div className=" flex gap-2">
        <Button variant="outline" size="lg" onClick={handleRestart}>
          <LuListRestart  className="mr-1"/>
          Restart
        </Button>
        <Button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          variant="default"
          size="lg"
        >
          <GrFormPrevious />
          Previous
        </Button>
        {nextButton(currentQuestionIndex, totalQuestions)}
      </div>
    </div>
  );
}

export default QuizNavigationResult;