'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Exercise {
  id: string;
  title: string;
  description: string | null;
  exercise_type: string;
  grade_level: string;
  difficulty: string;
  validation_status: 'pending' | 'approved' | 'rejected' | 'needs_review';
  editor_notes: string | null;
  question_type: string | null;
  source_file: string | null;
  variationCount: number;
  created_at: string;
}

type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected' | 'needs_review';

export default function AdminDashboard() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('pending');

  const statusColors = {
    pending: { bg: '#FFF3CD', border: '#FFC107', text: '#856404', label: '⏳ In wachtrij' },
    approved: { bg: '#D4EDDA', border: '#28A745', text: '#155724', label: '✅ Goedgekeurd' },
    rejected: { bg: '#F8D7DA', border: '#DC3545', text: '#721C24', label: '❌ Afgewezen' },
    needs_review: { bg: '#D1ECF1', border: '#17A2B8', text: '#0C5460', label: '🔍 Controle nodig' }
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`/api/admin/exercises?status=${statusFilter === 'all' ? '' : statusFilter}`);
        if (response.ok) {
          const data = await response.json();
          setExercises(data.exercises);
        }
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [statusFilter]);

  const pendingCount = exercises.filter(e => e.validation_status === 'pending').length;
  const reviewCount = exercises.filter(e => e.validation_status === 'needs_review').length;
  const approvedCount = exercises.filter(e => e.validation_status === 'approved').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-lg p-4 bg-white shadow-md border-l-4" style={{ borderColor: '#FFC107' }}>
          <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
          <div className="text-gray-600 text-sm font-semibold mt-1">In wachtrij</div>
        </div>
        <div className="rounded-lg p-4 bg-white shadow-md border-l-4" style={{ borderColor: '#17A2B8' }}>
          <div className="text-3xl font-bold text-cyan-600">{reviewCount}</div>
          <div className="text-gray-600 text-sm font-semibold mt-1">Controle nodig</div>
        </div>
        <div className="rounded-lg p-4 bg-white shadow-md border-l-4" style={{ borderColor: '#28A745' }}>
          <div className="text-3xl font-bold text-green-600">{approvedCount}</div>
          <div className="text-gray-600 text-sm font-semibold mt-1">Goedgekeurd</div>
        </div>
        <div className="rounded-lg p-4 bg-white shadow-md border-l-4" style={{ borderColor: '#6B4C9A' }}>
          <div className="text-3xl font-bold text-purple-600">{exercises.length}</div>
          <div className="text-gray-600 text-sm font-semibold mt-1">Totaal</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 bg-white rounded-lg p-2 shadow-md">
        {(['all', 'pending', 'needs_review', 'approved', 'rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-md font-semibold text-sm transition ${
              statusFilter === status
                ? 'text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={
              statusFilter === status
                ? { backgroundColor: statusColors[status === 'all' ? 'pending' : status].border, color: 'white' }
                : {}
            }
          >
            {status === 'all' ? '📋 Alles' : statusColors[status as keyof typeof statusColors].label}
          </button>
        ))}
      </div>

      {/* Exercises Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-600">Oefeningen laden...</div>
        ) : exercises.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            Geen oefeningen gevonden in deze categorie
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Titel</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Groep</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Variaties</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Acties</th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise) => {
                  const colors = statusColors[exercise.validation_status];
                  return (
                    <tr key={exercise.id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{exercise.title}</div>
                        <div className="text-xs text-gray-600 mt-1">{exercise.description?.substring(0, 40)}...</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{exercise.exercise_type}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{exercise.grade_level.replace('group-', 'Gr. ')}</td>
                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                        >
                          {colors.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                        {exercise.variationCount}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          href={`/admin/${exercise.id}`}
                          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold transition"
                        >
                          Bewerk →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
