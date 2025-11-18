import React, { useEffect } from "react";
import Images from "../component/Images";
import CardList from "../component/CardList";
import BtnStart from "../component/BtnStart";
import HistoryList from "../component/HistoryList";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

function HomePage() {

    const params = new URLSearchParams(window.location.search);
    const tutorialId = params.get('tutorial');
    const userId = params.get('user');

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
  
     return (
      <div className="app lg:w-3xl lg:shadow-2xl lg:rounded-2xl w-full lg:my-5 bg-background">
        <div className="quiz-info ">
          <section className="image-content">
            <Images />
          </section>
          <section className="text-primary">
            <h2>Kategori : Membangun Web Service Menggunakan Node.js</h2>
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
            <CardList />
          </section>
          <section className="mt-1 text-center ">
            <Button size="lg" onClick={handleStart}>
              Mulai Pengerjaan
            </Button>
          </section>
        </div>
        <div className="quiz-history">
          <section className="history">
            <h3 className="text-primary ">Riwayat Kuis :</h3>
            <HistoryList />
          </section>  
        </div>
      </div>
    </div>
  );
}

export default HomePage;
