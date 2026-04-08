# 🚀 GitHub & Vercel Setup Instructies

Stap-voor-stap handleiding voor het uploaden van je POC naar GitHub en deployen op Vercel.

## ✅ Vereisten

- [x] Node.js 18+ geïnstalleerd
- [x] Git geïnstalleerd
- [x] GitHub account
- [x] Vercel account (via GitHub)
- [x] Gemini API key

## 📋 Stap 1: Gemini API Key Veilig Opslaan

### BELANGRIJK: Zorg dat je API key NIET in Git gaat!

```bash
# 1. Maak .env.local bestand (GITIGNORED)
cp .env.example .env.local

# 2. Vul je NIEUWE Gemini API key in
# Edit .env.local en voeg toe:
# GEMINI_API_KEY=your_NEW_api_key_here

# Zorg dat .env.local in .gitignore staat ✅
```

## 📤 Stap 2: Uploaden naar GitHub

### 2.1 GitHub Repository Aanmaken

1. Ga naar [github.com](https://github.com)
2. Klik rechtsboven `+` → **New repository**
3. Vul in:
   - **Repository name**: `zwijsen-exercises-poc`
   - **Description**: `Zwijsen Begrijpend Lezen POC - Digitale oefeningen voor basisschool`
   - **Public/Private**: Kies je voorkeur
   - **DO NOT initialize** (we hebben al bestanden!)
4. Klik **Create repository**
5. Copy de HTTPS URL

### 2.2 Git Configureren & Pushen

Open PowerShell/Command Prompt in je Zwijsen folder:

```powershell
# 1. Ga naar project folder
cd C:\Users\ljlan\OneDrive\Documenten\Zwijsen

# 2. Initialize git (if not already done)
git init
git config user.name "Lukas Langhout"
git config user.email "ljlanghout@gmail.com"
git branch -M main

# 3. Voeg remote toe
# Vervang YOUR_USERNAME met je GitHub username!
git remote add origin https://github.com/YOUR_USERNAME/zwijsen-exercises-poc.git

# 4. Voeg alles toe
git add .

# 5. Maak initial commit
git commit -m "Initial commit: Zwijsen Begrijpend Lezen POC

- Specialized voor reading comprehension (groep 3-8)
- 5 demo oefeningen met vragen
- Gemini API integratie (environment variables)
- Responsive design met Tailwind CSS
- TypeScript type safety"

# 6. Push naar GitHub
git push -u origin main

# 7. Verify - Ga naar je GitHub repo en controleer!
```

### Troubleshooting Git Push

Als je een fout krijgt:

```powershell
# Fout: "fatal: 'origin' does not appear to be a git repository"
# Oplossing: Controleer remote
git remote -v

# Fout: "rejected... Updates were rejected"
# Oplossing: Pull eerst
git pull origin main --allow-unrelated-histories
git push -u origin main

# Fout: Authentication
# Oplossing: Git Credential Manager gebruiken
# PowerShell zal browser dialog openen
```

## ☁️ Stap 3: Deploy op Vercel

### 3.1 Vercel Project Aanmaken

1. Ga naar [vercel.com](https://vercel.com)
2. **Sign In** met GitHub account
3. Klik **"Add New"** → **"Project"**
4. Klik **"Import"** bij je `zwijsen-exercises-poc` repository
5. Framework: **Selecteer "Next.js"**
6. Build Settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - (Laat rest default)

### 3.2 Environment Variables Toevoegen

**CRITISCH STAP:**

1. Scroll naar **"Environment Variables"**
2. Voeg toe:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `your_NIEUWE_api_key_hier`
   - **Select "Next.js"** (je deployment target)
3. Klik **"Add"**
4. Klik **"Deploy"**

### 3.3 Wachten op Deployment

1. Je ziet de build progressie
2. Wacht totdat `✓ Ready` verschijnt
3. Je app is live op `https://zwijsen-exercises-poc-YOUR_USERNAME.vercel.app`

## 🔗 URLs Achterhalen

```powershell
# Je GitHub repository:
https://github.com/YOUR_USERNAME/zwijsen-exercises-poc

# Je Vercel deployment:
https://zwijsen-exercises-poc.vercel.app
# (Je krijgt het exacte URL na deployment)
```

## ✨ Na Deployment: Doelen

### ✅ Lokaal werken?
```bash
npm install
npm run dev
# Open http://localhost:3000
```

### ✅ Op Vercel live?
- Ga naar je Vercel URL
- Test alle oefeningen
- Controleer Gemini API (als geimplementeerd)

### ✅ In Git?
```bash
# Controleer remote
git remote -v
# Moet tonen: origin ... (fetch/push)

# Controleer branches
git branch -a
# Moet tonen: main

# View latest commits
git log --oneline -5
```

## 📝 Updates in Toekomst

**Wanneer je wijzigingen wilt pushen:**

```powershell
# 1. Maak je wijzigingen
# 2. Commit
git add .
git commit -m "Description of changes"

# 3. Push
git push origin main

# 4. Vercel redeploy automatisch! ✨
# Kijk naar: vercel.com → dashboard
```

## 🔐 Best Practices

- ✅ **Altijd** environment variables gebruiken (NOOIT hardcoded)
- ✅ `.env.local` in `.gitignore` (al gedaan!)
- ✅ Regenereer Gemini key als je deze ergens hebt gedeeld
- ✅ Rotate keys regelmatig
- ✅ Use `.env.example` voor documentation

## 🛠️ Next Steps

Na succesvol deployment:

1. **Gemini Features Testen**
   - POST naar `/api/gemini` om AI features te testen
   - Zorg je key in Vercel environment variables zit

2. **Meer Oefeningen Toevoegen**
   - Edit `lib/db.ts`
   - Voeg exercise objects toe
   - Push changes → Auto-deploy

3. **Database Vervangen**
   - In-memory → MongoDB/PostgreSQL
   - Add authentication
   - Student progress tracking

4. **PDF Parsing**
   - Voeg PDF upload toe
   - Extract text/images
   - Auto-generate questions met Gemini

## ❓ FAQ

**V: Wat is mijn Vercel URL?**  
A: Zie `Deployments` tab op Vercel dashboard

**V: Hoe update ik naar Vercel?**  
A: Push naar GitHub → Vercel auto-redeploy

**V: Mijn Gemini API key werkt niet**  
A: Check `.env.local` lokaal, check Vercel environment vars voor production

**V: Hoe verander ik code later?**  
A: Edit bestand → `git add . → git commit → git push` → Vercel update automatisch

## ✅ Checklist

Voordat je klaar bent:

- [ ] GitHub repository aangemaakt
- [ ] Code naar GitHub gepusht
- [ ] Vercel project geimport
- [ ] Environment variables ingesteld (GEMINI_API_KEY)
- [ ] Deployment geslaagd (✓ Ready)
- [ ] App werkt op https://...vercel.app
- [ ] .env.local NIET in git
- [ ] Gemini API key NIEUW/FRESH
- [ ] README.md up-to-date
- [ ] Team op de hoogte gebracht van live link

---

**Klaar! Jouw POC is nu live en production-ready! 🎉**
