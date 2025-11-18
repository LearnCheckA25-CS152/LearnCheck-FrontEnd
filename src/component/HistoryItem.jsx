import React from "react";
import BtnDetailHistory from "./BtnDetailHistory";
import { TiTick } from "react-icons/ti";

function HistoryItem() {
    return (
      <article className=" border history-item">
          <div className="background-icon-success background-icon dark:text-green-700">
            <TiTick fontSize={16} className="text-chart-2" />
          </div>
          <p className=" text-primary">Skor : 80%</p>
          <p className="history-time text-muted-foreground">
            Tanggal Kuis : 19 Agt 2025 pukul 00:32:26
          </p>
        <BtnDetailHistory />
      </article>
    );
}

export default HistoryItem;