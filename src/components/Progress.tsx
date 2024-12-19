import React from 'react';

interface ProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}

export const Progress: React.FC<ProgressProps> = ({
  currentQuestion,
  totalQuestions,
  score,
}) => {
  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <span className="text-sm font-medium">Score: {score}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all"
          style={{
            width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};