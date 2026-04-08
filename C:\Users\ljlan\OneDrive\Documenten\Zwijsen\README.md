# 📚 Zwijsen Begrijpend Lezen POC

**Digitale Oefeningen voor Begrijpend Lezen in het Basisonderwijs**

Een proof-of-concept webapp voor het digitaliseren en beheren van werkboek-oefeningen, speciaal gericht op **begrijpend lezen** voor groep 3-8.

## ✨ Features

- 📖 **Tekstpassages** met thema's passend voor basisschool
- ❓ **Meerdere vraagtypen**:
  - Multiple choice vragen
  - Waar/Onwaar vragen
  - Invulvragen (gaten invullen)
  - Open vragen
- 📊 **Directe feedback** met uitleg en scoring
- 🎓 **Groepsniveaus** (3-8) met passende moeilijkheidsgraden
- 💡 **Hints** beschikbaar per vraag
- 🤖 **Gemini API integratie** voor AI-gegenereerde volgende vragen
- 📱 **Responsive design** voor alle apparaten
- ♿ **Accessibility** geoptimaliseerd

## 🏗️ Projectstructuur

```
zwijsen-exercises-poc/
├── app/
│   ├── page.tsx              # Homepage met overzicht
│   ├── layout.tsx            # Root layout
│   ├── oefening/[id]/        # Individuele oefening pagina
│   ├── groep/[level]/        # Oefeningen per groep (3-8)
│   └── api/
│       ├── exercises/        # CRUD endpoints
│       └── gemini/           # Gemini AI integration
├── components/
│   ├── ReadingExercise.tsx   # Hoofd oefening component
│   ├── QuestionCard.tsx      # Vraag component
│   └── ...
├── lib/
│   ├── types.ts              # TypeScript types
│   ├── db.ts                 # In-memory database
│   └── ...
├── public/                   # Static assets
└── package.json
```

## 🚀 Lokaal Starten

### Vereisten
- Node.js 18+
- npm of yarn

### Installatie

```bash
# Dependencies installeren
npm install

# Development server starten
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## 🔧 Configuratie

### Gemini API Setup

1. **API Key verkrijgen**:
   - Ga naar https://ai.google.dev/
   - Klik "Get API Key"
   - Copy je API key

2. **Lokaal gebruiken**:
   ```bash
   # Maak .env.local bestand
   echo "GEMINI_API_KEY=your_key_here" > .env.local
   ```

3. **Op Vercel deployen**:
   - Ga naar je Vercel project → Settings
   - Environment Variables
   - Voeg toe: `GEMINI_API_KEY` = `your_key_here`
   - Redeploy

## 📊 Data Structuur

### Exercise Type

```typescript
interface Exercise {
  id: string;
  title: string;
  textPassage: string;     // De te lezen tekst
  gradeLevel: 'group-3' | 'group-4' | ... | 'group-8';
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  questions: Question[];
  estimatedTime: number;   // minuten
}
```

### Question Type

```typescript
type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank' | 'open-question';

interface Question {
  id: string;
  type: QuestionType;
  questionText: string;
  options?: string[];          // Voor multiple-choice
  correctAnswer: string | string[];
  explanation?: string;        // Feedback
  hints?: string[];           // Hulpvragen
}
```

## 🎯 Oefeningen Voorbeelden

### Groep 3 (Makkelijk)
- **Het Konijn en de Schildpad** - Fabel met 3 vragen
- **Daan gaat naar de Bibliotheek** - Dagelijks leven met 3 vragen

### Groep 4-5 (Makkelijk-Gemiddeld)
- **De Zwaluwen en de Zomer** - Natuur verhaal

### Groep 5-6 (Gemiddeld)
- **De School van Morgen** - Onderwijs thema
- **Het Regenwoud in Gevaar** - Milieu awareness

## 🤖 Gemini AI Integratie

De app ondersteunt AI-gegenereerde vragen via de Gemini API:

### Beschikbare Prompts

1. **generate-questions**: Genereert vragen uit tekstpassage
2. **analyze-difficulty**: Bepaalt groep en moeilijkheidsniveau
3. **generate-exercise**: Creëert complete oefening van scratch

### Voorbeeld API Call

```bash
curl -X POST http://localhost:3000/api/gemini \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Maak 3 vragen over deze tekst...",
    "type": "generate-questions"
  }'
```

## 📦 Deployment op Vercel

### Stap 1: Push naar GitHub
```bash
git init
git add .
git commit -m "Initial: Zwijsen Begrijpend Lezen POC"
git remote add origin https://github.com/YOUR_USERNAME/zwijsen-exercises-poc.git
git push -u origin main
```

### Stap 2: Deploy op Vercel
1. Ga naar [vercel.com](https://vercel.com)
2. Click "New Project" → "Import"
3. Paste je GitHub repository URL
4. Framework: Selecteer "Next.js"
5. Environment Variables:
   - `GEMINI_API_KEY` = `your_key`
6. Click "Deploy"

## 🧪 Testing

```bash
# Lint code
npm run lint

# Build
npm run build

# Production starten
npm start
```

## 📚 API Endpoints

| Endpoint | Method | Beschrijving |
|----------|--------|---|
| `/api/exercises` | GET | Alle oefeningen |
| `/api/exercises` | POST | Nieuwe oefening |
| `/api/exercises/[id]` | GET | Specifieke oefening |
| `/api/exercises/[id]` | PUT | Update oefening |
| `/api/exercises/[id]` | DELETE | Verwijder oefening |
| `/api/gemini` | POST | AI generatie |

## 🎨 Styling

- **Tailwind CSS** voor styling
- **Responsive** design (mobile-first)
- **Accessible** met WCAG 2.1 AA compliance
- **Dark & Light** mode support

## 📋 TODO / Toekomstige Features

- [ ] PDF parsing en extraction
- [ ] Student progress tracking
- [ ] Teacher dashboard
- [ ] More oefeningen data
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Mobile app version

## 🔐 Security

- ✅ API key via environment variables
- ✅ CORS configured
- ✅ Input validation
- ✅ XSS protection
- ❌ Authentication (TODO)
- ❌ Database persistence (currently in-memory)

## 📝 Licentie

Zwijsen POC © 2024

## 👨‍💻 Development

Gemaakt met:
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Gemini API** - AI generation

## 📞 Support

Voor vragen of issues, open een GitHub issue of neem contact op.
