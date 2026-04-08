# 🚀 GitHub & Vercel Setup Instructies

Stap-voor-stap handleiding voor het uploaden naar GitHub en deployen op Vercel.

## ✅ Vereisten

- [x] Node.js 18+ geïnstalleerd
- [x] Git geïnstalleerd
- [x] GitHub account
- [x] Vercel account
- [x] Gemini API key (NIEUW/FRESH!)

## 🔐 KRITIEK: Gemini API Key

**ZORG DAT JE API KEY VEILIG IS:**

1. Je hebt eerder een key gedeeld - die is nu invalid ✅
2. Je hebt een NIEUWE key aangemaakt ✅
3. Deze NEW key zet je in environment variables (NOOIT in code!)

```bash
# Lokaal:
echo "GEMINI_API_KEY=your_NEW_key_here" > .env.local

# Vercel:
Dashboard → Settings → Environment Variables → Voeg toe
```

## 📤 Push naar GitHub

```bash
# 1. Voeg alles toe
git add .

# 2. Commit
git commit -m "feat: Zwijsen Begrijpend Lezen POC - Complete implementation"

# 3. Push
git push -u origin claude/create-project-poc-ktnJY
```

## ☁️ Vercel Deployment

1. Ga naar https://vercel.com
2. "New Project" → "Import"
3. Select je GitHub repo
4. Framework: **Next.js**
5. Build Settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. **Environment Variables:**
   - Name: `GEMINI_API_KEY`
   - Value: `your_NEW_key_here`
7. Click **Deploy**

## ✨ Volgende Stappen

After deployment:
- Test alle oefeningen
- Controleer Gemini API (als geimplementeerd)
- Share je live URL!

Veel succes! 🎉
