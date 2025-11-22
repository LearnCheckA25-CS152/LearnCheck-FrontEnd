import React from "react";
import BtnDetailHistory from "./BtnDetailHistory";
import { formatDate } from "../utils/quizHelpers";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

function HistoryItem({historyItem}) {
  
  const { historyId, stats } = historyItem;
  const { finishedAt: rawFinishedAt } = historyItem;
  const finishedAt = formatDate(rawFinishedAt);
  const percentage = stats.percentage;
  console.log("History Item Stats:", percentage);
  console.log("History Item ID:", historyId);
  console.log("Finished At:", finishedAt);

    return (
      <article data-ticle="true" className=" border history-item">
          
          {(percentage >= 66) ? (
            <div className="background-icon-success background-icon dark:text-green-700">
              <TiTick fontSize={16} className="text-chart-2" />
            </div>
          ) 
          : 
          (<div className="background-icon-danger background-icon dark:text-red-700">
              <ImCross fontSize={12} className="text-chart-2"  />
            </div>)}

          <p className=" text-primary">Skor : {percentage}%</p>
          <p className="history-time text-muted-foreground">
            Tanggal Kuis : {finishedAt}
          </p>
        <BtnDetailHistory historyId={historyId} />
      </article>
    );
}

export default HistoryItem;