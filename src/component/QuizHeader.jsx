import { IoMdTime } from "react-icons/io";
import { formatTime } from "../utils/quizHelpers";

function QuizHeader({ currentQuestionIndex, totalQuestions, timeRemaining }) {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-[#1F2937]">
          Soal {currentQuestionIndex + 1} dari {totalQuestions}
        </span>
        <span className="text-sm font-semibold text-[#1F2937]">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-[#E5E7EB] rounded mb-3 overflow-hidden">
        <div
          className="h-full bg-[#3B82F6] transition-[width] duration-300"
          style={{ width: `${progress}%` }}></div>
      </div>
      <div className="flex items-center gap-1.5 justify-end">
        <IoMdTime className="w-[18px] h-[18px] text-[#22C55E]" />
        <span className="text-sm font-medium text-[#22C55E]">{formatTime(timeRemaining)}</span>
      </div>
    </div>
  );
}

export default QuizHeader;