import { Button } from "@/components/ui/button";
import { LuListRestart } from "react-icons/lu";
import { IoHome } from "react-icons/io5";

function ButtonFeedback({ onRestart, onBackToHome }) {
  return (
    <div className="flex flex-row justify-end gap-4">
      <Button variant="outline" size="lg" onClick={onRestart}>
        <LuListRestart />
        Restart
      </Button>
      <Button size="lg" onClick={onBackToHome}>
        <IoHome />
        Back to Home
      </Button>
    </div>
  );
}

export default ButtonFeedback;