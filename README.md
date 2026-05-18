# Stowarzyszenie demo — Centrum Dobrego Dialogu

Demo aplikacji mobilnej (iOS + Android + web, jedna baza kodu) dla fikcyjnego stowarzyszenia psychologów. **React Native + Expo + TypeScript + Expo Router.**

> Wszystkie treści (opisy, profile, dane kontaktowe, zdjęcia) są przykładowe.

## Stos

- React Native 0.74 / React 18
- Expo SDK 51 + Expo Router 3 (file-based routing)
- TypeScript (strict)
- `react-native-reanimated` (subtelne fade-iny)
- `expo-blur` (liquid glass)
- `expo-linear-gradient` (gradienty)
- `@expo/vector-icons` (Ionicons)
- Dane lokalnie w `data/psychologists.json`

## Uruchomienie lokalne (mobile dev mode)

```bash
npm install
npx expo start
# i = iOS sim, a = Android emu, w = web, QR = Expo Go
```

Na macOS dla devmode'u potrzebny **watchman**:

```bash
brew install watchman
```

## Podgląd webowy (bez watchmana)

```bash
npx expo export --platform web
npx serve dist -l 3000
# http://localhost:3000
```

## Struktura projektu

```
stowarzyszenie-demo/
├── app/                       # Expo Router — każdy plik = ekran
│   ├── _layout.tsx            # Stack + transparentny header
│   ├── index.tsx              # Home
│   ├── about.tsx              # O nas
│   ├── contact.tsx            # Kontakt
│   └── psychologists/
│       ├── index.tsx          # Lista
│       └── [id].tsx           # Szczegóły profilu
├── components/
│   ├── AnimatedFade.tsx       # Krótki fade-in (180 ms)
│   ├── GlassCard.tsx          # Liquid-glass (BlurView)
│   ├── GradientBackground.tsx # Gradient + soft blobs
│   ├── GradientButton.tsx     # Primary / glass / ghost
│   ├── Pill.tsx               # Tagi tonowe
│   ├── ProfileCard.tsx        # Karta psychologa
│   ├── ResponsiveContainer.tsx# Max-width 720 px, centrowanie
│   └── Section.tsx
├── constants/theme.ts         # Kolory, gradienty, spacing, typografia
├── data/psychologists.json
├── hooks/useResponsive.ts
├── types/psychologist.ts
├── vercel.json                # Deploy do Vercela
├── app.json / tsconfig.json / babel.config.js
└── package.json
```

## Buildy Expo (mobile)

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android   # .apk / .aab
eas build --platform ios       # .ipa
eas build --platform all
```

## Deploy webowy — GitHub Actions → GitHub Pages

W `.github/workflows/deploy.yml` jest workflow, który po każdym push na `main`:

1. instaluje deps (`npm ci`)
2. buduje statyczny web (`npx expo export --platform web`)
3. wrzuca artefakt do GitHub Pages

**Publiczny URL:** `https://arturbardzinski.github.io/stowarzyszenie-demo/`

### Wymagania

- repo **publiczne** (GH Pages na free planie nie obsługuje deployu z prywatnego)
- włączone Pages w trybie `workflow` (jednorazowo, przez API lub Settings → Pages → Source = GitHub Actions)
- w `app.json` ustawione `experiments.baseUrl: "/stowarzyszenie-demo"` — bo Pages serwuje pod ścieżką projektu, nie pod rootem
- dynamiczna trasa `psychologists/[id].tsx` eksportuje `generateStaticParams()` (4 konkretne strony zamiast jednego templata)
- workflow kopiuje `index.html` → `404.html` jako SPA fallback dla nieznanych ścieżek

### Włączenie Pages (jednorazowo)

Przez `gh`:

```bash
gh api -X POST repos/<user>/stowarzyszenie-demo/pages -f build_type=workflow
```

albo Settings → Pages → Source = **GitHub Actions**.

### Logi i ponowny deploy

```bash
gh run list --workflow deploy.yml
gh run watch
gh workflow run deploy.yml   # ręczny trigger
```

## Wrzucenie na GitHub

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create stowarzyszenie-demo --public --source=. --remote=origin --push
```

## Co dodać w kolejnej wersji

- Formularz kontaktowy (React Hook Form + Resend / EmailJS)
- CMS profili (Sanity / Strapi) zamiast JSON
- Rezerwacja terminów (Cal.com / Supabase)
- Tryb ciemny (drugi motyw + `useColorScheme()`)
- i18n (`expo-localization` + `i18next`)
- Push (`expo-notifications`)
- Sentry + PostHog
- Testy (Jest + RNTL, Maestro/Detox)
