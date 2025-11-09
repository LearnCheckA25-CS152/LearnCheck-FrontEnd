import React from "react";
import { Button } from "@/components/ui/button";
import { LuListRestart } from "react-icons/lu";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

function QuizNavigationResult({ isCorrect, currentQuestionIndex, handleRestart, handlePrevious, handleNextQuiz, totalQuestions }) {
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
        <Button variant="default" onClick={handleRestart}>
          <LuListRestart />
          Restart
        </Button>
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <GrFormPrevious />
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={handleNextQuiz}
          disabled={currentQuestionIndex === totalQuestions - 1}
        >
          Next
          <GrFormNext />
        </Button>
      </div>
    </div>
  );
}

export default QuizNavigationResult;