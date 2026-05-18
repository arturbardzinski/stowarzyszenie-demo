# CLAUDE.md — stowarzyszenie-demo

Plik kontekstowy dla Claude Code. Czytany automatycznie przy każdej sesji w tym katalogu.

---

## Czym jest projekt

**Demo aplikacji webowej** stowarzyszenia psychologów „Centrum Dobrego Dialogu". Treści przykładowe — żaden psycholog, e-mail ani telefon nie są prawdziwe.

- **Live:** https://arturbardzinski.github.io/stowarzyszenie-demo/
- **Repo:** https://github.com/arturbardzinski/stowarzyszenie-demo (public, wymagane bo GH Pages na free planie nie hostuje z prywatnego)
- **Owner:** artur.bardzinski@icloud.com

## Scope

**Tylko web.** Native apki na Android/iOS są poza zakresem (decyzja użytkownika). Cały stack RN+Expo jest tu wykorzystywany jako sposób na pisanie jednego kodu, ale eksportowany jest wyłącznie statyczny web.

---

## Stack

- **React Native 0.74 / React 18** — komponenty
- **Expo SDK 51** — toolchain
- **Expo Router 3** — file-based routing (`app/`)
- **TypeScript strict** (lokalnie 5.3.3 z node_modules; IDE może mieć nowszy)
- **react-native-reanimated** — animacje (jedyny pattern: `AnimatedFade`, 180 ms fade, bez staggera)
- **expo-blur** — liquid glass (BlurView; web używa `backdrop-filter`)
- **expo-linear-gradient** — gradienty w tle, ringach awatarów, przyciskach
- **@expo/vector-icons** — Ionicons
- **react-native-safe-area-context** — SafeAreaView

Build: `expo export --platform web` → katalog `dist/` z statycznym SPA + 16 prerenderowanych stron HTML.

---

## Struktura

```
app/                          # Expo Router — file = trasa
├── _layout.tsx               # Stack + custom AppHeader
├── index.tsx                 # /
├── about.tsx                 # /about
├── contact.tsx               # /contact
├── psychologists/
│   ├── index.tsx             # /psychologists  (lista, max 1080 px, 2-col grid)
│   └── [id].tsx              # /psychologists/<id>  (statyczne 4)
└── book/
    └── [id].tsx              # /book/<id>  (statyczne 4, formularz + mailto)

components/
├── AppHeader.tsx             # glass blur header, brand→home, back chevron
├── AnimatedFade.tsx          # subtle FadeIn 180 ms (zawijać raz na ekran)
├── GlassCard.tsx             # BlurView card
├── GradientBackground.tsx    # gradient + soft blobs
├── GradientButton.tsx        # primary/glass/ghost, press-scale
├── Pill.tsx                  # tagi tonowe (lavender/sage/peach/sand/sky/ink)
├── ProfileCard.tsx           # karta psychologa z gradient ring na awatarze
└── ResponsiveContainer.tsx   # max 720 px default, override przez maxWidth prop

constants/theme.ts            # colors, gradients, spacing, radius, typography, shadows, breakpoints, maxContentWidth
data/psychologists.json       # WSZYSTKIE dane 4 osób
types/psychologist.ts         # Psychologist type
hooks/useResponsive.ts        # useWindowDimensions + isSm/isMd/isLg/isMobile

.github/workflows/deploy.yml  # CI: build + deploy na GH Pages na każdy push
app.json                      # name, slug stowarzyszenie-demo, baseUrl /stowarzyszenie-demo
tsconfig.json                 # extends expo, strict, jsx react-native, moduleResolution bundler, paths @/*
```

---

## Routing

Wszystkie trasy:
- `/`
- `/about`
- `/contact`
- `/psychologists`
- `/psychologists/anna-kowalska` | `marek-nowicki` | `julia-wisniewska` | `tomasz-zielinski`
- `/book/<id>` analogicznie

**Każda dynamic route MUSI eksportować `generateStaticParams()`** — bez tego GH Pages dostaje tylko jeden `[id].html` template, który nie jest serwowany dla konkretnych ścieżek. Wzorzec:

