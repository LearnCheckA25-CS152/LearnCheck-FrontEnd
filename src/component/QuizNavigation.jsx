import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Button } from "@/components/ui/button";

function QuizNavigation({ currentQuestionIndex, totalQuestions, onPrevious, onNext }) {
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="flex justify-between gap-4">
      <Button
        onClick={onPrevious}
        disabled={isFirstQuestion}
        size="lg"
        className="flex items-center gap-2  rounded-lg  cursor-pointer  disabled:cursor-not-allowed  ">
        <IoChevronBack />
        Previous
      </Button>
      <Button
        onClick={onNext}
        size="lg"
        className="flex items-center gap-2 rounded-lg cursor-pointer  ">
        {isLastQuestion ? "Finish" : "Next"}
        <IoChevronForward />
      </Button>
    </div>
  );
}

export default QuizNavigation;