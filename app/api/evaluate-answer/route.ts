import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini-service';

export async function POST(req: NextRequest) {
  try {
    const { question, studentAnswer, correctAnswer } = await req.json();

    if (!question || !studentAnswer || !correctAnswer) {
      return NextResponse.json(
        { error: 'Missing required fields: question, studentAnswer, correctAnswer' },
        { status: 400 }
      );
    }

    const evaluation = await geminiService.evaluateAnswer(
      question,
      studentAnswer,
      correctAnswer
    );

    return NextResponse.json({
      success: true,
      evaluation
    });
  } catch (error) {
    console.error('Evaluate answer error:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate answer', details: String(error) },
      { status: 500 }
    );
  }
}
