import React from "react";
import { useNavigate } from "react-router-dom";

function BtnStart() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/quiz');
    };

    return (
        <div className="homepage-action">
            <button className="btn-start" type="button" onClick={handleStart}>Mulai Pengerjaan</button>
        </div>
    )
}

export default BtnStart;