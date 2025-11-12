function QuizQuestion({ question }) {
  return (
    <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
      <h3 className="text-lg font-medium text-[#1F2937] leading-[1.6]">{question}</h3>
    </div>
  );
}

export default QuizQuestion;