# Zwijsen Begrijpend Lezen POC

## Overzicht

Dit is een Proof of Concept voor het digitaliseren van begrijpend lezen oefeningen voor de basisschool (groep 3-8).

### Features

#### 1. **Oefenigsbibliotheek**
- 3+ geselecteerde Nederlandse leesteksten
- Georganiseerd per groep (groep 3-8)
- Filters op moeilijkheidsgraad (makkelijk, gemiddeld, moeilijk)
- Responsive design geschikt voor tablets en computers

#### 2. **Vraagtypen**
- **Multiple Choice** - Keuze uit meerdere opties
- **Short Answer** - Korte tekst antwoorden
- **Essay** - Langere open vragen

#### 3. **Bloom's Taxonomy Integration**
Vragen richten zich op verschillende niveaus van begrip:
- **Remembering** - Feiten uit de tekst herinneren
- **Understanding** - Begrijpen van betekenis
- **Analyzing** - Analyseren en interpreteren
- **Evaluating** - Kritisch denken

#### 4. **AI-Aangedreven Functionaliteiten (met Gemini API)**
- 🤖 Automatisch genereren van begrijpend lezen vragen uit willekeurige teksten
- ✅ Intelligente evaluatie van leerlingantworden
- 📊 Feedback op basis van AI-analyse

## Technische Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: Google Generative AI (Gemini API)
- **Database**: In-memory (expandable naar MongoDB/PostgreSQL)

## Structuur

```
app/
  ├── page.tsx              # Homepage
  ├── layout.tsx            # Root layout
  └── api/
      ├── generate-questions/   # AI vraagvergenerator
      └── evaluate-answer/       # AI antwoordevaluatie

components/
  ├── ReadingExercise.tsx   # Main oefening component
  └── ExerciseLibrary.tsx   # Bibliotheekweergave

lib/
  ├── types.ts              # TypeScript definities
  ├── db.ts                 # Database
  ├── sample-exercises.ts   # Demo oefeningen
  └── gemini-service.ts     # Gemini API integratie
```

## Setup & Installatie

### Lokaal
```bash
cd C:\Users\ljlan\OneDrive\Documenten\Zwijsen
npm install
npm run dev
# Open http://localhost:3000
```

### Environment Variables
1. Maak `.env.local` bestand:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

2. Verkrijg je Gemini API key:
   - Ga naar [Google AI Studio](https://ai.google.dev/)
   - Klik "Get API Key"
   - Selecteer of maak een project
   - Kopieer je key

### Deployment naar Vercel
```bash
# Push naar GitHub
git push origin main

# Vercel zal automatisch deployen
# Voeg environment variables toe in Vercel Dashboard
```

## Demo Oefeningen

### 1. Het Vogelnestje (Groep 3)
- 185 woorden
- 4 vragen
- Niveau: Makkelijk
- Focus: Feitenherkenning en basis begrip

### 2. De Verloren Rugzak (Groep 4)
- 220 woorden
- 4 vragen
- Niveau: Makkelijk
- Focus: Sequencing en causality

### 3. De Geheime Schatkamer (Groep 5)
- 280 woorden
- 4 vragen
- Niveau: Gemiddeld
- Focus: Inferencing en analyse

## API Endpoints

### POST /api/generate-questions
Genereer automatisch vragen uit een tekst:
```bash
curl -X POST http://localhost:3000/api/generate-questions \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Je tekst hier",
    "grade": "groep5",
    "count": 5
  }'
```

### POST /api/evaluate-answer
Evalueer een leerlingantwerd:
```bash
curl -X POST http://localhost:3000/api/evaluate-answer \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Wat is de titel van het verhaal?",
    "studentAnswer": "Het vogelnestje",
    "correctAnswer": "Het Vogelnestje"
  }'
```

## Volgende Stappen (Roadmap)

### Fase 2: Enhancement
- [ ] Gebruiker accounts (leerlingen + leraren)
- [ ] Voortgang tracking (scores opslaan)
- [ ] Meer sample oefeningen toevoegen
- [ ] PDF import functionaliteit
- [ ] Leerling-voor-leerling feedback

### Fase 3: Advanced
- [ ] Adaptive difficulty (moeilijkheid aanpassen aan performance)
- [ ] Personalisatie per leerling
- [ ] Teacher dashboard (leerlingen beheer)
- [ ] Analytics en reporting
- [ ] Integratie met Zwijsen LMS

## Beveiligingsnotas

⚠️ **API Keys**
- Nooit API keys in code pushen
- Gebruik `.env.local` voor lokale development
- Zet keys in Vercel Environment Variables
- Rotate keys regelmatig

## Support

Voor vragen of problemen:
1. Check de [Next.js Documentatie](https://nextjs.org)
2. Check [Gemini API Docs](https://ai.google.dev/docs)
3. Open een issue op GitHub

## Licentie

Dit is een POC voor Zwijsen. Intern gebruik.
