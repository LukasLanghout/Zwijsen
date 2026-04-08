import { NextRequest, NextResponse } from 'next/server';
import { addExercise, getExercises } from '@/lib/db';
import { Exercise } from '@/lib/types';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!file.name.endsWith('.pdf')) {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File is too large (max 10MB)' },
        { status: 400 }
      );
    }

    // Extract exercises from PDF
    const extractionResult = await extractExercisesFromPDF(
      file.name,
      file.size
    );

    return NextResponse.json({
      success: true,
      fileName: file.name,
      exercises: extractionResult.exercises,
      totalExtracted: extractionResult.exercises.length,
      message: `✅ ${extractionResult.exercises.length} oefeningen geëxtraheerd!`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process PDF',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function extractExercisesFromPDF(
  fileName: string,
  fileSize: number
): Promise<{ exercises: Exercise[] }> {
  // For PoC: Generate sample exercises based on filename
  // In production: Use OCR/PDF parsing library + Gemini API

  try {
    // Generate vierkanten exercises based on filename
    const newExercises: Exercise[] = [];

    // Parse filename to detect exercise type
    const isVierkanten = fileName.toLowerCase().includes('vierkant');
    const isOptellen = fileName.toLowerCase().includes('optel') || fileName.toLowerCase().includes('+');
    const isAftrekken = fileName.toLowerCase().includes('aftrek') || fileName.toLowerCase().includes('-');
    const isKeersom = fileName.toLowerCase().includes('keer') || fileName.toLowerCase().includes('×');
    const isDelen = fileName.toLowerCase().includes('deel') || fileName.toLowerCase().includes('÷');

    // Generate 1-3 exercises based on file content hints
    if (isVierkanten || fileName.toLowerCase().includes('grid') || fileName.toLowerCase().includes('square')) {
      // Add a vierkanten exercise
      const vierkantExercise: Exercise = {
        id: `pdf-${Date.now()}-0`,
        title: `Vierkanten van ${fileName.replace('.pdf', '')}`,
        description: 'Oefening geëxtraheerd uit PDF',
        exerciseType: 'mixed',
        gradeLevel: 'group-4',
        difficulty: 'medium',
        topic: 'Vierkanten',
        originalProblem: 'Werk met vierkanten',
        variations: [
          {
            id: 'v1',
            problem: 'Welke getallen kun je als perfect vierkant tekenen (1-25)?',
            correctAnswer: '1, 4, 9, 16, 25',
            explanation: '1×1=1, 2×2=4, 3×3=9, 4×4=16, 5×5=25',
            hints: ['Perfect vierkanten zijn 1², 2², 3², 4², 5²'],
            workSteps: ['1×1=1', '2×2=4', '3×3=9', '4×4=16', '5×5=25']
          },
          {
            id: 'v2',
            problem: 'Pak 20 tegels, maak het grootste vierkant. Hoeveel over?',
            correctAnswer: '4 tegels over (4×4=16, 20-16=4)',
            explanation: '4×4=16 is het grootste vierkant, 20-16=4 tegels over',
            hints: ['4×4=16', '20-16=4'],
            workSteps: ['Bereken: 4×4=16', 'Trek af: 20-16=4', 'Antwoord: 4 tegels over']
          },
          {
            id: 'v3',
            problem: 'Teken een vierkant van 9 hokjes en een van 16 hokjes',
            correctAnswer: '3×3=9 en 4×4=16',
            explanation: 'Je maakt een 3×3 vierkant (9 hokjes) en een 4×4 vierkant (16 hokjes)',
            hints: ['3×3=9', '4×4=16']
          }
        ],
        estimatedTime: 15,
        sourceFile: fileName,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      newExercises.push(vierkantExercise);
    }

    // If no specific type detected or if just a generic PDF
    if (newExercises.length === 0) {
      // Return a generic math exercise
      const genericExercise: Exercise = {
        id: `pdf-${Date.now()}-0`,
        title: `Rekenen: ${fileName.replace('.pdf', '')}`,
        description: 'Oefening geëxtraheerd uit PDF - graag manual review',
        exerciseType: 'mixed',
        gradeLevel: 'group-4',
        difficulty: 'easy',
        topic: 'Rekenen',
        originalProblem: 'PDF-oefening',
        variations: [
          {
            id: 'v1',
            problem: '5 + 3 = ?',
            correctAnswer: 8,
            explanation: '5 + 3 = 8',
            hints: ['Tel aan: 5, 6, 7, 8'],
            workSteps: ['Start bij 5', 'Tel 3 verder', 'Antwoord: 8']
          },
          {
            id: 'v2',
            problem: '9 - 4 = ?',
            correctAnswer: 5,
            explanation: '9 - 4 = 5',
            hints: ['Tel terug: 9, 8, 7, 6, 5'],
            workSteps: ['Start bij 9', 'Tel 4 terug', 'Antwoord: 5']
          },
          {
            id: 'v3',
            problem: '6 × 2 = ?',
            correctAnswer: 12,
            explanation: '6 × 2 = 12',
            hints: ['6 + 6 = 12'],
            workSteps: ['6 twee keer', 'Antwoord: 12']
          }
        ],
        estimatedTime: 10,
        sourceFile: fileName,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      newExercises.push(genericExercise);
    }

    // Save to database
    newExercises.forEach(ex => addExercise(ex));

    return { exercises: newExercises };
  } catch (error) {
    console.error('Error extracting exercises:', error);
    throw new Error(`Failed to extract exercises from ${fileName}`);
  }
}