```ts
export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return data.map((p) => ({ id: p.id }));
}
```

SPA fallback (`dist/404.html` = `dist/index.html`) kopiowany w workflow dla nieznanych ścieżek.

---

## Deploy

```bash
git push origin main
```

Workflow `.github/workflows/deploy.yml`:
1. `npm ci`
2. `npx expo export --platform web`
3. `cp dist/index.html dist/404.html`
4. upload-pages-artifact + deploy-pages

Cykl: ~1 min build + ~40 s deploy. URL aktualizuje się od razu po zakończeniu.

Komendy:
```bash
gh run list --workflow deploy.yml --limit 5
gh run watch                 # śledzić bieżący
gh workflow run deploy.yml   # ręczny trigger bez commita
```

---

## Local dev

**Web export (najprostsze, bez watchmana):**
```bash
npx expo export --platform web
npx serve dist -l 3000
# http://localhost:3000  (uwaga: subpath baseUrl jest dla GH Pages, lokalnie może wymagać dostępu z roota — symlink lub --single-page-app flag w serve)
```

**Full RN dev mode (hot reload):**
```bash
npx expo start --web
```
Wymaga **watchmana** (`brew install watchman`). Bez niego Metro pęka na EMFILE. Hook w środowisku użytkownika domyślnie blokuje `brew install` — użytkownik musi to zrobić sam.

**Typecheck:**
```bash
npx tsc --noEmit
```

---

## Konwencje kodu

### Animacje
**Subtle.** Jeden `<AnimatedFade>` opakowuje całą zawartość ekranu (po `ResponsiveContainer`). Bez staggera per element, bez translateY, bez springa. Nawigacja wstecz/wprzód musi wyglądać spokojnie. Stack transition: `animation: 'default'`.

### TypeScript
- **strict** mode włączony
- defensive indexing: `accentByIndex[i] ?? accentByIndex[0]!` (helper `pickAccent`)
- optional props deklarować jawnie `?: T | undefined` jeśli przekazujemy `undefined` przez prop spreading
- `experiments.typedRoutes` **wyłączone** — regenerowane tylko w `expo start`, blokowały static export pipeline przy dodawaniu tras

### Styl
- color tokens z `constants/theme.ts`, **never inline hex** (z drobnymi wyjątkami w mapach `tone` per komponent)
- `spacing.*` zamiast magicznych liczb
- typography presety: `display`, `title`, `heading`, `body`, `muted`, `label`
- header padding: paddingTop ekranów `spacing.lg` (header nie jest transparent — zajmuje swoją przestrzeń)

### Responsywność
- `useResponsive()` → `isSm` (≥480), `isMd` (≥768), `isLg` (≥1024)
- domyślny `ResponsiveContainer` capuje content do 720 px (czytelność długich tekstów)
- listy/grid: `<ResponsiveContainer maxWidth={1080}>` + grid 2-kolumnowy przez `flexBasis: '48%', maxWidth: '49%', gap`

### Header
`AppHeader` na każdej stronie (custom Stack header):
- glass blur + biała półprzezroczystość
- back chevron lewy, tylko gdy `back` jest zdefiniowany
- marka po lewej (gradient ikona ♥ + tekst) → `router.replace('/')` (replace żeby nie stackować)
- na mobile `<480 px` marka skraca się do „CDD"

### mailto: zamiast backendu
Formularz `/book/[id]` na submit buduje sformatowany e-mail z sekcjami (`— DANE KONTAKTOWE —`, `— FORMA KONSULTACJI —`, `— PREFEROWANY TERMIN —`, `— WIADOMOŚĆ —`, podpis) i odpala `Linking.openURL(mailto:...)`. To celowa decyzja — brak backendu, GH Pages serwuje tylko statyk.

---

## Decyzje historyczne (warto pamiętać)

