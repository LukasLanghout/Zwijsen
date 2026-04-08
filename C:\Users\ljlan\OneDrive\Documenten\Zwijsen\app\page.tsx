import Link from 'next/link';
import { getExercises, getStats } from '@/lib/db';

export default function Home() {
  const exercises = getExercises();
  const stats = getStats();

  const gradeColors = {
    'group-3': 'from-pink-400 to-pink-600',
    'group-4': 'from-purple-400 to-purple-600',
    'group-5': 'from-blue-400 to-blue-600',
    'group-6': 'from-green-400 to-green-600',
    'group-7': 'from-yellow-400 to-yellow-600',
    'group-8': 'from-red-400 to-red-600',
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">📚 Zwijsen Begrijpend Lezen</h1>
              <p className="text-gray-600 mt-2">Oefeningen voor het basisonderwijs</p>
            </div>
            <div className="text-4xl">📖</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl font-bold text-blue-600">{stats.totalExercises}</div>
            <div className="text-gray-600 mt-2">Totale oefeningen</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl font-bold text-purple-600">{stats.topics.length}</div>
            <div className="text-gray-600 mt-2">Verschillende onderwerpen</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl font-bold text-green-600">6</div>
            <div className="text-gray-600 mt-2">Groepsnivelaus (3-8)</div>
          </div>
        </div>

        {/* Filter by Grade */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">📚 Oefeningen per Groep</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Object.entries(stats.exercisesByGrade).map(([grade, count]) => {
              if (count === 0) return null;
              const gradeNum = grade.replace('group-', '');
              const colorGradient = gradeColors[grade as keyof typeof gradeColors];

              return (
                <Link
                  key={grade}
                  href={`/groep/${gradeNum}`}
                  className={`bg-gradient-to-br ${colorGradient} rounded-lg shadow-lg p-8 text-white hover:shadow-xl transition transform hover:scale-105`}
                >
                  <div className="text-5xl mb-4">🎓</div>
                  <h3 className="text-2xl font-bold mb-2">Groep {gradeNum}</h3>
                  <p className="text-lg opacity-90">{count} oefening{count !== 1 ? 'en' : ''}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* All Exercises */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">✨ Alle Oefeningen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map(exercise => (
              <Link
                key={exercise.id}
                href={`/oefening/${exercise.id}`}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden group"
              >
                <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition mb-3">
                    {exercise.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-semibold">
                      {exercise.gradeLevel.replace('group-', 'Gr. ')}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded font-semibold text-white ${
                      exercise.difficulty === 'easy' ? 'bg-green-500' :
                      exercise.difficulty === 'medium' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}>
                      {exercise.difficulty === 'easy' ? '⭐' : exercise.difficulty === 'medium' ? '⭐⭐' : '⭐⭐⭐'}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded font-semibold">
                      {exercise.topic}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {exercise.textPassage.substring(0, 100)}...
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>❓ {exercise.questions.length} vragen</span>
                    <span>⏱️ {exercise.estimatedTime} min</span>
                  </div>

                  <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg transition">
                    Start →
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">ℹ️ Over deze POC</h3>
          <p className="text-gray-700 mb-4">
            Dit is een <strong>Proof of Concept</strong> voor het <strong>Zwijsen Oefeningen Digitalisatie Project</strong>.
            De app demonstreert hoe werkboek-oefeningen kunnen worden gedigitaliseerd en hergebruikt in interactieve format.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>✅ <strong>Tekstbegrip oefeningen</strong> voor groep 3-8</li>
            <li>✅ <strong>Meerdere vraagtypen</strong>: multiple choice, waar/onwaar, invulvragen, open vragen</li>
            <li>✅ <strong>Directe feedback</strong> met uitleg van antwoorden</li>
            <li>✅ <strong>Gemini API integratie</strong> voor AI-gegenereerde vragen</li>
            <li>✅ <strong>Responsive design</strong> voor alle apparaten</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
