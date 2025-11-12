import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function QuizNavigation({ currentQuestionIndex, totalQuestions, onPrevious, onNext }) {
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="flex justify-between gap-4">
      <button
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 border border-[#D1D5DB] bg-white text-[#6B7280] hover:bg-[#F9FAFB] hover:border-[#9CA3AF] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-[#D1D5DB]">
        <IoChevronBack />
        Previous
      </button>
      <button
        onClick={onNext}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 border-none bg-[#1F2937] text-white hover:bg-[#111827]">
        {isLastQuestion ? "Finish" : "Next"}
        <IoChevronForward />
      </button>
    </div>
  );
}

export default QuizNavigation;