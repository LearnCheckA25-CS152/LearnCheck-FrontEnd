import React from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import QuizOptionItemResult from "./QuizOptionItemResult";  
export function QuizQuestionResult({ question,options, currentQuestionIndex,userAnsweredData }) {
  console.log("options", options);
  return (
            <div className=" quiz-question-section mt-4">
              <h4 className=" font-semibold text-lg">
                {question}
              </h4>
              <RadioGroup defaultValue="option-one" className=" mt-4  w-full">
                {options.map(
                  (option) => (
                    <QuizOptionItemResult
                      key={option}
                      option={option}
                      currentQuestionIndex={currentQuestionIndex}
                      userAnsweredData={userAnsweredData}
                    />
                  )
                )}
              </RadioGroup>
            </div>
  );
}
export default QuizQuestionResult;