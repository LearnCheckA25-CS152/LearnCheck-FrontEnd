function QuizOptions({ options, questionId, selectedAnswer, onAnswerSelect }) {
  return (
    <div className="flex flex-col gap-3 mb-8">
      {options.map((option) => (
        <label
          key={`${questionId}-${option}`}
          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedAnswer === option
              ? "border-[#3B82F6] bg-[#EFF6FF] dark:bg-[#1E40AF]/10 dark:border-[#3B82F6]"
              : "border-[#E5E7EB] hover:border-[#3B82F6] hover:bg-[#F9FAFB] dark:border-[#374151] dark:hover:border-[#3B82F6] dark:hover:bg-[#1E40AF]/10"
          }`}
        >
          <input
            type="radio"
            name={`question-${questionId}`}
            value={option}
            checked={selectedAnswer === option}
            onChange={() => onAnswerSelect(option, questionId)}
            className="w-[18px] h-[18px] mr-3 cursor-pointer accent-[#3B82F6]"
          />
          <span className=" text-primary flex-1">{option}</span>
        </label>
      ))}
    </div>
  );
}

export default QuizOptions;
