import React from "react";
import { LuLayoutList } from "react-icons/lu";

function QuestionItem() {
    return (
        <article className="p-4 rounded-[8px] bg-card text-card-foreground  border w-[30%]">
           <LuLayoutList fontSize={25}/>
           <h4>Jumlah Soal : </h4> 
           <p className="text-muted-foreground">3 Soal</p>
        </article>
    )
}

export default QuestionItem;