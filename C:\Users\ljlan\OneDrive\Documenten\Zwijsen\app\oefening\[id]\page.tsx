import { getExerciseById } from '@/lib/db';
import ReadingExercise from '@/components/ReadingExercise';
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">❌ Oefening niet gevonden</h1>
          <p className="text-gray-300 mb-8">Sorry, deze oefening bestaat niet.</p>
          <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg inline-block">
            ← Terug naar overzicht
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
            ← Terug naar overzicht
          </Link>
        </div>
      </header>

      {/* Exercise */}
      <div className="py-8">
        <ReadingExercise exercise={exercise} />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>Zwijsen Begrijpend Lezen POC © 2024</p>
        </div>
      </footer>
    </main>
  );
}
