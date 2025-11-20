import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

function BtnStart() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/quiz');
    };

    return (
      <div className="homepage-action">
        <Button size="lg" onClick={() => handleStart()}>
          Mulai Pengerjaan
        </Button>
      </div>
    );
}

export default BtnStart;