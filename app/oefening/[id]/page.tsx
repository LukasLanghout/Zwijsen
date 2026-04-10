'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

interface Variation {
  id: string;
  problem: string;
  correct_answer: string;
  explanation: string | null;
  hints: string[];
  workSteps: string[];
}

interface Exercise {
  id: string;
  title: string;
  description: string | null;
  exercise_type: string;
  grade_level: string;
  difficulty: string;
  variations: Variation[];
}

// --- HTE box component ---
function HTEBox({ label, value, onChange, disabled, correct, showResult }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  correct?: boolean;
  showResult: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-12 h-10 flex items-center justify-center text-sm font-bold text-white"
        style={{ backgroundColor: '#4A90C4', border: '2px solid #2C6A9A' }}
      >
        {label}
      </div>
      <input
        type="text"
        maxLength={1}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/, ''))}
        disabled={disabled}
        className="w-12 h-12 text-center text-2xl font-bold border-2 focus:outline-none"
        style={{
          borderColor: showResult ? (correct ? '#28A745' : '#DC3545') : '#4A90C4',
          backgroundColor: showResult ? (correct ? '#D4EDDA' : '#F8D7DA') : 'white',
          borderTop: 'none',
        }}
      />
    </div>
  );
}

// --- Parse what format to display ---
type Format = 'hte-split' | 'hte-samenvoeg' | 'som' | 'text';

function detectFormat(problem: string, exercise_type: string, correct_answer: string): Format {
  const p = problem.toLowerCase();
  const a = correct_answer.toLowerCase();
  const t = exercise_type.toLowerCase();

  if (t === 'splits' || p.includes('splits') || a.includes('h=')) return 'hte-split';
  if (t === 'samenvoegen' || p.includes('samenvoeg') || p.includes('voeg samen')) return 'hte-samenvoeg';
  if (/^\d+$/.test(correct_answer.trim())) return 'som';
  return 'text';
}

function extractNumberFromProblem(problem: string): string | null {
  // Extract the first 3-digit number from the problem
  const m = problem.match(/\b(\d{1,4})\b/);
  return m ? m[1] : null;
}

function parseHTEAnswer(answer: string): { h: string; t: string; e: string } | null {
  // Match "H=3, T=4, E=7" or "3, 4, 7" or "347"
  const detailed = answer.match(/H[=:]\s*(\d+)[,\s]+T[=:]\s*(\d+)[,\s]+E[=:]\s*(\d+)/i);
  if (detailed) return { h: detailed[1], t: detailed[2], e: detailed[3] };

  const num = answer.replace(/\D/g, '');
  if (num.length === 3) return { h: num[0], t: num[1], e: num[2] };
  if (num.length === 4) return { h: num[0] + num[1], t: num[2], e: num[3] };

  return null;
}

// --- HTE Split exercise ---
function HTESplitExercise({ variation, onSubmit, submitted }: {
  variation: Variation;
  onSubmit: (answer: string, correct: boolean) => void;
  submitted: boolean;
}) {
  const [h, setH] = useState('');
  const [t, setT] = useState('');
  const [e, setE] = useState('');
  const tRef = useRef<HTMLInputElement>(null);
  const eRef = useRef<HTMLInputElement>(null);

  const sourceNumber = extractNumberFromProblem(variation.problem);
  const correctHTE = parseHTEAnswer(variation.correct_answer);

  const isCorrect = correctHTE
    ? h === correctHTE.h && t === correctHTE.t && e === correctHTE.e
    : `H=${h}, T=${t}, E=${e}` === variation.correct_answer;

  const handleSubmit = () => {
    if (h && t && e) {
      onSubmit(`H=${h}, T=${t}, E=${e}`, isCorrect);
    }
  };

  return (
    <div>
      {/* Source number */}
      {sourceNumber && (
        <div className="mb-6 text-center">
          <div className="inline-block">
            <p className="text-sm font-semibold text-gray-500 mb-1">Getal</p>
            <div
              className="text-5xl font-bold px-8 py-4 rounded"
              style={{ backgroundColor: '#EBF5FF', border: '2px solid #4A90C4', color: '#1A3A5C' }}
            >
              {sourceNumber}
            </div>
          </div>
        </div>
      )}

      {/* HTE boxes */}
      <div className="flex justify-center gap-1 mb-6">
        <HTEBox
          label="H" value={h}
          onChange={(v) => { setH(v); if (v) tRef.current?.focus(); }}
          disabled={submitted}
          correct={submitted && h === correctHTE?.h}
          showResult={submitted}
        />
        <HTEBox
          label="T" value={t}
          onChange={(v) => { setT(v); if (v) eRef.current?.focus(); }}
          disabled={submitted}
          correct={submitted && t === correctHTE?.t}
          showResult={submitted}
        />
        <HTEBox
          label="E" value={e}
          onChange={(v) => setE(v)}
          disabled={submitted}
          correct={submitted && e === correctHTE?.e}
          showResult={submitted}
        />
        {/* Hidden refs for focus */}
        <input ref={tRef} className="sr-only" tabIndex={-1} />
        <input ref={eRef} className="sr-only" tabIndex={-1} />
      </div>

      {/* Breakdown row when submitted */}
      {submitted && correctHTE && (
        <div className="text-center mb-4 text-gray-600 font-mono text-lg">
          {correctHTE.h}00 + {correctHTE.t}0 + {correctHTE.e} = {variation.problem.match(/\b\d+\b/)?.[0]}
        </div>
      )}

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!h || !t || !e}
          className="w-full py-3 text-white font-bold rounded-lg text-lg transition"
          style={{ backgroundColor: (!h || !t || !e) ? '#ccc' : '#4A90C4' }}
        >
          ✓ Controleer
        </button>
      )}
    </div>
  );
}

