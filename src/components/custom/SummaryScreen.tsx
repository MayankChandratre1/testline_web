import { QuizSummary, WrongAnswer } from "@/types/quiz.types";
import { CheckCircle2, XCircle, Timer, Circle, AlertCircle, Eye, EyeOff, Trophy } from "lucide-react";

const SummaryScreen = ({summary,
    setRevealedAnswers,
    revealedAnswers,
    wrongAnswers, handleFinishQuiz
}:{
    summary : QuizSummary | null,
    setRevealedAnswers: React.Dispatch<React.SetStateAction<{
        [key: number]: boolean;
    }>>,
    revealedAnswers: { [key: number]: boolean }
    wrongAnswers: WrongAnswer[],
    handleFinishQuiz: () => void
}) => {
    if (!summary) return null;

    const toggleAnswer = (index: number) => {
      setRevealedAnswers(prev => ({
        ...prev,
        [index]: !prev[index]
      }));
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 ">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <h1 className="text-3xl col-span-2 font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Quiz Completed!
          </h1>

          <div className="grid col-span-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-2 mb-2 text-purple-400">
                <Trophy size={24} />
                <h3 className="font-bold">Final Score</h3>
              </div>
              <p className="text-3xl font-bold">{summary.score} pts</p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-2 mb-2 text-green-400">
                <CheckCircle2 size={24} />
                <h3 className="font-bold">Accuracy</h3>
              </div>
              <p className="text-3xl font-bold">
                {Math.round((summary.correctAnswers / summary.totalQuestions) * 100)}%
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-2 mb-2 text-blue-400">
                <Timer size={24} />
                <h3 className="font-bold">Time Taken</h3>
              </div>
              <p className="text-3xl font-bold">
                {Math.floor(summary.timeTaken / 60)}:{String(summary.timeTaken % 60).padStart(2, '0')}
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Circle className="text-purple-400" />
                <span>Total Questions: {summary.totalQuestions}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-400" />
                <span>Correct: {summary.correctAnswers}</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="text-red-400" />
                <span>Wrong: {summary.wrongAnswers}</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="text-yellow-400" />
                <span>Skipped: {summary.totalQuestions - summary.attemptedQuestions}</span>
              </div>
            </div>
          </div>

          {wrongAnswers.length > 0 && (
            <div className="bg-gray-800/50 rounded-xl p-6 mb-8 max-h-[30vh] overflow-y-auto ">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <XCircle className="text-red-400" />
                Wrong Answers Review
              </h2>
              <div className="space-y-4 custom-scrollbar">
                {wrongAnswers.map((answer, index) => (
                  <div
                    key={index}
                    className="bg-gray-700/30 rounded-lg p-4 space-y-3"
                  >
                    <p className="font-medium text-gray-200">
                      {index + 1}. {answer.question}
                    </p>
                    <div className="space-y-2">
                      <p className="text-red-400 text-sm flex items-center gap-2">
                        <XCircle size={16} />
                        Your answer: {answer.selectedAnswer}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">
                          {revealedAnswers[index] ? (
                            <span className="text-green-400">
                              Correct: {answer.correctAnswer}
                            </span>
                          ) : (
                            "Click to reveal correct answer"
                          )}
                        </p>
                        <button
                          onClick={() => toggleAnswer(index)}
                          className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
                        >
                          {revealedAnswers[index] ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                          {revealedAnswers[index] ? "Hide" : "Reveal"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleFinishQuiz}
            className="w-full col-span-2 bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-bold transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  };


  export default SummaryScreen