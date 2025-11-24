import React from "react";
import { LuClipboardPen } from "react-icons/lu";

function RequirementList() {
    return (
      <article className="p-4 rounded-[8px] bg-card text-card-foreground  border w-[30%]">
        <LuClipboardPen fontSize={25} />
        <h4>Syarat Nilai : </h4>
        <p className="text-muted-foreground">66%</p>
      </article>
    );
}

export default RequirementList;