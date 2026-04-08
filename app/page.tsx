import ExerciseLibrary from '@/components/ExerciseLibrary';
import { db } from '@/lib/db';

export default function Home() {
  const exercises = db.exercises.getAll();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📚 Zwijsen Begrijpend Lezen
          </h1>
          <p className="text-gray-600 text-lg">
            Oefeningen voor basisschoolkinderen om beter te begrijpen wat ze lezen
          </p>
        </header>

        <ExerciseLibrary exercises={exercises} />
      </div>
    </main>
  );
}
