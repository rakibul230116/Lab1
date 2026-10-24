# PlayHub – Modern HTML5 Browser Gaming Portal

PlayHub is a free online HTML5 games website built with React 19, TypeScript, Tailwind CSS, and React Router.

## Project Architecture

```
/
├── index.html                 # Entry point with SEO metadata and Google WebFonts
├── src/
│   ├── assets/images/         # Generated high-resolution game banners & art
│   ├── components/
│   │   ├── common/            # Reusable components: AdSlot, SEO, ScrollToTop
│   │   ├── home/              # HeroCarousel, GameCard, CategoryChips, Sidebar
│   │   └── layout/            # Navbar with category dropdown, search, Footer
│   ├── context/               # ThemeContext (Dark / Light mode)
│   ├── data/                  # Categories, 18+ seed games, and playable game engines
│   ├── pages/                 # Home, GameDetail, Category, New, Popular, Leaderboard, Premium, Search, About, Contact, Privacy, Terms, Admin
│   ├── services/              # gamesService (localStorage data persistence layer)
│   ├── types/                 # Game, Category, LeaderboardEntry, WaitlistEntry
│   ├── App.tsx                # Master routing definition
│   └── index.css              # Tailwind CSS imports & font theme variables
```

---

## 1. How to Add and Manage Games
- **Admin Dashboard**: Visit `/admin` in your browser.
  - **Demo Password**: `admin`
  - Click **"Add New Game"** to enter the title, auto-generated slug, category, description, thumbnail URL, and HTML5 embed source.
  - Reorder games using the Up / Down arrows.
  - Instantly toggle **Featured** (hero carousel), **Popular** (popular games grid), or **New** (badge).
- **Programmatically**: Edit `/src/data/seedGames.ts` or use `gamesService.createGame()`.

---

## 2. Replacing HTML5 Embeds with Licensed Games in Production
PlayHub includes responsive, high-performance built-in HTML5 canvas game engines when an embed URL uses `internal://<slug>`.

To plug in third-party licensed games:
1. Partner with licensed HTML5 game distributors such as:
   - [GameDistribution](https://gamedistribution.com/)
   - [itch.io HTML5 Embeds](https://itch.io/)
   - [CrazyGames Developer Portal](https://developer.crazygames.com/)
   - [GameArter](https://www.gamearter.com/)
2. In the Admin Dashboard (`/admin`), paste the partner's HTTPS iframe embed URL into the `Embed URL` field.
3. The PlayHub game iframe enforces `sandbox="allow-scripts allow-same-origin allow-forms allow-popups"` with responsive 16:9 aspect ratio and full-screen support.

---

## 3. Connecting an Ad Provider (Google AdSense, AdinPlay, NitroPay)
Open `/src/components/common/AdSlot.tsx`:
1. Insert your ad provider SDK script into `index.html`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```
2. In `AdSlot.tsx`, set `USE_REAL_ADS = true`.
3. Provide your ad unit IDs for each slot size:
   - `728x90` (Top Leaderboard Banner)
   - `300x250` (Sidebar & Game Page Companion)
   - `native` (In-Grid sponsored cards)

---

## 4. Upgrading from localStorage to a Remote Backend
The `gamesService` (`/src/services/gamesService.ts`) isolates all data calls. To switch to a production database:
- **Firebase Firestore**: Replace `localStorage.getItem/setItem` with `getDocs(collection(db, 'games'))` and `addDoc()`.
- **Supabase / PostgreSQL**: Replace the methods with `supabase.from('games').select('*')`.
- **WordPress REST API**: Call `fetch('https://your-wp.com/wp-json/wp/v2/games')`.

---

## 5. robots.txt & SEO Guidelines
For production search engine indexing:
```txt
# robots.txt
User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://playhubgames.com/sitemap.xml
```
PlayHub features the `<SEO />` component on every page, injecting dynamic document titles, meta descriptions, OpenGraph share previews, and Schema.org `VideoGame` and `WebApplication` JSON-LD rich snippets.