| Decyzja | Powód |
|---|---|
| Repo publiczne, nie prywatne | GH Pages free nie hostuje z prywatnych repo |
| Vercel odrzucony | Użytkownik chciał GH Actions zamiast |
| Native apki out of scope | Tylko web — postanowione w trakcie sesji |
| mailto: zamiast backendu | Statyczny hosting, brak budowy serwera |
| `experiments.typedRoutes` off | Regenerowały się tylko w `expo start`, utrudniały dodawanie tras |
| `moduleResolution: bundler` | TS 5.5+ uznał `"node"` za usunięte „node10" |
| `experiments.baseUrl: /stowarzyszenie-demo` | GH Pages serwuje pod subpath, nie pod rootem |
| `generateStaticParams` dla każdego `[id]` | Statyczny eksport — brak SPA rewrite |
| Tytuły psychologów per profil różne | `anna-kowalska` różny od `marek-nowicki` (cena, czas sesji, dostępność, formaty) — różnicowanie /book od ogólnego /contact |

---

## Pitfalls

- **`.expo/types/router.d.ts`** cachuje stare trasy. Po dodaniu/usunięciu trasy IDE może wyświetlać błąd „nie znaleziono trasy". Fix: `rm .expo/types/router.d.ts` + restart TS server w IDE.
- **IDE TS ≠ workspace TS**. Cursor używa nowszego TS niż `node_modules`. `tsconfig.json` pisany na zgodność z oboma. Jeśli błąd jest tylko w IDE, sprawdź czy `tsc --noEmit` w terminalu też go widzi — jeśli nie, prawdopodobnie IDE używa stricter checków lub stale state.
- **Bundle webowy waży ~1.4 MB JS + ~440 kB Ionicons font.** Można zoptymalizować przez `expo-font` z wybiórczym ładowaniem konkretnych ikon (nie zrobione).
- **EMFILE w `expo start`**: bez watchmana Metro pęka na macOS. `brew install watchman`.
- **`router.push('/foo')` vs `router.replace('/foo')`**: marka w headerze używa `replace` żeby nie stackować home na stos powrotu.

---

## Common operations

### Dodać psychologa
1. Dopisać obiekt do `data/psychologists.json` (wszystkie pola z `types/psychologist.ts`)
2. Commit + push → workflow wygeneruje `/psychologists/<new-id>` i `/book/<new-id>` automatycznie dzięki `generateStaticParams`

### Zmienić paletę
Edytować `constants/theme.ts` (`colors`, `gradients`). Wszystkie komponenty importują stamtąd.

### Dodać nową statyczną trasę
Plik `app/<nazwa>.tsx`. Zarejestrować w `app/_layout.tsx`. Restart TS server w IDE.

### Dodać dynamic route
Plik `app/<segment>/[param].tsx`. **Zawsze** dodać `generateStaticParams()` zwracający tablicę `{[param]: string}[]`. Inaczej GH Pages dostanie tylko template, nie konkretne strony.

### Force deploy bez zmian w kodzie
```bash
gh workflow run deploy.yml
```

### Status ostatnich deployów
```bash
gh run list --workflow deploy.yml --limit 5
```

### Lokalny podgląd przed pushem
```bash
npx expo export --platform web && npx serve dist -l 3000
```

---

## Co warto dodać w przyszłości

- **Optymalizacja bundle** — wybiórcze fonty ikon (~1 MB do zaoszczędzenia)
- **Tryb ciemny** — dodać dark variant w `theme.ts` + `useColorScheme()`
- **i18n** — `expo-localization` + `i18next` (PL/EN)
- **Lighthouse/perf audit** — sprawdzić score na deployed URL
- **Sitemap.xml / robots.txt** — SEO basics dla wyszukiwarek
- **Open Graph meta tags** — dla preview linków w Slacku/Messengerze
- **Real backend dla formularza** (Resend / Formspree / Cloudflare Worker)
- **CMS dla profili** (Sanity / Strapi) zamiast JSON
- **Testy** (Jest + RNTL dla komponentów; Playwright dla E2E na URL)

---

## Skille Claude Code przydatne tu

- `/review` przed dużymi merge'ami
- `/security-review` co jakiś czas (mailto: parametry, encoded user input)
- `/simplify` po większych refactorach (sprawdza duplikację, dead code)

Nie ma dedykowanego skilla dla „Expo Router web static deploy" — ten plik (CLAUDE.md) pełni tę rolę.
