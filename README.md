# PEDIT Lab Portfolio

The PEDIT Lab portfolio website is built with React, TypeScript, and Vite.

## Requirements

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) 20.19+ or 22.12+
- npm (included with Node.js)

## Clone and run locally

```bash
git clone https://github.com/Pedit-Lab/Portfolio.git
cd Portfolio
npm ci
npm run dev
```

Open the local URL printed in the terminal (usually <http://localhost:5173/>).
Vite's development server supports hot reloading as you edit the source files.

## Optional environment configuration

The app has default public contact details. To customize them, copy `.env.example`
to `.env.local` and edit the `VITE_` values:

```bash
cp .env.example .env.local
```

On Windows Command Prompt, use `copy .env.example .env.local` instead.
Restart the development server after changing environment variables.

## Other commands

```bash
npm run lint    # Run Oxlint
npm run build   # Type-check and create a production build in dist/
npm run preview # Preview the production build locally
```
