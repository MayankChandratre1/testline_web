import QuizCard from "@/components/custom/QuizCard";
import Stats from "@/components/custom/Stats";
import { useQuiz } from "@/context/QuizContext";
import { QuizData } from "@/types/quiz.types";
import { useEffect, useState } from "react";

export default function Home() {
  const { data } = useQuiz();
  const [quizes, setQuizes] = useState<QuizData[]>([]);
  

  useEffect(() => {
    if (data) {
      setQuizes([data]);
    }
  }, [data]);

 

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Welcome to Testline Quiz
          </h1>
          <p className="text-gray-400 text-lg">
            Challenge yourself with our engaging quizzes
          </p>
        </div>
        <Stats />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizes.map((quiz) => (
           <QuizCard quiz={quiz} />
          ))}
        </div>

        {quizes.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            No quizzes available at the moment.
          </div>
        )}
      </div>
    </div>
  );
}