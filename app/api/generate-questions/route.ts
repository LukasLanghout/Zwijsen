import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini-service';

export async function POST(req: NextRequest) {
  try {
    const { text, grade, count } = await req.json();

    if (!text || !grade) {
      return NextResponse.json(
        { error: 'Missing required fields: text, grade' },
        { status: 400 }
      );
    }

    const questions = await geminiService.generateQuestions(text, grade, count || 5);

    return NextResponse.json({
      success: true,
      questions,
      count: questions.length
    });
  } catch (error) {
    console.error('Generate questions error:', error);
    return NextResponse.json(
      { error: 'Failed to generate questions', details: String(error) },
      { status: 500 }
    );
  }
}
