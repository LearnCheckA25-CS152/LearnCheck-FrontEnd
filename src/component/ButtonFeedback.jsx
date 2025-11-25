import React from "react";
import { Button } from "@/components/ui/button";
import { LuListRestart } from "react-icons/lu";
import { IoHome } from "react-icons/io5";

function ButtonFeedback(){
  return (
    <div className=" flex ju flex-row justify-end gap-4">
      <Button variant="outline" size="lg" className="">
        <LuListRestart  />
        Restart
      </Button>
      <Button size="lg" className="">
        Back to Home
      </Button>
    </div>
  );
}
export default ButtonFeedback;