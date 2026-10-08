# Diggibyte × Databricks: Data Innovation Summit MEA 2026 booth page

Interactive "Roll the cube" page for the Diggibyte booth at the
**Data Innovation Summit MEA 2026** (14–15 October 2026, JW Marriott Hotel Marina, Dubai).

Visitors roll a cube to pick one of six industries: Banking & Fintech, Government & Smart Cities,
Energy & Utilities, Real Estate & Hospitality, Retail & FMCG, and Healthcare & Life Sciences.
The page then shows that industry's storyline, three Databricks use cases and a four-step live demo.
Each use case is tagged with the summit stage it belongs to:

- AI Strategy & Governance
- Data Strategy & Governance
- Analytics & Decision Intelligence
- ML, Gen & Agentic AI

A countdown to the summit sits in the header. It switches to a "live now" message during the event
and a thank-you message afterwards.

## Structure

```
index.html            Page markup (top bar, hero with cube and countdown, industry chips, storyline)
css/styles.css        All styling; DIS MEA brand colours and fonts are CSS variables in :root
js/storylines.js      Content: event details, technologies, stages, industry icons, storylines
js/app.js             Cube rotation, reveal animation, attract mode, countdown
assets/img/           Diggibyte, Databricks and DIS logos (placeholders) and the Dubai skyline
.nojekyll             Tells GitHub Pages to serve the files as they are
```

No build step and no dependencies. Plain HTML, CSS and JavaScript. Fonts (Unbounded and Manrope)
load from Google Fonts, with system fallbacks if offline.

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publish on GitHub Pages

1. Create a new repository named `dbt_dis` under the `diggibyte` organisation (public, or private on a plan that allows Pages).
2. Push these files to the `main` branch, with `index.html` at the root:
   ```
   git init
   git add .
   git commit -m "DIS MEA 2026 booth page"
   git branch -M main
   git remote add origin https://github.com/diggibyte/dbt_dis.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, pick `main` and `/ (root)`, then **Save**.
5. After a minute or two the page is live at `https://diggibyte.github.io/dbt_dis/`.

Link straight to an industry by adding its id to the URL, for example
`https://diggibyte.github.io/dbt_dis/#energy`. The ids are `banking`, `government`, `energy`,
`realestate`, `retail` and `healthcare`.

## Common edits

| Change                                        | Where                                          |
| --------------------------------------------- | ---------------------------------------------- |
| Headline and intro text                       | `index.html`, `<section class="hero">`         |
| Event name, dates, venue, booth, countdown    | `js/storylines.js`, `EVENT`                    |
| Industry storylines, use cases, demo steps    | `js/storylines.js`, `ROWS`                     |
| Technology names and taglines                 | `js/storylines.js`, `TECH`                     |
| Summit stage names                            | `js/storylines.js`, `STAGES`                   |
| Industry icons                                | `js/storylines.js`, `ICONS`                    |
| Brand colours, fonts                          | `css/styles.css`, `:root`                      |
| Auto-roll timing (idle 40 s, then every 20 s) | `js/app.js`, `IDLE_MS` and `AUTO_MS`           |
| Logos and skyline image                       | `assets/img/` (keep the same file names)       |

The cube has six faces, so `ROWS` should hold exactly six industries.

## Booth tips

- Press **Space** or the **Roll the cube** button to roll.
- Click an industry chip under the cube to jump straight to it.
- After 40 seconds without interaction the cube rolls on its own every 20 seconds.
- Run the browser in full-screen (F11) on the booth display.

## Notes

- Company names, people and figures in the storylines are illustrative.
- The logos in `assets/img/` are text placeholders. Replace them with the official files,
  and make sure you have the rights to use the partner and event logos.
- The brand colours are matched by eye to the DIS MEA 2026 website. Swap in the official
  hex values in `:root` if you have the brand guide.
