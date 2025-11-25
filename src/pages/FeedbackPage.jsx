import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuMessageSquareText } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import ButtonFeedback from "../component/ButtonFeedback";

function FeedbackPage() {
  // const navigate = useNavigate();
  useEffect(() => {
    
  }, []);


  // const handleGoToHome = () => {
  //   navigate("/quiz");
  // };

  return (
    <div className="feedback-page app  lg:w-3xl lg:shadow-2xl lg:rounded-2xl w-full lg:my-5 bg-background flex flex-col px-6 py-4 ">
      <LuMessageSquareText className="text-6xl mx-auto mb-4 rounded-full p-3.5 " />
      <h3 className=" text-2xl text-center">Rangkuman Sesi Kuis Anda!</h3>
      <h4 className="text-base mt-3 text-center">
        Berikut adalah analisa performa dan saran perbaikan yang dipersonalisasi
        oleh kami untuk Anda
      </h4>
      <h4 className="mt-4 text-base font-bold ">Rangkuman Performa : </h4>
      <p className="text-justify ">
        Secara keseluruhan, performa Anda cukup baik dengan skor 67%. Anda
        menunjukkan pemahaman yang kuat pada topik Tata Surya dan benda-benda
        langit di dalamnya. Namun, terdapat sedikit kebingungan dalam membedakan
        antara planet dan jenis bintang, serta konsep galaksi. Kecepatan
        menjawab Anda konsisten, menunjukkan kepercayaan diri pada sebagian
        besar pertanyaan. Pertanyaan yang salah dijawab cenderung memakan waktu
        lebih lama, menandakan keraguan pada topik tersebut.
      </p>
      <Separator className="my-4 bg-primary h-0.5 " />
      <ButtonFeedback />
    </div>
  );
}

export default FeedbackPage;