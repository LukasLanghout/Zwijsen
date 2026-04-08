import { NextRequest, NextResponse } from 'next/server';
import {
  getExerciseById,
  getExerciseVariations,
  getHints,
  getWorkSteps,
  updateExerciseValidation,
  updateVariationDetails
} from '@/lib/supabase';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET exercise with all details for editing
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    const exercise = await getExerciseById(id);
    if (!exercise) {
      return NextResponse.json(
        { error: 'Exercise not found' },
        { status: 404 }
      );
    }

    const variations = await getExerciseVariations(id);

    // Get hints and work steps for each variation
    const variationsWithDetails = await Promise.all(
      variations.map(async (variation) => {
        const hints = await getHints(variation.id);
        const workSteps = await getWorkSteps(variation.id);

        return {
          ...variation,
          hints,
          workSteps
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
    console.error('Error fetching exercise for admin:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exercise' },
      { status: 500 }
    );
  }
}

// PUT update exercise validation status and details
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = await request.json();

    const {
      validation_status,
      editor_notes,
      question_type,
      title,
      description,
      variations
    } = body;

    // Update exercise validation
    const updatedExercise = await updateExerciseValidation(id, {
      validation_status,
      editor_notes,
      question_type,
      title,
      description
    });

    if (!updatedExercise) {
      return NextResponse.json(
        { error: 'Failed to update exercise' },
        { status: 500 }
      );
    }

    // Update individual variation details if provided
    if (variations && Array.isArray(variations)) {
      for (const variation of variations) {
        if (variation.id && (variation.problem || variation.correct_answer || variation.explanation)) {
          await updateVariationDetails(variation.id, {
            problem: variation.problem,
            correct_answer: variation.correct_answer,
            explanation: variation.explanation
          });
        }
      }
    }

    // Fetch updated exercise with all details
    const variations_data = await getExerciseVariations(id);
    const variationsWithDetails = await Promise.all(
      variations_data.map(async (variation) => {
        const hints = await getHints(variation.id);
        const workSteps = await getWorkSteps(variation.id);
        return {
          ...variation,
          hints,
          workSteps
        };
      })
    );

    return NextResponse.json({
      success: true,
      exercise: {
        ...updatedExercise,
        variations: variationsWithDetails
      },
      message: 'Exercise updated successfully'
    });
  } catch (error) {
    console.error('Error updating exercise:', error);
    return NextResponse.json(
      { error: 'Failed to update exercise', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
