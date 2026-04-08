import { NextRequest, NextResponse } from 'next/server';
import {
  getExerciseById,
  getExerciseVariations,
  getHints,
  getWorkSteps
} from '@/lib/supabase';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET exercise with all details
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    // Get exercise
    const exercise = await getExerciseById(id);
    if (!exercise) {
      return NextResponse.json(
        { error: 'Exercise not found' },
        { status: 404 }
      );
    }

    // Get variations
    const variations = await getExerciseVariations(id);

    // Get hints and work steps for each variation
    const variationsWithDetails = await Promise.all(
      variations.map(async (variation) => {
        const hints = await getHints(variation.id);
        const workSteps = await getWorkSteps(variation.id);

        return {
          ...variation,
          hints: hints.map(h => h.hint_text),
          workSteps: workSteps.map(ws => ws.step_text)
        };
      })
    );

    return NextResponse.json({
      success: true,
      exercise: {
        ...exercise,
        variations: variationsWithDetails
      }
    });
  } catch (error) {
    console.error('Error fetching exercise:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exercise' },
      { status: 500 }
    );
  }
}
