import React from "react";
import BtnDetailHistory from "./BtnDetailHistory";

function HistoryItem() {
    return (
        <article className="history-item">
            <div className="background-icon-success background-icon">
                <img className="history-img" width={24} src="./src/assets/icon/mark-success.png" alt="" />
            </div>
           <p className="history-score">Skor : 80%</p> 
           <p className="history-time">Tanggal Kuis : 19 Agt 2025 pukul 00:32:26</p>
           <BtnDetailHistory/>
        </article>
    )
}

export default HistoryItem;