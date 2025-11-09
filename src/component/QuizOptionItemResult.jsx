import React from "react";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function QuizResultHeader({  option, currentQuestionIndex, userAnsweredData }) {
  return (
    <div
      key={option}
      className={`flex items-center space-x-2  p-4 rounded-md border ${
        userAnsweredData[currentQuestionIndex]?.selectedAnswer === option
          ? userAnsweredData[currentQuestionIndex]?.isCorrect
            ? "bg-green-100 border-green-500"
            : "bg-red-100 border-red-500"
          : ""
      }`}
    >
      <RadioGroupItem
        value={option}
        checked={
          userAnsweredData[currentQuestionIndex]?.selectedAnswer === option
        }
        id={option}
        disabled
        className="bg-white"
      />
      <Label htmlFor={option} className=" text-sm">
        {option}
      </Label>
    </div>
  );
}
export default QuizResultHeader;