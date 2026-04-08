import { NextRequest, NextResponse } from 'next/server';
import {
  getExercises,
  addExercise,
  addVariation,
  addHint,
  addWorkStep
} from '@/lib/supabase';

// GET all exercises
export async function GET() {
  try {
    const exercises = await getExercises();
    return NextResponse.json({
      success: true,
      exercises,
      count: exercises.length
    });
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exercises' },
      { status: 500 }
    );
  }
}

// POST new exercise with variations
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      exercise_type,
      grade_level,
      difficulty,
      topic,
      original_problem,
      estimated_time,
      source_file,
      variations
    } = body;

    // Add exercise
    const exercise = await addExercise({
      title,
      description,
      exercise_type,
      grade_level,
      difficulty,
      topic,
      original_problem,
      estimated_time: estimated_time || 10,
      source_file
    });

    // Add variations with hints and work steps
    if (variations && Array.isArray(variations)) {
      for (const variation of variations) {
        const variationRow = await addVariation({
          exercise_id: exercise.id,
          problem: variation.problem,
          correct_answer: String(variation.correctAnswer || ''),
          explanation: variation.explanation
        });

        // Add hints
        if (variation.hints && Array.isArray(variation.hints)) {
          for (let i = 0; i < variation.hints.length; i++) {
            await addHint({
              variation_id: variationRow.id,
              hint_text: variation.hints[i],
              hint_order: i
            });
          }
        }

        // Add work steps
        if (variation.workSteps && Array.isArray(variation.workSteps)) {
          for (let i = 0; i < variation.workSteps.length; i++) {
            await addWorkStep({
              variation_id: variationRow.id,
              step_text: variation.workSteps[i],
              step_order: i
            });
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      exercise,
      message: `Exercise created with ${variations?.length || 0} variations`
    });
  } catch (error) {
    console.error('Error creating exercise:', error);
    return NextResponse.json(
      { error: 'Failed to create exercise', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
