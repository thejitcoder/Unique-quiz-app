import React from 'react';
import { Trophy } from 'lucide-react';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const Results: React.FC<ResultsProps> = ({
  score,
  totalQuestions,
  onRestart,
}) => {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 text-center">
      <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-xl mb-6">
        Your score: {score} out of {totalQuestions} ({percentage.toFixed(1)}%)
      </p>
      <button
        onClick={onRestart}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Better luck next time
      </button>
    </div>
  );
};