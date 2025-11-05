import React from "react";

function QuizOptions({ options, questionId, selectedAnswer, onAnswerSelect }) {
  return (
    <div className="quiz-options">
      {options.map((option) => (
        <label
          key={`${questionId}-${option}`}
          className={`option-item ${selectedAnswer === option ? "option-selected" : ""}`}>
          <input
            type="radio"
            name={`question-${questionId}`}
            value={option}
            checked={selectedAnswer === option}
            onChange={() => onAnswerSelect(option, questionId)}
            className="option-radio"
          />
          <span className="option-text">{option}</span>
        </label>
      ))}
    </div>
  );
}

export default QuizOptions;