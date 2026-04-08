/**
 * Hugging Face AI Integration
 * Free alternative to commercial AI services
 * Uses HF Inference API for exercise generation
 */

const HF_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1/v1/chat/completions';
const HF_API_KEY = process.env.HUGGING_FACE_API_KEY;

export async function generateExercisesWithHF(prompt: string): Promise<string> {
  if (!HF_API_KEY) {
    throw new Error('HUGGING_FACE_API_KEY not configured');
  }

  try {
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'Je bent een expert in het ontwerpen van Nederlandse wiskundeoefeningen. Antwoord altijd in geldig JSON formaat.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('HF API Error:', errorData);
      throw new Error(`HF API Error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    return content;
  } catch (error) {
    console.error('Error calling Hugging Face API:', error);
    throw error;
  }
}

export function generateExercisePrompt(fileName: string): string {
  return `Analyze een PDF-bestand met naam "${fileName}" met wiskundeoefeningen.

Generate Dutch math exercises in this JSON format:
{
  "exercises": [
    {
      "title": "Titel",
      "description": "Beschrijving",
      "exerciseType": "mixed|addition|subtraction|multiplication|division|word-problem",
      "gradeLevel": "group-3|group-4|group-5|group-6|group-7|group-8",
      "difficulty": "easy|medium|hard",
      "topic": "Onderwerp",
      "originalProblem": "Originele opgave",
      "estimatedTime": 10,
      "variations": [
        {
          "problem": "Vraag",
          "correctAnswer": "5",
          "explanation": "Uitleg",
          "hints": ["Hint 1"],
          "workSteps": ["Stap 1"]
        }
      ]
    }
  ]
}

Genereer 1-3 oefeningen gebaseerd op "${fileName}". Zorg voor Nederlandse taal en realistische opgaven voor het basisonderwijs.`;
}
