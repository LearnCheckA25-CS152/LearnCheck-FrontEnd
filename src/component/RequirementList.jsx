import React from "react";
import { LuClipboardPen } from "react-icons/lu";

function RequirementList() {
    return (
        <article className="card-item">
           <LuClipboardPen fontSize={25}/>
           <h4>Syarat Nilai : </h4> 
           <p className="sub-item">80%</p>
        </article>
    )
}

export default RequirementList;