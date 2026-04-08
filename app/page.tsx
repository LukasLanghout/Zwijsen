'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Exercise {
  id: string;
  title: string;
  description: string | null;
  exercise_type: string;
  grade_level: string;
  difficulty: string;
  estimated_time: number;
  source_file: string | null;
  variations?: Array<{ id: string }>;
}

interface Stats {
  totalExercises: number;
  totalVariations: number;
  exerciseTypes: string[];
}

export default function Home() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [stats, setStats] = useState<Stats>({ totalExercises: 0, totalVariations: 0, exerciseTypes: [] });
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('/api/exercises');
        if (response.ok) {
          const data = await response.json();
          const exercisesList = data.exercises || [];
          setExercises(exercisesList);

          // Calculate stats
          const uniqueTypes = new Set(exercisesList.map((e: Exercise) => e.exercise_type));
          const totalVars = exercisesList.reduce((sum: number, e: Exercise) => sum + (e.variations?.length || 0), 0);
          setStats({
            totalExercises: exercisesList.length,
            totalVariations: totalVars,
            exerciseTypes: Array.from(uniqueTypes) as string[]
          });
        }
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const handlePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadMessage('PDF analyseren...');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setUploadMessage(
        `✅ ${data.totalExtracted} oefeningen geëxtraheerd! Laden...`
      );

      // Refetch exercises after upload
      setTimeout(async () => {
        const response = await fetch('/api/exercises');
        if (response.ok) {
          const newData = await response.json();
          const exercisesList = newData.exercises || [];
          setExercises(exercisesList);
          const uniqueTypes = new Set(exercisesList.map((e: Exercise) => e.exercise_type));
          const totalVars = exercisesList.reduce((sum: number, e: Exercise) => sum + (e.variations?.length || 0), 0);
          setStats({
            totalExercises: exercisesList.length,
            totalVariations: totalVars,
            exerciseTypes: Array.from(uniqueTypes) as string[]
          });
          setUploadMessage('');
        }
      }, 1000);
    } catch (error) {
      setUploadMessage('❌ Upload mislukt. Probeer het opnieuw.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5f0ff 0%, #fff9f0 100%)' }}>
      <header className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 shadow-lg border-b-4" style={{ borderColor: '#0099CC' }}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">🧮</div>
            <div>
              <h1 className="text-5xl font-bold text-white">Zwijsen Rekenen</h1>
              <p className="text-blue-100 mt-2 text-lg">
                Breng leren tot leven met interactieve oefeningen
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Upload Section */}
        <div className="bg-white rounded-2xl p-8 mb-12 shadow-gentle border-l-8" style={{ borderColor: '#0099CC' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📄 PDF Uploaden</h2>
          <p className="text-gray-700 mb-4">
            Upload een PDF met wiskundeoefeningen. AI extraheert en genereert automatisch
            2-3 variaties van elke oefening.
          </p>

          <div className="flex flex-col gap-4">
            <label className="flex items-center justify-center w-full px-6 py-8 border-3 border-dashed rounded-2xl cursor-pointer transition" style={{ borderColor: '#6B4C9A', backgroundColor: '#f5f0ff' }}>
              <input
                type="file"
                accept=".pdf"
                onChange={handlePDFUpload}
                disabled={uploading}
                className="hidden"
              />
              <div className="text-center">
                <span className="text-3xl mb-2 inline-block">📤</span>
                <p className="text-sm font-semibold text-gray-900">
                  {uploading ? 'Uploaden...' : 'Klik om PDF te selecteren'}
                </p>
                <p className="text-xs text-gray-600">of sleep PDF hiernaartoe</p>
              </div>
            </label>

            {uploadMessage && (
              <div className="p-4 bg-white rounded-lg border-l-4 border-green-500">
                <p className="text-sm font-semibold text-gray-900">{uploadMessage}</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl shadow-gentle p-8 border-t-4" style={{ backgroundColor: '#B3E5FC', borderColor: '#0099CC' }}>
            <div className="text-5xl font-bold" style={{ color: '#0099CC' }}>
              {stats.totalExercises}
            </div>
            <div className="text-gray-700 mt-3 font-semibold">Totale oefeningen</div>
          </div>
          <div className="rounded-2xl shadow-gentle p-8 border-t-4" style={{ backgroundColor: '#FFB3D9', borderColor: '#C41E3A' }}>
            <div className="text-5xl font-bold" style={{ color: '#C41E3A' }}>
              {stats.totalVariations}
            </div>
            <div className="text-gray-700 mt-3 font-semibold">Variaties gegenereerd</div>
          </div>
          <div className="rounded-2xl shadow-gentle p-8 border-t-4" style={{ backgroundColor: '#C8E6C9', borderColor: '#7CB342' }}>
            <div className="text-5xl font-bold" style={{ color: '#7CB342' }}>
              {stats.exerciseTypes.length}
            </div>
            <div className="text-gray-700 mt-3 font-semibold">Oefening types</div>
          </div>
        </div>

        {/* Exercises */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">✨ Oefeningen</h2>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Oefeningen laden...</p>
            </div>
          ) : exercises.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl">
              <p className="text-gray-600 text-lg">Nog geen oefeningen. Upload een PDF om te starten!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((exercise, idx) => {
                const pastelColors = [
                  { bg: '#B3E5FC', border: '#0099CC' },
                  { bg: '#FFB3D9', border: '#C41E3A' },
                  { bg: '#FFCB9A', border: '#FF9800' },
                  { bg: '#C8E6C9', border: '#7CB342' }
                ];
                const color = pastelColors[idx % pastelColors.length];
                const variationCount = exercise.variations?.length || 0;
                return (
                <Link
                  key={exercise.id}
                  href={`/oefening/${exercise.id}`}
                  className="rounded-2xl shadow-gentle hover:shadow-medium transition overflow-hidden group"
                  style={{ backgroundColor: color.bg }}
                >
                  <div className="h-4" style={{ backgroundColor: color.border }}></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition mb-2">
                      {exercise.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4">
                      {exercise.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-semibold">
                        {exercise.grade_level.replace('group-', 'Gr. ')}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-semibold">
                        {exercise.exercise_type}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded font-semibold text-white ${
                          exercise.difficulty === 'easy'
                            ? 'bg-green-500'
                            : exercise.difficulty === 'medium'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                      >
                        {exercise.difficulty === 'easy'
                          ? '⭐ Easy'
                          : exercise.difficulty === 'medium'
                          ? '⭐⭐ Medium'
                          : '⭐⭐⭐ Hard'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>🔄 {variationCount} variaties</span>
                      <span>⏱️ {exercise.estimated_time} min</span>
                    </div>

                    {exercise.source_file && (
                      <p className="text-xs text-gray-500 mb-3">
                        📄 Uit: {exercise.source_file}
                      </p>
                    )}

                    <button className="w-full px-4 py-3 text-white font-bold rounded-xl transition" style={{ backgroundColor: color.border }}>
                      Start →
                    </button>
                  </div>
                </Link>
              );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
