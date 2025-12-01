import React, { useEffect, useState } from "react";
import Images from "../component/Images";
import CardList from "../component/CardList";
import BtnStart from "../component/BtnStart";
import HistoryList from "../component/HistoryList";
import { Button } from "../components/ui/button";
import { generateQuiz } from "../utils/api";

function HomePage() {
    const params = new URLSearchParams(window.location.search);
    const [quizData, setQuizData] = useState(null);
    const tutorialId = params.get('tutorial');
    const userId = params.get('user');

    const quizHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]");
    console.log('[homepage] quiz history => ', quizHistory);

    const filteredHistory = quizHistory.filter((items) => items.quizId === tutorialId);
    console.log('[homepage] filtered history => ', filteredHistory);

    console.log("quiz data [homepage] => ", quizData);
    
    useEffect(() => {
      fetchQuiz(tutorialId);
    }, [tutorialId]);

    async function fetchQuiz(tutorialId) {
      const result = await generateQuiz(tutorialId);
      console.log("Fetched quiz data [homepage]:", result);
      if (!result) {
        console.error("Failed to fetch quiz");
        const fallback = { title: "Quiz", questions: [] };
        setQuizData(fallback);
        localStorage.setItem("question", JSON.stringify(fallback));
        return;
      }

      const data = { title: result.title, questions: result.questions };
      setQuizData(data);
      localStorage.setItem("question", JSON.stringify(data));
    };

    useEffect(() => {
      const tutorialIdFromStorage = localStorage.getItem("tutorialId");
      if(tutorialId != tutorialIdFromStorage){
        localStorage.setItem("tutorialId", tutorialId);
      }
      const userIdFromStorage = localStorage.getItem("userId");
      if(userId != userIdFromStorage){
        localStorage.setItem("userId", userId);
      }
    }, [tutorialId, userId]);

    console.log("Tutorial ID from URL:", tutorialId);
    console.log("User ID from URL:", userId);

    if (!quizData)
      return <div className="flex items-center justify-center min-h-screen text-gray-600">Menyiapkan soal...</div>;
  
     return (
      <div className="app lg:w-3xl lg:shadow-2xl lg:rounded-2xl w-full lg:my-5 bg-background">
        <div className="quiz-info ">
          <section className="image-content">
            <Images />
          </section>
          <section className="text-primary">
            <h2>Kategori : {quizData?.title}</h2>
          </section>
          <section className="text-center">
            <h3>Aturan</h3>
            <p className="text-muted-foreground">
              Apabila tidak memenuhi syarat kelulusan, maka Anda harus menunggu
              selama 1 menit untuk mengulang pengerjaan kuis kembali. Manfaatkan
              waktu tunggu tersebut untuk mempelajari kembali materi sebelumnya,
              ya.
            </p>
          </section>
          <section className="card-list">
            <CardList quizData={quizData} />
          </section>
          <section className="mt-1 text-center ">
            <BtnStart/>
          </section>
        </div>
        <div className="quiz-history">
          <section className="history">
            <h3 className="text-primary ">Riwayat Kuis :</h3>
            {(quizHistory.length === 0) ? (
              <p className="text-muted-foreground">Belum ada riwayat kuis.</p>
            ) : (
              <HistoryList quizHistory={filteredHistory} />
            )}
          </section>  
        </div>
      </div>
  );
}

export default HomePage;
