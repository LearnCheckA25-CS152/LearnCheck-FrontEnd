import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function QuizNavigation({ currentQuestionIndex, totalQuestions, onPrevious, onNext }) {
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="quiz-navigation">
      <button
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="nav-button nav-previous">
        <IoChevronBack />
        Previous
      </button>
      <button
        onClick={onNext}
        className="nav-button nav-next">
        {isLastQuestion ? "Finish" : "Next"}
        <IoChevronForward />
      </button>
    </div>
  );
}

export default QuizNavigation;