import React from "react";
import { LuClipboardList } from "react-icons/lu";

function Images() {
    return (
        <div className="w-[100px] h-[100px] bg-accent flex items-center justify-center rounded-[100px] mx-auto">
            <LuClipboardList className=" text-primary" fontSize={64}/>
        </div>
    )
}

export default Images