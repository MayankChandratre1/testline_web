import { QuizAttempt } from '@/types/quiz.types';
import { History, Star, Target, Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'

const Stats = () => {
    const [userStats, setUserStats] = useState({
        totalQuizes: 0,
        totalScore: 0,
        lastQuiz: "",
        averageScore: 0,
      });
      useEffect(() => {
        const quizHistory = localStorage.getItem('quizhistory');
        if (quizHistory) {
          try {
            const history: QuizAttempt[] = JSON.parse(quizHistory);
            
            const stats = {
              totalQuizes: history.length,
              totalScore: history.reduce((acc, curr) => acc + curr.score, 0),
              lastQuiz: `${history[history.length - 1]?.quizTitle} (${history[history.length - 1]?.score})` || "No quiz taken",
              averageScore: Math.round(
                (history.reduce((acc, curr) => acc + curr.score, 0) / history.length) || 0
              ),
            };
    
            setUserStats(stats);
          } catch (error) {
            console.error("Error parsing quiz history:", error);
          }
        }
      }, []);
  return (
    <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Target size={20} className="text-purple-400" />
              </div>
              <h3 className="text-gray-400">Total Quizes</h3>
            </div>
            <p className="text-2xl font-bold">{userStats.totalQuizes}</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Trophy size={20} className="text-purple-400" />
              </div>
              <h3 className="text-gray-400">Total Score</h3>
            </div>
            <p className="text-2xl font-bold">{userStats.totalScore} pts</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Star size={20} className="text-purple-400" />
              </div>
              <h3 className="text-gray-400">Avg. Score</h3>
            </div>
            <p className="text-2xl font-bold">{userStats.averageScore}%</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <History size={20} className="text-purple-400" />
              </div>
              <h3 className="text-gray-400">Last Quiz</h3>
            </div>
            <p className="text-lg font-bold truncate">{userStats.lastQuiz}</p>
          </div>
        </div>
  )
}

export default Stats