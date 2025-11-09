import React from "react";
import { LuLayoutList } from "react-icons/lu";

function QuestionItem() {
    return (
        <article className="card-item">
           <LuLayoutList fontSize={25}/>
           <h4>Jumlah Soal : </h4> 
           <p className="sub-item">3 Soal</p>
        </article>
    )
}

export default QuestionItem;