// --- Samenvoegen exercise: H, T, E given → find the number ---
function HTESamenvoegExercise({ variation, onSubmit, submitted }: {
  variation: Variation;
  onSubmit: (answer: string, correct: boolean) => void;
  submitted: boolean;
}) {
  const [answer, setAnswer] = useState('');
  const correctNum = variation.correct_answer.replace(/\D/g, '');
  const isCorrect = answer.replace(/\D/g, '') === correctNum;

  // Try to extract H, T, E values from the problem
  const hteMatch = variation.problem.match(/H[=:\s]*(\d+)[,\s]+T[=:\s]*(\d+)[,\s]+E[=:\s]*(\d+)/i)
    || variation.problem.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  const givenHTE = hteMatch ? { h: hteMatch[1], t: hteMatch[2], e: hteMatch[3] } : null;

  return (
    <div>
      {/* Show given HTE boxes (read-only) */}
      {givenHTE && (
        <div className="flex justify-center gap-1 mb-6">
          {(['H', 'T', 'E'] as const).map((label, i) => (
            <div key={label} className="flex flex-col items-center">
              <div
                className="w-12 h-10 flex items-center justify-center text-sm font-bold text-white"
                style={{ backgroundColor: '#4A90C4', border: '2px solid #2C6A9A' }}
              >
                {label}
              </div>
              <div
                className="w-12 h-12 flex items-center justify-center text-2xl font-bold border-2"
                style={{ borderColor: '#4A90C4', borderTop: 'none', backgroundColor: '#EBF5FF' }}
              >
                {[givenHTE.h, givenHTE.t, givenHTE.e][i]}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Answer box */}
      <div className="flex justify-center gap-3 mb-6 items-center">
        <span className="text-xl font-bold text-gray-600">Getal =</span>
        <input
          type="text"
          maxLength={4}
          value={answer}
          onChange={(e) => setAnswer(e.target.value.replace(/\D/, ''))}
          disabled={submitted}
          placeholder="___"
          className="w-24 h-14 text-center text-3xl font-bold border-2 focus:outline-none rounded"
          style={{
            borderColor: submitted ? (isCorrect ? '#28A745' : '#DC3545') : '#4A90C4',
            backgroundColor: submitted ? (isCorrect ? '#D4EDDA' : '#F8D7DA') : 'white'
          }}
        />
      </div>

      {!submitted && (
        <button
          onClick={() => answer && onSubmit(answer, isCorrect)}
          disabled={!answer}
          className="w-full py-3 text-white font-bold rounded-lg text-lg transition"
          style={{ backgroundColor: !answer ? '#ccc' : '#4A90C4' }}
        >
          ✓ Controleer
        </button>
      )}
    </div>
  );
}

// --- Simple som exercise ---
function SomExercise({ variation, onSubmit, submitted }: {
  variation: Variation;
  onSubmit: (answer: string, correct: boolean) => void;
  submitted: boolean;
}) {
  const [answer, setAnswer] = useState('');
  const isCorrect = answer.trim() === variation.correct_answer.trim()
    || parseInt(answer) === parseInt(variation.correct_answer);

  return (
    <div>
      {/* Som display */}
      <div
        className="rounded-xl p-6 mb-6 text-center"
        style={{ backgroundColor: '#EBF5FF', border: '2px solid #4A90C4' }}
      >
        <p className="text-4xl font-bold" style={{ color: '#1A3A5C', fontFamily: 'monospace' }}>
          {variation.problem}
        </p>
      </div>

      {/* Answer input */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="text-3xl font-bold text-gray-500">=</span>
        <input
          type="text"
          maxLength={6}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={submitted}
          placeholder="?"
          className="w-28 h-14 text-center text-3xl font-bold border-2 focus:outline-none rounded"
          onKeyDown={(e) => e.key === 'Enter' && answer && !submitted && onSubmit(answer, isCorrect)}
          style={{
            borderColor: submitted ? (isCorrect ? '#28A745' : '#DC3545') : '#4A90C4',
            backgroundColor: submitted ? (isCorrect ? '#D4EDDA' : '#F8D7DA') : 'white'
          }}
        />
      </div>

      {!submitted && (
        <button
          onClick={() => answer && onSubmit(answer, isCorrect)}
          disabled={!answer}
          className="w-full py-3 text-white font-bold rounded-lg text-lg"
          style={{ backgroundColor: !answer ? '#ccc' : '#4A90C4' }}
        >
          ✓ Controleer
        </button>
      )}
    </div>
  );
}

// --- Text fallback ---
function TextExercise({ variation, onSubmit, submitted }: {
  variation: Variation;
  onSubmit: (answer: string, correct: boolean) => void;
  submitted: boolean;
}) {
  const [answer, setAnswer] = useState('');
  const isCorrect = answer.trim().toLowerCase() === variation.correct_answer.trim().toLowerCase();

  return (
    <div>
      <div
        className="rounded-xl p-6 mb-6"
        style={{ backgroundColor: '#EBF5FF', border: '2px solid #4A90C4' }}
      >
        <p className="text-2xl font-bold text-center" style={{ color: '#1A3A5C' }}>
          {variation.problem}
        </p>
      </div>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={submitted}
        placeholder="Vul je antwoord in..."
        className="w-full px-4 py-3 border-2 rounded-lg text-lg font-semibold mb-4 focus:outline-none"
        style={{ borderColor: '#4A90C4' }}
        onKeyDown={(e) => e.key === 'Enter' && answer && !submitted && onSubmit(answer, isCorrect)}
      />
      {!submitted && (
        <button
          onClick={() => answer && onSubmit(answer, isCorrect)}
          disabled={!answer}
          className="w-full py-3 text-white font-bold rounded-lg text-lg"
          style={{ backgroundColor: !answer ? '#ccc' : '#4A90C4' }}
        >
          ✓ Controleer
        </button>
      )}
    </div>
  );
}

// --- Main page ---
export default function ExercisePage({ params }: { params: { id: string } }) {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(`/api/exercises/${params.id}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) setExercise(data.exercise || data);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#EBF5FF' }}>
        <p className="text-xl text-gray-600">Oefening laden...</p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-700 mb-4">Oefening niet gevonden</p>
          <Link href="/" className="text-blue-600 underline">← Terug</Link>
        </div>
      </div>
    );
  }

  const variation = exercise.variations[currentIdx];
  const format = detectFormat(variation.problem, exercise.exercise_type, variation.correct_answer);
  const totalVariations = exercise.variations.length;

  const handleSubmit = (answer: string, correct: boolean) => {
    setSubmitted(true);
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    setCurrentIdx(i => i + 1);
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F0F8FF' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#4A90C4', borderBottom: '4px solid #2C6A9A' }}>
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-white font-semibold hover:text-blue-100">
            ← Terug
          </Link>
          <span className="text-white font-bold text-lg">{exercise.title}</span>
          <span className="text-blue-100 text-sm">
            {exercise.grade_level.replace('group-', 'Groep ')}
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-6">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm font-semibold text-gray-500 mb-1">
            <span>Opdracht {currentIdx + 1} van {totalVariations}</span>
            <span>{score} goed</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${((currentIdx) / totalVariations) * 100}%`, backgroundColor: '#4A90C4' }}
            />
          </div>
        </div>

        {/* Exercise card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6"
          style={{ border: '2px solid #4A90C4' }}>

          {/* Card header */}
          <div className="px-6 py-3 flex items-center justify-between"
            style={{ backgroundColor: '#4A90C4' }}>
            <span className="text-white font-bold text-lg">
              {exercise.exercise_type === 'splits' ? 'Splits' :
               exercise.exercise_type === 'samenvoegen' ? 'Samenvoegen' :
               exercise.exercise_type === 'addition' ? 'Optellen' :
               exercise.exercise_type === 'subtraction' ? 'Aftrekken' : 'Opdracht'} {currentIdx + 1}
            </span>
            <span className="text-white text-sm opacity-80">{exercise.description}</span>
          </div>

          <div className="p-6">
            {/* Problem label for non-HTE */}
            {format !== 'hte-split' && format !== 'hte-samenvoeg' && (
              <p className="text-sm font-semibold text-gray-500 mb-3">
                {variation.problem.length > 80 ? variation.problem : ''}
              </p>
            )}

            {/* Exercise renderer */}
            {format === 'hte-split' && (
              <HTESplitExercise
                variation={variation}
                onSubmit={handleSubmit}
                submitted={submitted}
              />
            )}
            {format === 'hte-samenvoeg' && (
              <HTESamenvoegExercise
                variation={variation}
                onSubmit={handleSubmit}
                submitted={submitted}
              />
            )}
            {format === 'som' && (
              <SomExercise
                variation={variation}
                onSubmit={handleSubmit}
                submitted={submitted}
              />
            )}
            {format === 'text' && (
              <TextExercise
                variation={variation}
                onSubmit={handleSubmit}
                submitted={submitted}
              />
            )}

            {/* Result feedback */}
            {submitted && (
              <div className="mt-6">
                <div
                  className="rounded-xl p-4 text-center font-bold text-lg mb-4"
                  style={{
                    backgroundColor: isCorrect ? '#D4EDDA' : '#F8D7DA',
                    color: isCorrect ? '#155724' : '#721C24',
                    border: `2px solid ${isCorrect ? '#28A745' : '#DC3545'}`
                  }}
                >
                  {isCorrect ? '🎉 Goed zo!' : `❌ Het antwoord is: ${variation.correct_answer}`}
                </div>

                {/* Explanation */}
                {variation.explanation && (
                  <div className="p-4 rounded-lg mb-3" style={{ backgroundColor: '#EBF5FF', borderLeft: '4px solid #4A90C4' }}>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Uitleg</p>
                    <p className="text-gray-700">{variation.explanation}</p>
                  </div>
                )}

                {/* Hints (shown after wrong) */}
                {!isCorrect && variation.hints?.length > 0 && (
                  <div className="p-4 rounded-lg mb-3" style={{ backgroundColor: '#FFF3CD', borderLeft: '4px solid #FFC107' }}>
                    <p className="text-sm font-semibold text-gray-700 mb-2">💡 Tips</p>
                    {variation.hints.map((h, i) => (
                      <p key={i} className="text-sm text-gray-700">• {h}</p>
                    ))}
                  </div>
                )}

                {/* Work steps */}
                {variation.workSteps?.length > 0 && (
                  <details className="p-4 rounded-lg" style={{ backgroundColor: '#F3E5F5' }}>
                    <summary className="text-sm font-semibold text-purple-800 cursor-pointer">
                      📝 Stap voor stap
                    </summary>
                    <ol className="mt-2 space-y-1">
                      {variation.workSteps.map((step, i) => (
                        <li key={i} className="text-sm text-purple-700">
                          <span className="font-bold">{i + 1}.</span> {step}
                        </li>
                      ))}
                    </ol>
                  </details>
                )}

                {/* Next / Finish */}
                <div className="mt-4">
                  {currentIdx < totalVariations - 1 ? (
                    <button
                      onClick={handleNext}
                      className="w-full py-3 text-white font-bold rounded-lg text-lg"
                      style={{ backgroundColor: '#4A90C4' }}
                    >
                      Volgende opdracht →
                    </button>
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2" style={{ color: '#4A90C4' }}>
                        {score}/{totalVariations}
                      </div>
                      <p className="text-gray-600 mb-4">
                        {Math.round((score / totalVariations) * 100)}% goed!
                      </p>
                      <Link
                        href="/"
                        className="inline-block px-6 py-3 text-white font-bold rounded-lg"
                        style={{ backgroundColor: '#4A90C4' }}
                      >
                        ← Terug naar overzicht
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
