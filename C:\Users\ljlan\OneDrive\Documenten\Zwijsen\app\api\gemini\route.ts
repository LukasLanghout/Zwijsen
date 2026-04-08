import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function POST(request: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { prompt, type } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const systemPrompt = getSystemPrompt(type);

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system: [
          {
            parts: [
              {
                text: systemPrompt
              }
            ]
          }
        ],
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate content with Gemini API' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return NextResponse.json({
      success: true,
      content: generatedText,
      type: type
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function getSystemPrompt(type: string): string {
  switch (type) {
    case 'generate-questions':
      return `Je bent een expert in het ontwerpen van begrijpend lezen oefeningen voor Nederlandse basisschoolkinderen.

Gegeven een tekst, genereer 3-5 vragen in Nederlands die het begrip van de tekst testen.
Varieer de vraagtypen:
- Meerkeuze vragen (geef 4 opties)
- Waar/Onwaar vragen
- Invulvragen (__ moet ingevuld worden)
- Open vragen

Format je antwoord als JSON met deze structuur:
{
  "questions": [
    {
      "type": "multiple-choice|true-false|fill-blank|open-question",
      "question": "...",
      "options": ["a", "b", "c", "d"] (alleen voor multiple-choice en true-false),
      "correctAnswer": "...",
      "explanation": "..."
    }
  ]
}`;

    case 'analyze-difficulty':
      return `Je bent een expert in het bepalen van leesniveaus voor Nederlandse basisschoolkinderen.

Gegeven een tekst, bepaal het juiste groepsniveau (3, 4, 5, 6, 7 of 8) en moeilijkheidsgraad (easy, medium, hard).
Kijk naar woordenschat, zinslengte, onderwerp complexiteit en concepten.

Antwoord in JSON format:
{
  "gradeLevel": "group-X",
  "difficulty": "easy|medium|hard",
  "reasoning": "..."
}`;

    case 'generate-exercise':
      return `Je bent een expert in het creëren van begrijpend lezen oefeningen voor Nederlandse basisscholen.

Gegeven een onderwerp en groepsniveau, creëer een korte (100-200 woorden), interessante tekst geschikt voor dat niveau.
Maak daarna 3-4 vragen die het begrip testen.

Antwoord in JSON format:
{
  "title": "...",
  "textPassage": "...",
  "topic": "...",
  "questions": [...]
}`;

    default:
      return 'Je bent een nuttige assistent voor Nederlandse basisschoolonderwijs. Antwoord alles in het Nederlands.';
  }
}
