export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: Record<number, number>;
  timeRemaining: number;
  isFinished: boolean;
}