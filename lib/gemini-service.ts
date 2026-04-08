// Gemini API Service for Reading Comprehension
// This service uses the Google Generative AI API to:
// - Generate reading comprehension questions from text
// - Analyze student answers
// - Create variations of exercises

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export interface GeneratedQuestion {
  question: string;
  questionType: 'multiple-choice' | 'short-answer' | 'essay';
  options?: string[];
  correctAnswer?: string;
  bloomLevel: string;
}

export const geminiService = {
  // Generate comprehension questions from a text
  async generateQuestions(
    text: string,
    grade: string,
    count: number = 5
  ): Promise<GeneratedQuestion[]> {
    if (!GEMINI_API_KEY) {
      throw new Error('NEXT_PUBLIC_GEMINI_API_KEY not set');
    }

    const prompt = `Je bent een Nederlandse onderwijsdeskundige gespecialiseerd in begrijpend lezen voor de basisschool (${grade}).

Gegeven deze tekst:
"${text}"

Genereer ${count} begrijpend lezen vragen die voldoen aan:
- Passen bij het niveau van ${grade}
- Mix van vraagtypen (multiple-choice, short-answer, essay)
- Mix van Bloom's taxonomy niveaus (remembering, understanding, analyzing)
- Vragen zijn in het Nederlands
- Vragen testen werkelijk begrip van de tekst

Antwoord in JSON format:
{
  "questions": [
    {
      "question": "...",
      "questionType": "multiple-choice|short-answer|essay",
      "options": ["option1", "option2", ...] (alleen voor multiple-choice),
      "correctAnswer": "...",
      "bloomLevel": "remembering|understanding|analyzing"
    }
  ]
}`;

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.candidates[0].content.parts[0].text;

      // Parse JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse JSON from Gemini response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      return parsed.questions;
    } catch (error) {
      console.error('Error generating questions:', error);
      throw error;
    }
  },

  // Evaluate student answer using AI
  async evaluateAnswer(
    question: string,
    studentAnswer: string,
    correctAnswer: string
  ): Promise<{ isCorrect: boolean; feedback: string }> {
    if (!GEMINI_API_KEY) {
      throw new Error('NEXT_PUBLIC_GEMINI_API_KEY not set');
    }

    const prompt = `Je bent een Nederlandse onderwijzer die antwoorden op begrijpend lezen vragen nakijkt.

Vraag: "${question}"
Correct antwoord: "${correctAnswer}"
Antwoord van de leerling: "${studentAnswer}"

Beoordeel of het antwoord correct is. Zorg ervoor dat je rekening houdt met:
- Betekenis en context
- Kleine spellingsfouten die het begrip niet aantasten
- Parafrase van het correcte antwoord

Antwoord in JSON format:
{
  "isCorrect": true/false,
  "feedback": "...",
  "score": 0-100
}`;

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 500
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.candidates[0].content.parts[0].text;

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse JSON from Gemini response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      return {
        isCorrect: parsed.isCorrect,
        feedback: parsed.feedback
      };
    } catch (error) {
      console.error('Error evaluating answer:', error);
      throw error;
    }
  }
};
