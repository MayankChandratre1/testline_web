import { QuizData } from "@/types/quiz.types";
import { AlertCircle, Clock, PlayCircle, Trophy } from "lucide-react"
import { useNavigate } from "react-router-dom";

const QuizCard = ({quiz}:{
    quiz:QuizData
}) => {
  const navigate = useNavigate();

  return (
    <div
              key={quiz.id}
              className="bg-gray-800 rounded-xl p-6 hover:transform  transition-all duration-300 border border-gray-700 hover:border-purple-500 group"
            >
              <h2 className="text-2xl font-bold mb-3 group-hover:text-purple-400">
                {quiz.title}
                <p className="w-fit px-3 mt-3 py-1 bg-purple-500/20 text-purple-400 rounded-md text-xs">
                  {quiz.topic}
                </p>
              </h2>
              <p className="text-gray-400 mb-4 line-clamp-2">
                {quiz.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock size={16} />
                  <span>{quiz.duration} mins</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Trophy size={16} />
                  <span>+{quiz.correct_answer_marks} pts</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <AlertCircle size={16} />
                  <span>-{quiz.negative_marks} pts</span>
                </div>
              </div>

              <div className="flex gap-4">
                
                <button
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                  className="w-full flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <PlayCircle size={20} />
                  Start
                </button>
              </div>
            </div>
  )
}

export default QuizCard