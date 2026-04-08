'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getExercises, getStats } from '@/lib/db';

export default function Home() {
  const exercises = getExercises();
  const stats = getStats();
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

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
        `✅ ${data.totalExtracted} oefeningen geëxtraheerd! Page vernieuwt...`
      );

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setUploadMessage('❌ Upload mislukt. Probeer het opnieuw.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <header className="bg-white shadow-md border-b-4 border-green-500">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900">🧮 Zwijsen Rekenen</h1>
          <p className="text-gray-600 mt-2">
            Wiskundeoefeningen met AI-gegenereerde variaties
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Upload Section */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-8 mb-12 border-2 border-green-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📄 PDF Uploaden</h2>
          <p className="text-gray-700 mb-4">
            Upload een PDF met wiskundeoefeningen. AI extraheert en genereert automatisch
            2-3 variaties van elke oefening.
          </p>

          <div className="flex flex-col gap-4">
            <label className="flex items-center justify-center w-full px-6 py-4 border-2 border-dashed border-green-400 rounded-lg cursor-pointer hover:bg-green-50 transition">
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
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-500">
            <div className="text-4xl font-bold text-green-600">
              {stats.totalExercises}
            </div>
            <div className="text-gray-600 mt-2">Totale oefeningen</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500">
            <div className="text-4xl font-bold text-blue-600">
              {stats.totalVariations}
            </div>
            <div className="text-gray-600 mt-2">Variaties gegenereerd</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-purple-500">
            <div className="text-4xl font-bold text-purple-600">
              {stats.exerciseTypes.length}
            </div>
            <div className="text-gray-600 mt-2">Oefening types</div>
          </div>
        </div>

        {/* Exercises */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">✨ Oefeningen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map(exercise => (
              <Link
                key={exercise.id}
                href={`/oefening/${exercise.id}`}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden group"
              >
                <div className="h-3 bg-gradient-to-r from-green-500 to-blue-500"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition mb-2">
                    {exercise.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">
                    {exercise.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-semibold">
                      {exercise.gradeLevel.replace('group-', 'Gr. ')}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-semibold">
                      {exercise.exerciseType}
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
                    <span>🔄 {exercise.variations.length} variaties</span>
                    <span>⏱️ {exercise.estimatedTime} min</span>
                  </div>

                  {exercise.sourceFile && (
                    <p className="text-xs text-gray-500 mb-3">
                      📄 Uit: {exercise.sourceFile}
                    </p>
                  )}

                  <button className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg hover:shadow-lg transition">
                    Start →
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
