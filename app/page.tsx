import Link from 'next/link';
import { getExercises } from '@/lib/db';

export default function Home() {
  const exercises = getExercises();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900">📚 Zwijsen Begrijpend Lezen</h1>
          <p className="text-gray-600 mt-2">Oefeningen voor het basisonderwijs</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map(exercise => (
            <Link
              key={exercise.id}
              href={`/oefening/${exercise.id}`}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden"
            >
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {exercise.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-semibold">
                    {exercise.gradeLevel.replace('group-', 'Gr. ')}
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded font-semibold">
                    {exercise.topic}
                  </span>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {exercise.textPassage.substring(0, 100)}...
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>❓ {exercise.questions.length} vragen</span>
                  <span>⏱️ {exercise.estimatedTime} min</span>
                </div>

                <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg transition">
                  Start →
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
