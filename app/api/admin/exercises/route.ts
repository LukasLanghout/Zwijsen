import { NextRequest, NextResponse } from 'next/server';
import {
  getExercises,
  getExercisesByStatus,
  getExerciseVariations,
  getHints,
  getWorkSteps
} from '@/lib/supabase';

// GET exercises filtered by validation status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let exercises;
    if (status) {
      exercises = await getExercisesByStatus(status);
    } else {
      exercises = await getExercises();
    }

    // Enrich with variations count
    const exercisesWithVariations = await Promise.all(
      exercises.map(async (exercise) => {
        const variations = await getExerciseVariations(exercise.id);
        return {
          ...exercise,
          variationCount: variations.length
        };
      })
    );

    return NextResponse.json({
      success: true,
      exercises: exercisesWithVariations,
      count: exercises.length,
      status: status || 'all'
    });
  } catch (error) {
    console.error('Error fetching exercises for admin:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exercises', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
