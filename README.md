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
- 🤖 **Gemini API integratie** voor AI-gegenereerde oefeningen
- 📱 **Responsive design** voor alle apparaten
- ♿ **Accessibility** geoptimaliseerd

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

## 📊 Oefeningen

De POC bevat 5 complete demo-oefeningen:

1. **Groep 3** - Het Konijn en de Schildpad (Fabel)
2. **Groep 4** - De Zwaluwen en de Zomer (Natuur)
3. **Groep 3** - Daan gaat naar de Bibliotheek (Dagelijks leven)
4. **Groep 5-6** - De School van Morgen (Onderwijs)
5. **Groep 6** - Het Regenwoud in Gevaar (Milieu)

## 🚀 Deployment op Vercel

Zie `GITHUB_VERCEL_SETUP.md` voor stap-voor-stap instructies.

## 🤖 Gemini API Integratie

API endpoint: `POST /api/gemini`

```bash
curl -X POST http://localhost:3000/api/gemini \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Maak 3 vragen over deze tekst...",
    "type": "generate-questions"
  }'
```

## 📖 Projectstructuur

```
zwijsen-exercises-poc/
├── app/                    # Next.js pages
├── components/             # React components
├── lib/                    # Utilities & database
├── public/                 # Static assets
├── package.json
├── README.md
└── GITHUB_VERCEL_SETUP.md  # Deployment guide
```

## 📝 Licentie

Zwijsen POC © 2024
