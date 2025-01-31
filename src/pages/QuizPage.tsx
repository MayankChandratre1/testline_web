import SummaryScreen from "@/components/custom/SummaryScreen";
import { useQuiz } from "@/context/QuizContext";
import {  QuizAttempt, QuizSummary, WrongAnswer } from "@/types/quiz.types";
import { Clock, ArrowRight, ArrowLeft, Send } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";




const QuizPage = () => {
  const { id } = useParams();
  const { data } = useQuiz();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState<QuizSummary | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [revealedAnswers, setRevealedAnswers] = useState<{ [key: number]: boolean }>({});
  const initialTime = data?.duration ? data.duration * 60 : 60;
  const pageRef = useRef<HTMLDivElement>(null);
  const questionCardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!data || data.id.toString() !== id) {
        return;
    }
    setTimeLeft(data.duration * 60);
  }, [data, id]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

 

  const handleOptionSelect = (questionId: number, optionId: number) => {
    const scrollPos = questionCardRef.current?.scrollTop || 0;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));

    // Maintain scroll position after selection
    requestAnimationFrame(() => {
      if (questionCardRef.current) {
        questionCardRef.current.scrollTop = scrollPos;
      }
    });
  };

  const handleSubmit = () => {
    if (!data) return;
    
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;

    Object.entries(selectedAnswers).forEach(([questionId, optionId]) => {
      const question = data.questions.find(q => q.id === parseInt(questionId));
      const selectedOption = question?.options.find(o => o.id === optionId);
      
      if (selectedOption?.is_correct) {
        score += parseInt(data.correct_answer_marks);
        correctCount++;
      } else {
        score -= parseInt(data.negative_marks);
        setWrongAnswers(prev => [
          ...prev,
          {
            question: question?.description || '',
            selectedAnswer: selectedOption?.description || '',
            correctAnswer: question?.options.find(o => o.is_correct)?.description || '',
            marks: parseInt(data.negative_marks)
          }
        ]);
        wrongCount++;
      }
    });

    const quizSummary: QuizSummary = {
      totalQuestions: data.questions_count,
      attemptedQuestions: Object.keys(selectedAnswers).length,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      score,
      timeTaken: initialTime - timeLeft,
      totalTime: initialTime
    };

    setSummary(quizSummary);
    setShowSummary(true);
  };

  const handleFinishQuiz = () => {
    if (!data || !summary) return;

    const attempt: QuizAttempt = {
      quizId: data.id,
      quizTitle: data.title,
      score: summary.score,
      totalQuestions: data.questions_count,
      attemptedAt: new Date().toISOString(),
    };
    
    const history = JSON.parse(localStorage.getItem('quizhistory') || '[]');
    localStorage.setItem('quizhistory', JSON.stringify([...history, attempt]));
    navigate('/');
  };

  const handleNavigation = (direction: 'next' | 'prev') => {
    
    setCurrentQuestion(prev => {
      if (direction === 'next') {
        return Math.min(data!.questions_count - 1, prev + 1);
      }
      return Math.max(0, prev - 1);
    });

    // Reset scroll position after question change
    requestAnimationFrame(() => {
      if (questionCardRef.current) {
        questionCardRef.current.scrollTop = 0;
      }
    });
  };

  if (!data) return null;

  // Modify the main return to use screen transition
  return showSummary ? (
    <SummaryScreen revealedAnswers={revealedAnswers} setRevealedAnswers={setRevealedAnswers} summary={summary} handleFinishQuiz={handleFinishQuiz} wrongAnswers={wrongAnswers}  />
  ) : (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8" ref={pageRef}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <div className="flex items-center gap-2 text-purple-400">
            <Clock size={20} />
            <span>
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div 
          ref={questionCardRef}
          className="bg-gray-800 rounded-xl p-6 mb-8 max-h-[60vh] overflow-y-auto custom-scrollbar"
        >
          <p className="text-sm text-gray-400 mb-4">
            Question {currentQuestion + 1} of {data.questions_count}
          </p>
          <p className="text-xl mb-8">{data.questions[currentQuestion].description}</p>

          <div className="space-y-4">
            {data.questions[currentQuestion].options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(data.questions[currentQuestion].id, option.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedAnswers[data.questions[currentQuestion].id] === option.id
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                {option.description}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => handleNavigation('prev')}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={20} />
            Previous
          </button>

          {currentQuestion === data.questions_count - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700"
            >
              <Send size={20} />
              Submit
            </button>
          ) : (
            <button
              onClick={() => handleNavigation('next')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700"
            >
              Next
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;