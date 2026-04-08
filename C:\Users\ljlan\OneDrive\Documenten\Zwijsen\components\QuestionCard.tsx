'use client';

import { Question } from '@/lib/types';
import { useState } from 'react';

interface QuestionCardProps {
  question: Question;
  number: number;
  answer?: string | string[];
  onAnswer: (answer: string | string[]) => void;
  submitted: boolean;
  showExplanation: boolean;
}

export default function QuestionCard({
  question,
  number,
  answer,
  onAnswer,
  submitted,
  showExplanation
}: QuestionCardProps) {
  const [showHint, setShowHint] = useState(false);

  const isCorrect = () => {
    if (Array.isArray(question.correctAnswer)) {
      return Array.isArray(answer) && JSON.stringify(answer.sort()) === JSON.stringify(question.correctAnswer.sort());
    }
    return answer === question.correctAnswer;
  };

  const getQuestionTypeIcon = () => {
    switch (question.type) {
      case 'multiple-choice':
        return '⭕';
      case 'true-false':
        return '✅';
      case 'fill-blank':
        return '✏️';
      case 'open-question':
        return '📝';
      default:
        return '❓';
    }
  };

  const getBorderColor = () => {
    if (!submitted) return 'border-gray-200';
    return isCorrect() ? 'border-green-400' : 'border-red-400';
  };

  const getBackgroundColor = () => {
    if (!submitted) return 'bg-white';
    return isCorrect() ? 'bg-green-50' : 'bg-red-50';
  };

  return (
    <div className={`${getBackgroundColor()} border-2 ${getBorderColor()} rounded-lg p-6 transition`}>
      <div className="flex items-start gap-4">
        <div className="text-2xl">{getQuestionTypeIcon()}</div>
        <div className="flex-1">
          {/* Question Header */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Vraag {number}: {question.questionText}
            </h3>
            {submitted && (
              <div className="mt-2">
                {isCorrect() ? (
                  <span className="text-green-700 font-semibold">✓ Correct!</span>
                ) : (
                  <span className="text-red-700 font-semibold">✗ Niet correct</span>
                )}
              </div>
            )}
          </div>

          {/* Answer Input */}
          {question.type === 'multiple-choice' && (
            <div className="space-y-2">
              {question.options?.map((option, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={answer === option}
                    onChange={(e) => onAnswer(e.target.value)}
                    disabled={submitted}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-800">{option}</span>
                </label>
              ))}
            </div>
          )}

          {question.type === 'true-false' && (
            <div className="flex gap-4">
              {['true', 'false'].map((value) => (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={question.id}
                    value={value}
                    checked={answer === (value === 'true')}
                    onChange={(e) => onAnswer(e.target.value === 'true')}
                    disabled={submitted}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-800">{value === 'true' ? 'Waar ✓' : 'Onwaar ✗'}</span>
                </label>
              ))}
            </div>
          )}

          {question.type === 'fill-blank' && (
            <div>
              <input
                type="text"
                placeholder="Vul je antwoord in..."
                value={answer as string || ''}
                onChange={(e) => onAnswer(e.target.value)}
                disabled={submitted}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
          )}

          {question.type === 'open-question' && (
            <div>
              <textarea
                placeholder="Schrijf je antwoord hier..."
                value={answer as string || ''}
                onChange={(e) => onAnswer(e.target.value)}
                disabled={submitted}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none min-h-[100px]"
              />
            </div>
          )}

          {/* Hints */}
          {!submitted && question.hints && !answer && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              {showHint ? '👁️ Hint verbergen' : '💡 Hulp nodig?'}
            </button>
          )}

          {showHint && question.hints && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-sm text-blue-900">{question.hints[0]}</p>
            </div>
          )}

          {/* Explanation */}
          {submitted && showExplanation && question.explanation && (
            <div className={`mt-4 p-3 rounded-lg border-l-4 ${isCorrect() ? 'bg-green-50 border-green-400' : 'bg-orange-50 border-orange-400'}`}>
              <p className={`text-sm ${isCorrect() ? 'text-green-900' : 'text-orange-900'}`}>
                <strong>Uitleg:</strong> {question.explanation}
              </p>
            </div>
          )}

          {submitted && !isCorrect() && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
              <p className="text-sm text-red-900">
                <strong>Correct antwoord:</strong> {Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
