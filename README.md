# Integrale Projectplanning Oude Langstraat (React Gantt)

Professionele React-app voor de projectplanning van **13 appartementen aan de Oude Langstraat in Tilburg**.

## Inhoud

- Timeline van **2024 t/m 2026**
- Fasen:
  - Sloop & Site Prep
  - Fundering & Inrichting
  - Steel Skeleton
  - Duratherm Installatie
- Mix van activiteiten (bars) en mijlpalen (diamonds)
- Nederlandse labels en professionele kleurstelling

## Structuur

```txt
tilburg_gantt_react/
├─ index.html
├─ package.json
├─ README.md
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ styles.css
   ├─ components/
   │  └─ GanttChart.jsx
   └─ data/
      └─ projectData.js
```

## Starten in CodeSandbox

1. Open [CodeSandbox](https://codesandbox.io/)
2. Kies **Create Sandbox** → **Import Project**
3. Upload deze map (`tilburg_gantt_react`) of plak de bestanden
4. CodeSandbox installeert dependencies automatisch (`npm install`)
5. Startcommando: `npm run dev`

## Lokaal draaien (optioneel)

```bash
npm install
npm run dev
```

Daarna draait de app op de Vite dev-server (standaard poort 5173).

## Aanpassen van planning

Alle taken en datums staan in:

- `src/data/projectData.js`

Je kunt daar eenvoudig nieuwe fases, taken of mijlpalen toevoegen.
