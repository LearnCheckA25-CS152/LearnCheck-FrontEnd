import React from "react";
import { Progress } from "@/components/ui/progress";

export function QuizResultHeader({
  passRate,
  percentage,
  createdAt,
  title,
  currentQuestionIndex,
  totalQuestions,
}) {
  return (
    <>
      <h3 className=" text-2xl font-medium">Kuis : {title}</h3>
      <p
        className={` ${
          passRate ? "text-success-foreground" : "text-danger-foreground"
        }  `}
      >
        Total Score : {percentage}{" "}
      </p>
      <div className="flex gap-3 mt-2">
        <div className=" flex-1">
          <Progress className="mt-1" value={percentage} />
          <div className=" flex justify-between mt-3 text-muted-foreground text-sm">
            <p>Tanggal Kuis: {createdAt}</p>
            <p>
              Soal {currentQuestionIndex + 1} dari {totalQuestions}{" "}
            </p>
          </div>
        </div>
        {passRate ? (
          <div className="bg-green-100 text-green-600 p-2 rounded-md border-green-600 border dark:bg-green-950 dark:border-green-500 dark:text-foreground">
            Lulus
          </div>
        ) : (
          <div className="bg-red-100 text-red-500 p-2 rounded-md border-red-600 border  dark:bg-red-950 dark:border-red-500 dark:text-foreground">
            Tidak Lulus
          </div>
        )}
      </div>
    </>
  );
}
export default QuizResultHeader;
