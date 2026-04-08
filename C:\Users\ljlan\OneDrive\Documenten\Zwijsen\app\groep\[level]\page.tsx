import { getExercisesByGrade } from '@/lib/db';
import Link from 'next/link';
import { GradeLevel } from '@/lib/types';

interface GradePageProps {
  params: {
    level: string;
  };
}

export default function GradePage({ params }: GradePageProps) {
  const gradeLevel = `group-${params.level}` as GradeLevel;
  const exercises = getExercisesByGrade(gradeLevel);

  const gradeColors: Record<string, string> = {
    '3': 'from-pink-500 to-pink-700',
    '4': 'from-purple-500 to-purple-700',
    '5': 'from-blue-500 to-blue-700',
    '6': 'from-green-500 to-green-700',
    '7': 'from-yellow-500 to-yellow-700',
    '8': 'from-red-500 to-red-700',
  };

  const colorGradient = gradeColors[params.level] || 'from-blue-500 to-blue-700';

  if (!exercises.length) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
              ← Terug naar overzicht
            </Link>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Groep {params.level}</h1>
          <p className="text-gray-300">Geen oefeningen beschikbaar voor deze groep</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold mb-4 inline-block">
            ← Terug naar overzicht
          </Link>
          <div className={`bg-gradient-to-r ${colorGradient} rounded-lg p-8 text-white`}>
            <h1 className="text-4xl font-bold mb-2">🎓 Groep {params.level}</h1>
            <p className="text-lg opacity-90">{exercises.length} oefening{exercises.length !== 1 ? 'en' : ''} beschikbaar</p>
          </div>
        </div>
      </header>

      {/* Exercises */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map(exercise => (
            <Link
              key={exercise.id}
              href={`/oefening/${exercise.id}`}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden group"
            >
              <div className={`h-3 bg-gradient-to-r ${colorGradient}`}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition mb-3">
                  {exercise.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 text-xs rounded font-semibold text-white ${
                    exercise.difficulty === 'easy' ? 'bg-green-500' :
                    exercise.difficulty === 'medium' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}>
                    {exercise.difficulty === 'easy' ? 'Makkelijk ⭐' : exercise.difficulty === 'medium' ? 'Gemiddeld ⭐⭐' : 'Moeilijk ⭐⭐⭐'}
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded font-semibold">
                    {exercise.topic}
                  </span>
                </div>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {exercise.textPassage.substring(0, 120)}...
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>❓ {exercise.questions.length} vragen</span>
                  <span>⏱️ {exercise.estimatedTime} min</span>
                </div>

                <button className={`w-full px-4 py-2 bg-gradient-to-r ${colorGradient} text-white font-bold rounded-lg hover:shadow-lg transition`}>
                  Start oefening →
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
