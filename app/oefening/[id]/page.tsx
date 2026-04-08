import { getExerciseById } from '@/lib/db';
import Link from 'next/link';

interface ExercisePageProps {
  params: {
    id: string;
  };
}

export default function ExercisePage({ params }: ExercisePageProps) {
  const exercise = getExerciseById(params.id);

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

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← Terug naar overzicht
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{exercise.title}</h1>

        <div className="bg-blue-50 rounded-lg p-8 mb-8 border-2 border-blue-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">📖 Lees de tekst</h2>
          <div className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
            {exercise.textPassage}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">❓ Vragen</h2>
          {exercise.questions.map((question, index) => (
            <div key={question.id} className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Vraag {index + 1}: {question.questionText}
              </h3>

              {question.type === 'multiple-choice' && (
                <div className="space-y-2">
                  {question.options?.map((option, idx) => (
                    <label key={idx} className="flex items-center gap-3 p-3 rounded hover:bg-gray-100">
                      <input type="radio" name={question.id} className="w-4 h-4" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {question.type === 'true-false' && (
                <div className="flex gap-4">
                  <label>
                    <input type="radio" name={question.id} /> Waar
                  </label>
                  <label>
                    <input type="radio" name={question.id} /> Onwaar
                  </label>
                </div>
              )}

              {question.type === 'fill-blank' && (
                <input
                  type="text"
                  placeholder="Vul je antwoord in..."
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded"
                />
              )}

              {question.type === 'open-question' && (
                <textarea
                  placeholder="Schrijf je antwoord hier..."
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded min-h-[100px]"
                />
              )}
            </div>
          ))}
        </div>

        <button className="mt-8 w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg">
          ✓ Inleveren
        </button>
      </div>
    </main>
  );
}
