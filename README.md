# Portfolio

## Gemini-powered chat widget

The site has a floating chat widget ([src/components/ChatBot.jsx](src/components/ChatBot.jsx))
that answers visitor questions about the resume content. In production it calls
Gemini through the serverless endpoint in [api/chat.js](api/chat.js). The API key
stays on the server and is never included in the browser bundle.

Its knowledge comes from [src/data.js](src/data.js) — the same data the rest of the
site renders — plus recruiter-facing facts at the top of `chatKnowledge.js`. The
server limits input, output, and conversation history to conserve free-tier quota.
If Gemini is unavailable or the site is running as a static preview, the existing
local keyword matcher answers instead.

Create a Gemini key in Google AI Studio, then add it to the Vercel project's
environment variables as `GEMINI_API_KEY`. Redeploy after saving it. The optional
`GEMINI_MODEL` variable can override the default `gemini-3.8-flash` model.

For local end-to-end testing, put the same variable in `.env.local` and use
`vercel dev`; plain `npm run dev` exercises the local fallback because Vite does not
run the serverless endpoint.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
