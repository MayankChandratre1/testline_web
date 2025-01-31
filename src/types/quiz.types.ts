export interface Option {
  id: number;
  description: string;
  is_correct: boolean;
  photo_url: string | null;
}

export interface Question {
  id: number;
  description: string;
  options: Option[];
  detailed_solution: string;
  topic: string;
  difficulty_level: string | null;
}

export interface QuizData {
  id: number;
  title: string;
  description: string;
  duration: number;
  topic: string;
  questions: Question[];
  correct_answer_marks: string;
  negative_marks: string;
  questions_count: number;
}

export interface QuizAttempt {
  quizId: number;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  attemptedAt: string;
}

export interface WrongAnswer {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  marks: number;
}

export interface QuizSummary {
  totalQuestions: number;
  attemptedQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  timeTaken: number;
  totalTime: number;
}