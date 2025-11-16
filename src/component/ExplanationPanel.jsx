import React from "react";
import { LuBadgeInfo } from "react-icons/lu";

export function ExplanationPanel({ explanation, isCorrect }) {
  return (
    <div
      className={`flex  space-x-2 mt-4 p-4  border-l-2 border-0 ${
        isCorrect
          ? "bg-green-100  border-green-600 dark:bg-green-950"
          : "bg-red-100  border-red-600 dark:bg-red-950"
      }`}
    >
      <LuBadgeInfo
        className={` w-6 h-6 ${isCorrect ? "text-green-900 dark:text-green-100" : "text-red-950 dark:text-red-100"}`}
      />
      <div className="w-full">
        <p className="text-foreground ">Penjelasan : </p>
        <p className="text-foreground ">{explanation} </p>
      </div>
    </div>
  );
}
export default ExplanationPanel;