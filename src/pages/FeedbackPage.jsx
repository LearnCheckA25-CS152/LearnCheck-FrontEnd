import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LuMessageSquareText } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import ButtonFeedback from "../component/ButtonFeedback";

function FeedbackPage() {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState(null);
  const tutorialId = localStorage.getItem("tutorialId");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const quizHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]");
    const result = quizHistory.find((item) => item.historyId === resultId);

    if (!result) {
      navigate("/?tutorial=" + tutorialId + "&user=" + userId);
      return;
    }

    setFeedbackData(result);
  }, [resultId, navigate, tutorialId, userId]);

  const handleRestart = () => {
    navigate("/quiz");
  };

  const handleBackToHome = () => {
    navigate("/?tutorial=" + tutorialId + "&user=" + userId);
  };

  if (!feedbackData) {
    return <div className="flex items-center justify-center min-h-screen text-gray-600">Memuat feedback...</div>;
  }

  return (
    <div className="feedback-page app lg:w-3xl lg:shadow-2xl lg:rounded-2xl w-full lg:my-5 bg-background flex flex-col px-6 py-4">
      <LuMessageSquareText className="text-6xl mx-auto mb-4 rounded-full p-3.5" />
      <h3 className="text-2xl text-center">Rangkuman Sesi Kuis Anda!</h3>
      <h4 className="text-base mt-3 text-center text-muted-foreground">
        Berikut adalah analisa performa dan saran perbaikan yang dipersonalisasi oleh AI untuk Anda
      </h4>

      <div className="mt-6 space-y-4">
        <div>
          <h4 className="text-base font-bold">Statistik Performa:</h4>
          <div className="mt-2 space-y-1 text-muted-foreground">
            <p>• Total Soal: {feedbackData.stats?.total || 0}</p>
            <p>• Jawaban Benar: {feedbackData.stats?.correct || 0}</p>
            <p>• Jawaban Salah: {feedbackData.stats?.incorrect || 0}</p>
            <p>• Tidak Dijawab: {feedbackData.stats?.unanswered || 0}</p>
            <p className="font-semibold text-primary">• Skor: {feedbackData.stats?.percentage || 0}%</p>
          </div>
        </div>

        <Separator className="my-4 bg-primary h-0.5" />

        <div>
          <h4 className="text-base font-bold">Feedback AI:</h4>
          <p className="text-justify mt-2 text-muted-foreground leading-relaxed">
            {feedbackData.feedback || "Feedback tidak tersedia."}
          </p>
        </div>
      </div>

      <Separator className="my-4 bg-primary h-0.5" />
      <ButtonFeedback
        onRestart={handleRestart}
        onBackToHome={handleBackToHome}
      />
    </div>
  );
}

export default FeedbackPage;
