import React from "react";
import { MdOutlineTimer } from "react-icons/md";

function TimeItem() {
    return (
      <article className="p-4 rounded-[8px] bg-card text-card-foreground  border w-[30%]">
        <MdOutlineTimer fontSize={25} />
        <h4>Waktu : </h4>
        <p className="text-muted-foreground">05:00</p>
      </article>
    );
}

export default TimeItem;