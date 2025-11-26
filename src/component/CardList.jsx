import React from "react";
import QuestionItem from "./QuestionItem";
import TimeItem from "./TimeItem";
import RequirementList from "./RequirementList";

function CardList({ quizData }) {
    const questionCount = quizData?.questions.length || 0;
    console.log("question => ", questionCount);
    return (
        <>
            <QuestionItem questionCount={questionCount} />
            <TimeItem/>
            <RequirementList />
        </>
    )
}

export default CardList;