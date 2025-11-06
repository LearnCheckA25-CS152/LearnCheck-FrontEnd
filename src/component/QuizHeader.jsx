import React from "react";
import { IoMdTime } from "react-icons/io";
import { formatTime } from "../utils/quizHelpers";

function QuizHeader({ currentQuestionIndex, totalQuestions, timeRemaining }) {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="quiz-header">
      <div className="quiz-progress-info">
        <span className="quiz-progress-text">
          Soal {currentQuestionIndex + 1} dari {totalQuestions}
        </span>
        <span className="quiz-progress-percentage">{Math.round(progress)}%</span>
      </div>
      <div className="quiz-progress-bar">
        <div
          className="quiz-progress-fill"
          style={{ width: `${progress}%` }}></div>
      </div>
      <div className="quiz-timer">
        <IoMdTime className="timer-icon" />
        <span className="timer-text">{formatTime(timeRemaining)}</span>
      </div>
    </div>
  );
}

export default QuizHeader;