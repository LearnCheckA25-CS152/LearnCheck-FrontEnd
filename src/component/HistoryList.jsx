import React from "react";
import HistoryItem from "./HistoryItem";

function HistoryList({quizHistory}) {
    return (
        <>
        {quizHistory.map((historyItem) => (
            <HistoryItem key={historyItem.historyId} historyItem={historyItem} />
        ))}
        </>
    )
}

export default HistoryList;