import React from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";


function BtnDetailHistory({historyId}) {

    const navigate = useNavigate();

    const handlerDetailHistory = () => {
        console.log("Detail history clicked for ID:", historyId);
        navigate(`/quiz/result/${historyId}`);
    }

    return (    
        <Button  size="lg" className={"rounded-sm"} onClick={handlerDetailHistory}>Lihat Detail</Button> 
    )
}

export default BtnDetailHistory;