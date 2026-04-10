import Groq from 'groq-sdk';

let groqInstance: Groq | null = null;

function getGroqClient(): Groq | null {
  if (groqInstance) return groqInstance;

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.warn('⚠️ GROQ_API_KEY not configured');
    return null;
  }

  groqInstance = new Groq({ apiKey });
  return groqInstance;
}

export async function extractExercisesFromText(pdfText: string, fileName: string): Promise<string> {
  const client = getGroqClient();
  if (!client) throw new Error('Groq not configured');

  const prompt = `Je bent een expert in het analyseren van Nederlandse wiskundewerkboeken voor basisschool (groep 3-8).

Analyseer de volgende tekst uit een Zwijsen werkboek en extraheer alle oefeningen die je kunt herkennen.
Bestandsnaam: ${fileName}

PDF inhoud:
---
${pdfText.substring(0, 8000)}
---

Maak een JSON array met oefeningen. Elke oefening moet hebben:
- title: korte naam (bijv. "Splits getallen tot 1000")
- description: wat de leerling moet doen
- exerciseType: "mixed", "addition", "subtraction", "multiplication", "division", "vierkanten", "splits", "samenvoegen"
- gradeLevel: schat op basis van moeilijkheid (group-3 t/m group-8)
- difficulty: "easy", "medium", of "hard"
- topic: het wiskundeonderwerp
- originalProblem: de originele opdrachttekst
- variations: array van 2-3 variaties, elk met:
  - problem: de specifieke vraag/opdracht
  - correctAnswer: het juiste antwoord (getal of tekst)
  - explanation: uitleg van het antwoord
  - hints: array van 2 hints
  - workSteps: array van stap-voor-stap oplossing

Herken typische Zwijsen oefeningen zoals:
- Splits (bijv. 347 → H:3, T:4, E:7)
- Samenvoegen/optellen (bijv. H+T+E terug naar getal)
- HTE-vakjes invullen
- Rijen van getallen aanvullen
- Sommen uitrekenen

Geef ALLEEN geldig JSON terug, geen tekst ervoor of erna.

Formaat:
[
  {
    "title": "...",
    "description": "...",
    "exerciseType": "...",
    "gradeLevel": "group-4",
    "difficulty": "easy",
    "topic": "...",
    "originalProblem": "...",
    "variations": [
      {
        "problem": "...",
        "correctAnswer": "...",
        "explanation": "...",
        "hints": ["...", "..."],
        "workSteps": ["...", "..."]
      }
    ]
  }
]`;

  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.3,
    max_tokens: 4096,
    response_format: { type: 'json_object' }
  });

  return chatCompletion.choices[0]?.message?.content || '[]';
}

// Fallback with faster model for simple exercises
export async function extractExercisesFast(pdfText: string, fileName: string): Promise<string> {
  const client = getGroqClient();
  if (!client) throw new Error('Groq not configured');

  const prompt = `Analyseer dit Nederlandse wiskundewerkboek en maak een JSON array van oefeningen.
Bestand: ${fileName}

Tekst (eerste deel):
${pdfText.substring(0, 4000)}

Geef JSON terug: [{"title":"...","description":"...","exerciseType":"mixed","gradeLevel":"group-4","difficulty":"easy","topic":"...","originalProblem":"...","variations":[{"problem":"...","correctAnswer":"...","explanation":"...","hints":["..."],"workSteps":["..."]}]}]

Alleen geldige JSON, geen tekst eromheen.`;

  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.1-8b-instant',
    temperature: 0.3,
    max_tokens: 2048
  });

  return chatCompletion.choices[0]?.message?.content || '[]';
}

export function isGroqConfigured(): boolean {
  return !!process.env.GROQ_API_KEY;
}
