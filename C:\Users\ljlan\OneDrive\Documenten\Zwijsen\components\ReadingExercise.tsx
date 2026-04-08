'use client';

import { Exercise, Question } from '@/lib/types';
import { useState } from 'react';
import QuestionCard from './QuestionCard';

interface ReadingExerciseProps {
  exercise: Exercise;
  onSubmit?: (answers: Record<string, string | string[]>) => void;
}

export default function ReadingExercise({ exercise, onSubmit }: ReadingExerciseProps) {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === exercise.questions.length) {
      setSubmitted(true);
      onSubmit?.(answers);
    }
  };

  const calculateScore = (): number => {
    if (exercise.questions.length === 0) return 0;

    let correct = 0;
    exercise.questions.forEach(q => {
      const answer = answers[q.id];
      if (Array.isArray(q.correctAnswer)) {
        if (Array.isArray(answer) && JSON.stringify(answer.sort()) === JSON.stringify(q.correctAnswer.sort())) {
          correct++;
        }
      } else {
        if (answer === q.correctAnswer) {
          correct++;
        }
      }
    });

    return Math.round((correct / exercise.questions.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{exercise.title}</h1>
            <div className="flex gap-3 flex-wrap">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {exercise.gradeLevel.replace('group-', 'Groep ')}
              </span>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                {exercise.difficulty === 'easy' ? 'Makkelijk' : exercise.difficulty === 'medium' ? 'Gemiddeld' : 'Moeilijk'}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {exercise.topic}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                ⏱️ {exercise.estimatedTime} min
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reading Section */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 mb-8 border-2 border-blue-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">📖 Lees de tekst</h2>
            <div className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap font-serif">
              {exercise.textPassage}
            </div>
          </div>

          {/* Questions Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">❓ Vragen</h2>
            {exercise.questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                number={index + 1}
                answer={answers[question.id]}
                onAnswer={(answer) => handleAnswer(question.id, answer)}
                submitted={submitted}
                showExplanation={showExplanations}
              />
            ))}
          </div>

          {/* Action Buttons */}
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== exercise.questions.length}
              className="mt-8 w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold rounded-lg transition"
            >
              {Object.keys(answers).length === exercise.questions.length ? '✓ Inleveren' : `${exercise.questions.length - Object.keys(answers).length} vragen nog niet beantwoord`}
            </button>
          ) : (
            <div className="mt-8 space-y-4">
              <button
                onClick={() => setShowExplanations(!showExplanations)}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
              >
                {showExplanations ? '👁️ Verbergen' : '👁️ Uitleg tonen'}
              </button>
              <button
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                  setShowExplanations(false);
                }}
                className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition"
              >
                🔄 Opnieuw proberen
              </button>
            </div>
          )}
        </div>

        {/* Score Card */}
        {submitted && (
          <div className="lg:col-span-1">
            <div className="sticky top-4 bg-white rounded-lg shadow-lg p-6 border-4 border-indigo-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">📊 Je Resultaat</h3>

              <div className="mb-6">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <svg className="transform -rotate-90 w-48 h-48">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke={calculateScore() >= 80 ? '#10b981' : calculateScore() >= 60 ? '#f59e0b' : '#ef4444'}
                      strokeWidth="16"
                      strokeDasharray={`${(calculateScore() / 100) * 552.92} 552.92`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold text-gray-900">
                      {calculateScore()}%
                    </div>
                    <div className="text-sm text-gray-600">
                      {calculateScore() >= 80 ? '🎉 Prima!' : calculateScore() >= 60 ? '👍 Goed!' : '💪 Verder oefenen'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-600 mb-2">Goed beantwoord:</div>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((calculateScore() / 100) * exercise.questions.length)}/{exercise.questions.length}
                </div>
              </div>

              <div className="text-xs text-gray-500 text-center">
                ✨ Goed werk! Probeer het volgende keer beter te doen.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
