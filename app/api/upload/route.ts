import { NextRequest, NextResponse } from 'next/server';
import { addExercise } from '@/lib/db';
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

    // Convert PDF to base64
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    // Extract text from PDF using Gemini Vision
    const extractionResult = await extractExercisesFromPDF(
      base64,
      file.name
    );

    return NextResponse.json({
      success: true,
      fileName: file.name,
      exercises: extractionResult.exercises,
      totalExtracted: extractionResult.exercises.length,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process PDF' },
      { status: 500 }
    );
  }
}

async function extractExercisesFromPDF(
  base64Content: string,
  fileName: string
): Promise<{ exercises: Exercise[] }> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  // Use Gemini to analyze PDF and extract math exercises
  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Je bent een expert in het analyseren van Nederlandse wiskundeoefeningen uit PDF-bestanden.

Analyze de volgende PDF-inhoud en extract alle wiskundeoefeningen.

BELANGRIJK voor "Vierkanten" oefeningen:
- Dit zijn grid-based oefeningen (perfect squares, rechthoeken)
- Getallen die als vierkant kunnen: 1, 4, 9, 16, 25, etc.
- Oefeningen met tegels/hokjes intekenen

Voor elke oefening:
1. Identify het type (addition, subtraction, multiplication, division, mixed, word-problem)
2. Bepaal het niveau (group-3 tot group-8)
3. Bepaal moeilijkheid (easy, medium, hard)
4. Genereer EXACT 3 variaties met:
   - Verschillende moeilijkheidsgraden
   - Verschillende getallen (maar zelfde type vraag)
   - Duidelijke hints
   - Stap-voor-stap uitleg (workSteps)

Return VALID JSON format:
{
  "exercises": [
    {
      "title": "...",
      "description": "...",
      "exerciseType": "addition|subtraction|multiplication|division|mixed|word-problem",
      "gradeLevel": "group-3|group-4|group-5|group-6|group-7|group-8",
      "difficulty": "easy|medium|hard",
      "topic": "Vierkanten|Optellen|Aftrekken|etc",
      "originalProblem": "...",
      "variations": [
        {
          "problem": "Vraag...",
          "correctAnswer": 5,
          "explanation": "Uitleg",
          "hints": ["Hint 1", "Hint 2"],
          "workSteps": ["Stap 1", "Stap 2"]
        }
      ]
    }
  ]
}

PDF Content (analyze this):
[PDF would be analyzed by vision - for now, extract from text]`,
              },
            ],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to extract exercises from PDF');
  }

  const data = await response.json();
  const extractedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

  try {
    const jsonMatch = extractedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsedData = JSON.parse(jsonMatch[0]);

    // Convert to Exercise objects with IDs
    const exercises: Exercise[] = (parsedData.exercises || []).map(
      (ex: any, index: number) => ({
        id: `pdf-${Date.now()}-${index}`,
        title: ex.title,
        description: ex.description,
        exerciseType: ex.exerciseType,
        gradeLevel: ex.gradeLevel,
        difficulty: ex.difficulty,
        topic: ex.topic,
        originalProblem: ex.originalProblem,
        variations: (ex.variations || []).map((v: any, vIdx: number) => ({
          id: `v${vIdx + 1}`,
          problem: v.problem,
          correctAnswer: v.correctAnswer,
          explanation: v.explanation,
          hints: v.hints || [],
        })),
        estimatedTime: 10,
        sourceFile: fileName,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    // Save to database
    exercises.forEach(ex => addExercise(ex));

    return { exercises };
  } catch (parseError) {
    console.error('Parse error:', parseError);
    throw new Error('Failed to parse extracted exercises');
  }
}
