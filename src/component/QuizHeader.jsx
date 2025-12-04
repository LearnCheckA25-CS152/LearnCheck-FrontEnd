import { IoMdTime } from "react-icons/io";
import { formatTime } from "../utils/quizHelpers";
import { Progress } from "@/components/ui/progress";
import { useCallback } from "react";

function QuizHeader({ currentQuestionIndex, totalQuestions, timeRemaining }) {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const dynamicTimeColor = useCallback(() => {
    if (timeRemaining <= 60) {
      return "text-red-500";
    } else if (timeRemaining <= 150) {
      return "text-yellow-500";
    } else {
      return "text-green-500";
    }
  }, [timeRemaining]);

  return (
    <div className="mb-4 flex justify-between items-center gap-4">
      <div className="w-full">
        <div className="flex justify-between  items-center mb-2">
          <span className="text-sm font-medium text-primary">
            Soal {currentQuestionIndex + 1} dari {totalQuestions}
          </span>
          <span className="text-sm font-semibold text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        {/* <div className="w-full h-2 bg-[#E5E7EB] rounded mb-3 overflow-hidden">
          <div
            className="h-full bg-[#3B82F6] transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          ></div>
          
        </div> */}
        <Progress className="mt-1" value={progress} />
      </div>
      <div className="flex items-center gap-1.5 justify-end">
        <IoMdTime className={`w-7 h-7 ${dynamicTimeColor()}`} />
        <span className={`text-lg font-medium ${dynamicTimeColor()}`}>
          {formatTime(timeRemaining)}
        </span>
      </div>
    </div>
  );
}

export default QuizHeader;
