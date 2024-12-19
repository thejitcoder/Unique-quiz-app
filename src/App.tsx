import React, { useState, useCallback, useEffect } from 'react';
import { questions } from './data/questions';
import { QuizState } from './types/quiz';
import { Timer } from './components/Timer';
import { Progress } from './components/Progress';
import { QuestionCard } from './components/QuestionCard';
import { Results } from './components/Results';
import { Brain } from 'lucide-react';

const INITIAL_TIME = 30;

function App() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: {},
    timeRemaining: INITIAL_TIME,
    isFinished: false,
  });

  const resetQuiz = useCallback(() => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      timeRemaining: INITIAL_TIME,
      isFinished: false,
    });
  }, []);

  useEffect(() => {
    if (!quizState.isFinished && quizState.timeRemaining > 0) {
      const timer = setInterval(() => {
        setQuizState((prev) => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizState.isFinished, quizState.timeRemaining]);

  const handleAnswer = useCallback((answer: number) => {
    const currentQuestion = questions[quizState.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    setQuizState((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      answers: { ...prev.answers, [currentQuestion.id]: answer },
      timeRemaining: INITIAL_TIME,
      currentQuestionIndex: 
        prev.currentQuestionIndex === questions.length - 1 
          ? prev.currentQuestionIndex 
          : prev.currentQuestionIndex + 1,
      isFinished: prev.currentQuestionIndex === questions.length - 1,
    }));
  }, [quizState.currentQuestionIndex]);

  const handleTimeUp = useCallback(() => {
    setQuizState((prev) => ({
      ...prev,
      currentQuestionIndex: 
        prev.currentQuestionIndex === questions.length - 1 
          ? prev.currentQuestionIndex 
          : prev.currentQuestionIndex + 1,
      timeRemaining: INITIAL_TIME,
      isFinished: prev.currentQuestionIndex === questions.length - 1,
    }));
  }, []);

  const currentQuestion = questions[quizState.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold">Quick Quiz</h1>
          </div>
          {!quizState.isFinished && (
            <div className="flex justify-center gap-8 mb-8">
              <Timer
                timeRemaining={quizState.timeRemaining}
                onTimeUp={handleTimeUp}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-6">
          {!quizState.isFinished ? (
            <>
              <Progress
                currentQuestion={quizState.currentQuestionIndex}
                totalQuestions={questions.length}
                score={quizState.score}
              />
              <QuestionCard
                question={currentQuestion}
                selectedAnswer={quizState.answers[currentQuestion.id]}
                onSelectAnswer={handleAnswer}
                isAnswered={currentQuestion.id in quizState.answers}
              />
            </>
          ) : (
            <Results
              score={quizState.score}
              totalQuestions={questions.length}
              onRestart={resetQuiz}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;