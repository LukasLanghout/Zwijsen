'use client';

import { getExerciseById } from '@/lib/db';
import Link from 'next/link';
import { useState } from 'react';

interface ExercisePageProps {
  params: {
    id: string;
  };
}

export default function ExercisePage({ params }: ExercisePageProps) {
  const exercise = getExerciseById(params.id);
  const [currentVariation, setCurrentVariation] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">❌ Oefening niet gevonden</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            ← Terug naar overzicht
          </Link>
        </div>
      </div>
    );
  }

  const variation = exercise.variations[currentVariation];
  const isCorrect = parseInt(userAnswer) === variation.correctAnswer || userAnswer === String(variation.correctAnswer);

  const handleSubmit = () => {
    if (userAnswer.trim()) {
      setSubmitted(true);
      if (isCorrect) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentVariation < exercise.variations.length - 1) {
      setCurrentVariation(currentVariation + 1);
      setUserAnswer('');
      setSubmitted(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <header className="bg-white shadow-md border-b-4 border-green-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-green-600 hover:text-green-700 font-semibold">
            ← Terug naar overzicht
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Exercise Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{exercise.title}</h1>
          <p className="text-gray-600 mb-4">{exercise.description}</p>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              {exercise.gradeLevel.replace('group-', 'Groep ')}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {exercise.exerciseType}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                exercise.difficulty === 'easy'
                  ? 'bg-green-500'
                  : exercise.difficulty === 'medium'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
            >
              {exercise.difficulty === 'easy'
                ? '⭐ Makkelijk'
                : exercise.difficulty === 'medium'
                ? '⭐⭐ Gemiddeld'
                : '⭐⭐⭐ Moeilijk'}
            </span>
          </div>
        </div>

        {/* Main Exercise Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-2 border-green-200">
          {/* Variation Counter */}
          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm font-semibold text-gray-600">
              Variatie {currentVariation + 1} van {exercise.variations.length}
            </div>
            <div className="flex gap-1">
              {exercise.variations.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-8 rounded ${
                    idx === currentVariation ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Problem */}
          <div className="bg-green-50 rounded-lg p-6 mb-8 border-2 border-green-200">
            <p className="text-3xl font-bold text-gray-900 text-center">
              {variation.problem}
            </p>
          </div>

          {/* Hints */}
          {variation.hints && variation.hints.length > 0 && !submitted && (
            <details className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-300">
              <summary className="cursor-pointer font-semibold text-blue-900">
                💡 Hulp nodig?
              </summary>
              <ul className="mt-3 space-y-2">
                {variation.hints.map((hint, idx) => (
                  <li key={idx} className="text-sm text-blue-800">
                    • {hint}
                  </li>
                ))}
              </ul>
            </details>
          )}

          {/* Answer Input */}
          {!submitted ? (
            <div className="space-y-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Vul je antwoord in..."
                className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg font-semibold"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <button
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-bold rounded-lg transition"
              >
                ✓ Controleer Antwoord
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Result */}
              <div
                className={`p-6 rounded-lg text-center ${
                  isCorrect
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-red-100 border-2 border-red-500'
                }`}
              >
                <div className="text-3xl mb-2">
                  {isCorrect ? '🎉 Correct!' : '❌ Niet correct'}
                </div>
                <p
                  className={`text-lg font-semibold ${
                    isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {isCorrect
                    ? `Je antwoord ${userAnswer} is juist!`
                    : `Het juiste antwoord is ${variation.correctAnswer}`}
                </p>
              </div>

              {/* Explanation */}
              {variation.explanation && (
                <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="font-semibold text-blue-900 mb-2">📚 Uitleg:</p>
                  <p className="text-blue-800">{variation.explanation}</p>
                </div>
              )}

              {/* Work Steps */}
              {variation.workSteps && variation.workSteps.length > 0 && (
                <div className="p-6 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <p className="font-semibold text-purple-900 mb-3">📝 Stap voor stap:</p>
                  <ol className="space-y-2 text-purple-800">
                    {variation.workSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="font-bold text-purple-900">
                          {idx + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-4">
                {currentVariation < exercise.variations.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
                  >
                    Volgende Variatie →
                  </button>
                ) : (
                  <Link
                    href="/"
                    className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg text-center"
                  >
                    Terug naar Overzicht
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Score Card */}
        {submitted && currentVariation === exercise.variations.length - 1 && (
          <div className="bg-white rounded-lg shadow-lg p-8 border-4 border-green-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              📊 Je Resultaat
            </h2>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">
                {Math.round((score / exercise.variations.length) * 100)}%
              </div>
              <p className="text-lg text-gray-700 mb-4">
                Je hebt {score} van de {exercise.variations.length} variaties correct
                beantwoord
              </p>
              <Link
                href="/"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg inline-block"
              >
                ← Terug naar Overzicht
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
