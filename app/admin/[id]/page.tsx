'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Hint {
  id: string;
  hint_text: string;
  hint_order: number;
}

interface WorkStep {
  id: string;
  step_text: string;
  step_order: number;
}

interface Variation {
  id: string;
  problem: string;
  correct_answer: string;
  explanation: string | null;
  hints: Hint[];
  workSteps: WorkStep[];
}

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
  variations: Variation[];
}

interface EditPageProps {
  params: {
    id: string;
  };
}

export default function AdminEditPage({ params }: EditPageProps) {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validationStatus, setValidationStatus] = useState<'pending' | 'approved' | 'rejected' | 'needs_review'>('pending');
  const [editorNotes, setEditorNotes] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [variations, setVariations] = useState<Variation[]>([]);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await fetch(`/api/admin/exercises/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          const ex = data.exercise;
          setExercise(ex);
          setTitle(ex.title);
          setDescription(ex.description || '');
          setValidationStatus(ex.validation_status);
          setEditorNotes(ex.editor_notes || '');
          setQuestionType(ex.question_type || '');
          setVariations(ex.variations || []);
        }
      } catch (error) {
        console.error('Error fetching exercise:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [params.id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/exercises/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          validation_status: validationStatus,
          editor_notes: editorNotes,
          question_type: questionType,
          variations: variations.map(v => ({
            id: v.id,
            problem: v.problem,
            correct_answer: v.correct_answer,
            explanation: v.explanation
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        setExercise(data.exercise);
        setVariations(data.exercise.variations);
        setEditMode(false);
        alert('Oefening opgeslagen!');
      }
    } catch (error) {
      console.error('Error saving exercise:', error);
      alert('Fout bij opslaan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-gray-600 text-lg">Oefening laden...</p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-red-600 text-lg">Oefening niet gevonden</p>
        <Link href="/admin" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
          ← Terug naar overzicht
        </Link>
      </div>
    );
  }

  const statusColors = {
    pending: { bg: '#FFF3CD', border: '#FFC107', text: '#856404' },
    approved: { bg: '#D4EDDA', border: '#28A745', text: '#155724' },
    rejected: { bg: '#F8D7DA', border: '#DC3545', text: '#721C24' },
    needs_review: { bg: '#D1ECF1', border: '#17A2B8', text: '#0C5460' }
  };

  const colors = statusColors[validationStatus];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/admin" className="text-blue-600 hover:text-blue-700 mb-6 inline-block">
        ← Terug naar overzicht
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Status Bar */}
        <div className="mb-8 p-4 rounded-lg border-2" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600">Validatiestatus</p>
              <p className="text-lg font-bold" style={{ color: colors.text }}>
                {validationStatus === 'pending' && '⏳ In wachtrij'}
                {validationStatus === 'approved' && '✅ Goedgekeurd'}
                {validationStatus === 'rejected' && '❌ Afgewezen'}
                {validationStatus === 'needs_review' && '🔍 Controle nodig'}
              </p>
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition"
            >
              {editMode ? '❌ Annuleren' : '✏️ Bewerk'}
            </button>
          </div>
        </div>

        {/* Exercise Details */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oefening Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Titel</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={!editMode}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Beschrijving</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={!editMode}
                rows={3}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Vraagtypeo</label>
                <input
                  type="text"
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  disabled={!editMode}
                  placeholder="bijv. open vraag, meerkeuze"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type: {exercise.exercise_type}</label>
                <div className="text-gray-600 bg-gray-100 px-4 py-2 rounded">
                  {exercise.exercise_type} • {exercise.grade_level}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Editor notities</label>
              <textarea
                value={editorNotes}
                onChange={(e) => setEditorNotes(e.target.value)}
                disabled={!editMode}
                rows={2}
                placeholder="Feedback, problemen gevonden, etc."
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Variations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Variaties ({variations.length})</h2>

          {variations.map((variation, idx) => (
            <div key={variation.id} className="mb-6 p-4 border-2 border-gray-200 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-3">Variatie {idx + 1}</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Vraag</label>
                  <textarea
                    value={variation.problem}
                    onChange={(e) => {
                      const updated = [...variations];
                      updated[idx].problem = e.target.value;
                      setVariations(updated);
                    }}
                    disabled={!editMode}
                    rows={2}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Correct antwoord</label>
                    <input
                      type="text"
                      value={variation.correct_answer}
                      onChange={(e) => {
                        const updated = [...variations];
                        updated[idx].correct_answer = e.target.value;
                        setVariations(updated);
                      }}
                      disabled={!editMode}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Uitleg</label>
                    <input
                      type="text"
                      value={variation.explanation || ''}
                      onChange={(e) => {
                        const updated = [...variations];
                        updated[idx].explanation = e.target.value;
                        setVariations(updated);
                      }}
                      disabled={!editMode}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Buttons */}
        <div className="border-t-2 border-gray-200 pt-8">
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => {
                setValidationStatus('approved');
                setEditMode(false);
              }}
              disabled={!editMode && validationStatus === 'approved'}
              className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✅ Goedkeuren
            </button>

            <button
              onClick={() => {
                setValidationStatus('needs_review');
                setEditMode(false);
              }}
              disabled={!editMode && validationStatus === 'needs_review'}
              className="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🔍 Controle nodig
            </button>

            <button
              onClick={() => {
                setValidationStatus('rejected');
                setEditMode(false);
              }}
              disabled={!editMode && validationStatus === 'rejected'}
              className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ❌ Afwijzen
            </button>

            {editMode && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? '💾 Opslaan...' : '💾 Opslaan'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
