import React from "react";
import Images from "../component/Images";
import CardList from "../component/CardList";
import BtnStart from "../component/BtnStart";
import HistoryList from "../component/HistoryList";

function HomePage() {
    return (
      <div className="app">
        <div className="quiz-info">
          <section className="image-content">
            <Images/>
          </section>
          <section className="title-content">
            <h2>Kategori : Membangun Web Service Menggunakan Node.js</h2>
          </section>
          <section className="rule-content">
            <h3>Aturan</h3>
            <p className="rule-subtitle">Apabila tidak memenuhi syarat kelulusan, maka Anda harus menunggu selama 1 menit untuk mengulang pengerjaan kuis kembali. Manfaatkan waktu tunggu tersebut untuk mempelajari kembali materi sebelumnya, ya.</p>
          </section>
          <section className="card-list">
            <CardList/>
          </section>
          <section className="btn-action">
            <BtnStart/>
          </section>
        </div>
        <div className="quiz-history">
          <section className="history">
            <h3>Riwayat Kuis :</h3>
            <HistoryList/>
          </section>
        </div>
      </div>
    )
}

export default HomePage;