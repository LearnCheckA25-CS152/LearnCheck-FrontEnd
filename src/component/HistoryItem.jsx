import React from "react";
import BtnDetailHistory from "./BtnDetailHistory";
import { TiTick } from "react-icons/ti";

function HistoryItem() {
    return (
        <article className="history-item">
            <div className="background-icon-success background-icon">
               <TiTick fontSize={16} className="text-chart-2"/>
            </div>
           <p className="history-score">Skor : 80%</p> 
           <p className="history-time">Tanggal Kuis : 19 Agt 2025 pukul 00:32:26</p>
           <BtnDetailHistory/>
        </article>
    )
}

export default HistoryItem;