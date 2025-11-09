import React from "react";
import { MdOutlineTimer } from "react-icons/md";

function TimeItem() {
    return (
        <article className="card-item">
           <MdOutlineTimer fontSize={25}/>
           <h4>Waktu : </h4> 
           <p className="sub-item">05:00</p>
        </article>
    )
}

export default TimeItem;