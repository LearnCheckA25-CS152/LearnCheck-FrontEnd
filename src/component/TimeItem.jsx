import React from "react";

function TimeItem() {
    return (
        <article className="card-item">
           <img className="card-img" src="./src/assets/icon/stopwatch.png" alt="" />
           <h4>Waktu : </h4> 
           <p className="sub-item">05:00</p>
        </article>
    )
}

export default TimeItem;